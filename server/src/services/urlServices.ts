import Url from '../models/UrlModel'
import {UrlPayloadType,UrlType} from 'types'
import {generate as generateUrlCode} from 'generate-password'



//create
export const createUrl = async (payload: UrlPayloadType) => {
    if (!payload.originalLink || !payload.userId)
      throw Error("Missing required paramaters");
    try {
      let url = new Url(payload);
  
      //create urlcode
      const urlCode = generateUrlCode({
        length: 8,
        uppercase: true,
      });
  
      url.urlCode = urlCode;
  
      url = await url.save();
  
      return url;
    } catch (error) {
      Error(error);
    }
  };
  
  //get
  export const getUrlByUrlCode = async (urlCode: string) => {
    try {
      let data = await Url.findOne({ urlCode });
      data.visitCount = data.visitCount + 1;
      return await Url.findOneAndUpdate({ urlCode: urlCode }, data);
    } catch (error) {
      console.log(error);
      Error(error);
    }
  };
  
  export const getUrlsForUser = async (userId: string) => {
    try {
      const urls = await Url.find({ userId: userId }).exec();
      console.log("urls", urls);
      return urls;
    } catch (error) {
      throw new Error("Interal server error");
    }
  };
  