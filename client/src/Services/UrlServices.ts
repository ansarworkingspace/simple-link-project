import httpClient from "./HttpClient";

import { getAuthUser } from "../util/AuthUser";
import {UrlPayloadType, UrlType } from "../Types";

export const getUrlsForUser = async (): Promise<Array<UrlType> | any> => {
  const userId = getAuthUser()?.id;
  try {
    const { data } = await httpClient.get(`url/user/${userId}`);
    return data;
  } catch (error) {
    //TODO error handling and showing error to UI
    console.log(error);
    return error;
  }
};

export const deleteUrlByUrlCode = async (urlCode: string) => {
  try {
    const { data } = await httpClient.delete(`url/${urlCode}`);
    return data;
  } catch (error) {
    //TODO error handling and showing error to UI
    console.log(error);
    return error;
  }
};


export const createUrl = async (payload: UrlPayloadType) => {
  try {
    const { data } = await httpClient.post("url", payload);
    return data;
  } catch (error) {
    //TODO error handling and showing error to UI
    console.log(error);
    return error;
  }
};