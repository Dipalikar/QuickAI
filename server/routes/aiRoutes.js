import express from "express"
import {auth} from '../middlewares/auth.js'
import { generateArticle, generateBlogTitles, generateImage, removeImageBackgroud, removeImageObject, resumeReview } from "../controller/aiController.js"
import { upload } from "../configs/multer.js"

const aiRouter=express.Router()

aiRouter.post('/generate-article',auth,generateArticle)
aiRouter.post('/generate-blog-title',auth,generateBlogTitles)
aiRouter.post('/generate-image',auth,generateImage)
aiRouter.post('/remove-image-background',upload.single('image'),auth,removeImageBackgroud)
aiRouter.post('/remove-image-object',upload.single('image'),auth,removeImageObject)
aiRouter.post('/resume-review',upload.single('resume'),auth,resumeReview)

export default aiRouter