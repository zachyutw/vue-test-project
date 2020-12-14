/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { searchYoutube } from "../apis/youtube";
import localJSON from "@/utils/localJSON";
const SEARCH_VIDEOS = "SEARCH_VIDEOS";
const RECEIVED_VIDEOS = "RECEIVED_VIDEOS";
const FETCH_FAILURE = "FETCH_FAILURE";
const FETCH_LOADING = "FETCH_LOADING";
const SET_QUERY = "SET_QUERY";

export const PENDING = "pending";
export const IDLE = "idle";
export const ERROR = "error";

export const IDS = {
  videoQ: "videoQ",
  videosCache: "videosCache",
  videoStart: "videoStart"
};

const initialState = {
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

const actions = {
  async [SEARCH_VIDEOS]({ commit }, params) {
    commit(PENDING);
    return searchYoutube(params)
      .then(data => commit(RECEIVED_VIDEOS, data))
      .catch(error => commit(ERROR, error));
  }
};

const mutations = {
  [PENDING]: (state = initialState) => {
    state.loading = PENDING;
  },
  [RECEIVED_VIDEOS]: (state, data) => {
    state.data = data;
    state.loading = IDLE;
    localJSON.setItem(IDS.videosCache, data);
  },
  [ERROR]: (state, error) => {
    state.loading = ERROR;
    state.error = error;
  }
};

const getters = {
  start: state => state.start,
  loading: state => state.loading,
  q: state => state.params.q,
  items: state => state.data.items,
  nextPageToken: state => state.data.nextPageToken
};

export default {
  state: initialState,
  namespaced: true,
  actions,
  mutations,
  getters
};
