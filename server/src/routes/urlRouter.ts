import express,{Router} from 'express'

import Url from '../models/UrlModel'
import {createUrl, getUrlByUrlCode,getUrlsForUser} from '../services/urlServices'
import { verifyAccessToken } from '../middleware/authToken'

const router = Router()



router.post("/", verifyAccessToken, async (req,res) => {
  //TODO you can move this to a seperate controller
  //TODO add validation here

  const { originalLink } = req.body;

  if (originalLink) {
    try {
      let urlData = await Url.findOne({ originalLink });
      if (urlData) {
        res.status(200).json(urlData);
      } else {
        const data = await createUrl({ ...req.body, userId: req["user"].id });
        res.status(201).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(400).json("Missing required paramaters");
  }
});

router.get("/:urlCode", async (req,res) => {
  const urlCode = req.params.urlCode;
  if (!urlCode) {
    res.status(400).send("Bad request");
  }
  try {
    const data = await getUrlByUrlCode(urlCode);
    res.status(301).redirect(data.originalLink);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get(
  "/user/:userId",
  verifyAccessToken,
  async (req,res) => {
    const userId = req.params.userId;
    if (userId !== req["user"].id) {
      res.status(401).json("Access denied");
      return;
    }

    try {
      const data = await getUrlsForUser(userId);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);
export default router;