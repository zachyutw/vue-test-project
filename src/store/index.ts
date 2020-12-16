import { createStore, createLogger } from "vuex";
import youtubeVideo from "@/store/modules/youtubeVideoModule";
export default createStore({
  plugins: [createLogger()],
  modules: {
    youtubeVideo
  }
});
