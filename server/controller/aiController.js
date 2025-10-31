import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import pdf from 'pdf-parse/lib/pdf-parse.js'

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const processPDFFile = async (req, res) => {
  try {
    const pdfParse = (await import("pdf-parse")).default;

    const pdfBuffer = req.file.buffer; // or however you get the PDF
    const data = await pdfParse(pdfBuffer);

    const extractedText = data.text;

    res.json({ success: true, text: extractedText });
  } catch (error) {
    console.error("PDF processing error:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, length } = req.body;
    const user = await clerkClient.users.getUser(userId);
    const plan = user.raw.unsafe_metadata.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO public.creations(user_id, prompt, content,type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateBlogTitles = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt } = req.body;
    const user = await clerkClient.users.getUser(userId);
    const plan = user.raw.unsafe_metadata.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      // max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO public.creations(user_id, prompt, content,type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, publish } = req.body;
    const user = await clerkClient.users.getUser(userId);
    const plan = user.raw.unsafe_metadata.plan;

    // console.log(plan)

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscription",
      });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO public.creations(user_id, prompt, content,type,publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image',${
      publish ?? false
    })`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeImageBackgroud = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const image = req.file;
    const user = await clerkClient.users.getUser(userId);
    const plan = user.raw.unsafe_metadata.plan;

    console.log(image.path);

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscription",
      });
    }

    // First, upload the original image
    const uploadResult = await cloudinary.uploader.upload(image.path);
    const publicId = uploadResult.public_id;

    // Then, generate a URL with background removal transformation
    const transformedUrl = cloudinary.url(publicId, {
      effect: "background_removal",
      fetch_format: "png", // Important: use PNG to preserve transparency
    });

    console.log("Transformed URL:", transformedUrl);
    await sql`INSERT INTO public.creations(user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${transformedUrl}, 'image')`;

    res.json({ success: true, content: transformedUrl });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { object } = req.body;
    const  image  = req.file;
    const user = await clerkClient.users.getUser(userId);
    const plan = user.raw.unsafe_metadata.plan;

    // console.log(plan)

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscription",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);
    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await sql`INSERT INTO public.creations(user_id, prompt, content,type) VALUES (${userId},${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const resume = req.file;
    const user = await clerkClient.users.getUser(userId);
    const plan = user.raw.unsafe_metadata.plan;

    // console.log(plan)

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscription",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size(5 MB)",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses and areas for improvement. Resime Content: \n\n ${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO public.creations(user_id, prompt, content,type) VALUES (${userId},'Review the uploaded resume, ${content}, 'resume-review')`;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
