import axios from "axios";
import { setAlert } from "../actions/alert";
import {
  GET_POSTS,
  GET_POST,
  PROFILE_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from "./types";

// GET posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// GET a single post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${postId}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// ADD like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/like/${postId}`);

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// REMOVE like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/unlike/${postId}`);

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// ADD post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/v1/posts`, formData, config);

    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// DELETE post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);

    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// ADD comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      `/api/v1/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// DELETE comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`);

    dispatch({ type: DELETE_COMMENT, payload: commentId });

    dispatch(setAlert("Comment Deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
