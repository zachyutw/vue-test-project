/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import mockDate from "@/apis/mockDate";
const instance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/search"
});

const apiKey = process.env.VUE_APP_YOUTUBE_API_KEY || "YOUR_API_KEY";

const MAX = 30;
const defaultParams = {
  key: apiKey,
  part: "snippet",
  type: "video",
  videoCategoryId: "10",
  maxResults: MAX
};

type YoutubeSearchResultItemThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type YoutubeSearchResultItem = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YoutubeSearchResultItemThumbnail;
      medium: YoutubeSearchResultItemThumbnail;
      high: YoutubeSearchResultItemThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
  };
};

export type YoutubeSearchResp = {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: {
    totalResults: string;
    resultsPerPage: number;
  };
  items: YoutubeSearchResultItem[];
};

export const searchYoutube = async (params: any) => {
  console.log(params);
  const resp = await instance.get("", {
    params: { ...defaultParams, ...params }
  });

  return resp.data;
};

export const searchYoutubeMock = async (params: any) => {
  console.log(params);
  return Promise.resolve(mockDate);
};

const apis = { searchYoutube };

export default apis;
