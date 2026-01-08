import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";
import { addNotification } from "../slices/userNotificationSlice";
import { setCourseList, setLoading } from "../slices/courseSlice";

interface Request {
  token: string;
  id?: string;
  payload: any;
}

// Thunk to handle user login
export const getCourseList: any = createAsyncThunk(
  "getCourseList", // Thunk action name
  async (_request: Request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      return axios
        .get(`${config.url}courses/`, {
          headers: {
            Authorization: `${_request.token}`,
          },
        }) // Make a POST request to login endpoint
        .then((response: any) => {
          dispatch(setLoading(false));
          dispatch(setCourseList(response?.data?.data));
        })
        .catch(() => {
          dispatch(setLoading(false));
          dispatch(
            addNotification({
              message: "Error while trying to get course list.", // Dispatch notification for login error
            })
          );
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  }
);

export const getMyCourseList: any = createAsyncThunk(
  "getMyCourseList", // Thunk action name
  async (_request: Request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      return axios
        .get(`${config.url}user/courses/?userId=${_request.id}`, {
          headers: {
            Authorization: `${_request.token}`,
          },
        }) // Make a POST request to login endpoint
        .then((response: any) => {
          dispatch(setLoading(false));
          dispatch(setCourseList(response?.data?.data));
        })
        .catch(() => {
          dispatch(setLoading(false));
          dispatch(
            addNotification({
              message: "Error while trying to get course list.", // Dispatch notification for login error
            })
          );
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  }
);

export const registerCourse: any = createAsyncThunk(
  "registerCourse", // Thunk action name
  async (_request: Request, { dispatch }) => {
    try {
      return axios
        .post(`${config.url}user/assigncourse`, _request.payload, {
          headers: {
            Authorization: `${_request.token}`,
          },
        }) // Make a POST request to login endpoint
        .then(() => {
          addNotification({
            message: "You have succesfully registered course", // Dispatch notification for login error
          });
        })
        .catch(() => {
          dispatch(
            addNotification({
              message: "Error while trying to getting course list.", // Dispatch notification for login error
            })
          );
        });
    } catch (error) {}
  }
);
