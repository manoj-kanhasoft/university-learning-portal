import { combineReducers } from "redux"; // Import combineReducers function from redux
import { configureStore } from "@reduxjs/toolkit"; // Import configureStore function from @reduxjs/toolkit
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import authSlice from "./slices/authSlice"; // Import authSlice reducer
import userNotificationSlice from "./slices/userNotificationSlice"; // Import userNotificationSlice reducer
import courseSlice from "./slices/courseSlice";

// Combine all reducers into a single rootReducer
const rootReducer = combineReducers({
  authSlice,
  userNotificationSlice,
  courseSlice
});

// Configure the Redux store
const store:any = configureStore({
  reducer: rootReducer, // Set rootReducer as the reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck middleware for simplicity
    }),
});

// Define RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for TypeScript
export type AppDispatch = typeof store.dispatch;

// Custom hook to provide AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to provide typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; // Export the configured Redux store
