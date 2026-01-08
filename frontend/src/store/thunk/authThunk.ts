import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";
import { addNotification } from "../slices/userNotificationSlice";
import { setAuthUser } from "../slices/authSlice";

interface Request {
  payload: any;
}

// Thunk to handle user login
export const loginUserThunk: any = createAsyncThunk(
  "login", // Thunk action name
  async (_request: Request, { dispatch }) => {
    try {
      return axios
        .post(`${config.url}user/login/`, _request.payload) // Make a POST request to login endpoint
        .then((response: any) => {
          if (response?.data?.data?.token) {
            localStorage.setItem(
              // Store user token in local storage
              "userToken",
              response?.data?.data?.token
            );
            localStorage.setItem(
              // Store user token in local storage
              "userId",
              response?.data?.data?.user?._id
            );
            dispatch(addNotification({ message: "User logged successfully" })); // Dispatch notification
            dispatch(
              setAuthUser({
                token: response?.data?.data?.token,
                id: response?.data?.data?.user?._id,
                ...response?.data?.data,
              }) // Dispatch action to set authenticated user
            );
          }
        })
        .catch(() => {
          dispatch(
            addNotification({
              message:
                "Error while trying to login, Please check your credentials.", // Dispatch notification for login error
            })
          );
        });
    } catch (error) {}
  }
);

// Thunk to handle user registration
export const registerUserThunk: any = createAsyncThunk(
  "registerUserThunk", // Thunk action name
  async (_request: Request, { dispatch }) => {
    try {
      return axios
        .post(`${config.url}user/register/`, _request.payload) // Make a POST request to register endpoint
        .then(() => {
          dispatch(
            addNotification({
              message:
                "User Created successfully, please check you email to verify the account.",
            })
          ); // Dispatch notification for successful registration
        })
        .catch(() => {
          dispatch(
            addNotification({
              message: "Error while trying to signup.", // Dispatch notification for registration error
            })
          );
        });
    } catch (error) {}
  }
);
