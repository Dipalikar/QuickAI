import express from "express"
import {auth} from '../middlewares/auth.js'
import { generateArticle, generateBlogTitles, generateImage } from "../controller/aiController.js"

const aiRouter=express.Router()

aiRouter.post('/generate-article',auth,generateArticle)
aiRouter.post('/generate-blog-title',auth,generateBlogTitles)
aiRouter.post('/generate-image',auth,generateImage)

export default aiRouter