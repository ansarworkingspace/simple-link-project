import express,{Router} from 'express'

import Url from '../models/UrlModel'
import {createUrl, getUrlByUrlCode} from '../services/urlServices'
import { verifyAccessToken } from '../middleware/authToken'

const router = Router()



router.post("/",verifyAccessToken,async(req,res)=>{
    const {originalLink}=req.body
// console.log(originalLink);

if(originalLink){
try {
    let urlData = await Url.findOne({originalLink})

    if(urlData){
    res.status(200).json(urlData)
    }else{
        const data = await createUrl(req.body)
        res.status(201).json(data)

    }
} catch (error) {
    console.log(error);
    res.status(500).json("internal server error")
}
}else{
   res.status(400).json("Missing required parameters")
}

})


router.get("/:urlCode",async(req,res)=>{
    const urlCode = req.params.urlCode;
    if(!urlCode){
        res.status(400).send("bad request")
    }
    try {
        const data = await getUrlByUrlCode(urlCode);
        res.status(301).redirect(data.originalLink)
    } catch (error) {
        res.status(500).json("Internal server error")
    }
})



export default router;