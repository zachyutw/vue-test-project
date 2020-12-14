import axios from "axios";
import mockDate from "@/apis/mockDate";
const instance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/search"
});

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY2 || "YOUR_API_KEY";

const MAX = 30;
const defaultParams = {
  key: apiKey,
  part: "snippet",
  type: "video",
  videoCategoryId: "10",
  maxResults: MAX
};

// export const searchYoutube = async (params) => {
//     const resp = await instance.get('', {
//         params: { ...defaultParams, ...params },
//     });

//     return resp;
// };

export const searchYoutube = async () => new Promise.resolve(mockDate);

const apis = { searchYoutube };

export default apis;
