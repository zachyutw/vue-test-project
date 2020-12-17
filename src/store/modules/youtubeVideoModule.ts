/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from "@/store/types";
import { MutationTree } from "vuex";
import { searchYoutube, YoutubeSearchResp } from "@/apis/youtube";
import localJSON from "@/utils/localJSON";

export const IDS = {
  videoQ: "videoQ",
  videosCache: "videosCache",
  videoStart: "videoStart"
};

interface YoutubeModuleState {
  start: number;
  data: YoutubeSearchResp;
  loading: string | null;
  error: any;
  params: {
    q?: string;
    pageToken?: string;
  };
}

const initialState: YoutubeModuleState = {
  start:
    +(localStorage.getItem(IDS.videoStart) || 0) > 20
      ? 0
      : +(localStorage.getItem(IDS.videoStart) || 0),
  data: localJSON.getItem(IDS.videosCache) || { items: [] },
  loading: null,
  error: {},
  params: {
    q: localStorage.getItem(IDS.videoQ) || "",
    pageToken: undefined
  }
};

export enum ActoinTypes {
  SEARCH_VIDEOS = "SEARCH_VIDEOS",
  LOAD_MORE_VIDEOS = "LOAD_MORE_VIDEOS"
}

export enum MutationTypes {
  RECEIVED_VIDEOS = "RECEIVED_VIDEOS",
  PENDING = "PENDING",
  IDLE = "IDLE",
  ERROR = "ERROR",
  SET_QUERY = "SET_QUERY",
  SET_START = "SET_START",
  CONCAT_VIDEO_TO_ITEMS = "CONCAT_VIDEO_TO_ITEMS"
}

const { SEARCH_VIDEOS, LOAD_MORE_VIDEOS } = ActoinTypes;
const { PENDING, RECEIVED_VIDEOS, CONCAT_VIDEO_TO_ITEMS } = MutationTypes;
const actions = {
  async [SEARCH_VIDEOS](context: any) {
    context.commit(PENDING);
    return searchYoutube(context.getters.params)
      .then(data => context.commit(RECEIVED_VIDEOS, data))
      .catch(error => context.commit(MutationTypes.ERROR, error));
  },
  async [LOAD_MORE_VIDEOS](context: any, params: any) {
    context.commit(PENDING);
    return searchYoutube(params)
      .then(data => context.commit(CONCAT_VIDEO_TO_ITEMS, data))
      .catch(error => context.commit(MutationTypes.ERROR, error));
  },
  [MutationTypes.SET_QUERY](context: any, query: string) {
    context.commit(MutationTypes.SET_QUERY, query);
  },
  [MutationTypes.SET_START](context: any, start: number) {
    context.commit(MutationTypes.SET_START, start);
    if (start === context.getters.items.length) {
      context.dispatch(LOAD_MORE_VIDEOS, context.getters.params);
    }
  }
};

const mutations: MutationTree<YoutubeModuleState> = {
  [MutationTypes.PENDING]: (state: YoutubeModuleState = initialState) => {
    state.loading = MutationTypes.PENDING;
  },
  [MutationTypes.RECEIVED_VIDEOS]: (
    state: YoutubeModuleState,
    data: YoutubeSearchResp
  ) => {
    state.data = data;
    state.loading = MutationTypes.IDLE;
    localJSON.setItem(IDS.videosCache, data);
  },
  [MutationTypes.ERROR]: (state: YoutubeModuleState, error: any) => {
    state.loading = MutationTypes.ERROR;
    state.error = error;
  },
  [MutationTypes.SET_QUERY]: (state: YoutubeModuleState, q: string) => {
    state.params.q = q;
  },
  [MutationTypes.SET_START]: (state: YoutubeModuleState, start: number) => {
    state.start = start;
  },
  [MutationTypes.CONCAT_VIDEO_TO_ITEMS]: (state: YoutubeModuleState, data) => {
    state.data.items = state.data.items.concat(data.items);
    (state.data.nextPageToken = data.nextPageToken),
      (state.params.pageToken = data.nextPageToken),
      (state.loading = MutationTypes.IDLE);
  }
};

export const getters = {
  start: (state: YoutubeModuleState) => state.start,
  loading: (state: YoutubeModuleState) => state.loading,
  params: (state: YoutubeModuleState) => state.params,
  q: (state: YoutubeModuleState) => state.params.q,
  items: (state: YoutubeModuleState) => state.data.items,
  nextPageToken: (state: YoutubeModuleState) => state.data.nextPageToken
};

type YoutubeVideoModule = {
  state: YoutubeModuleState;
};

export default {
  state: initialState,
  namespaced: false,
  actions,
  mutations,
  getters
} as YoutubeVideoModule & Module;
