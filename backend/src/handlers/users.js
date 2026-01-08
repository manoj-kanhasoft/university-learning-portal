import { connectToDatabase } from "../../src/utils/db/connection.js";
import User from "../utils/db/models/User.js";
import { generateToken, verifyToken } from "../utils/authenticate.js";
import { apiResponse } from "../utils/apiResponse.js";
import UserCourse from "../utils/db/models/UserCourse.js";
import {
  SOMETHING_WENT_WRONG,
  USER_REGISTERED_SUCCESSFULLY,
  USER_NOT_FOUND,
  USER_LOGIN_SUCCESSFULLY,
  INVALID_CREDENTIALS,
  DATA_RECEIVED_SUCCESSFULLY,
  USER_ID_REQUIRED,
  USER_COURSE_ASSIGNED,
  USER_COURSE_UNASSIGNED,
  ASSIGNED_ID_REQUIRED,
  AUTHORIZATION_REQUIRED,
} from "../utils/messages.js";

/**
 * Registers a new user.
 *
 * @param {Object} event - The API Gateway event object.
 * @returns {Object} - The API response with the result of the registration.
 */
export const register = async (event) => {
  try {
    // Parse the request body
    const data = JSON.parse(event.body) || {};
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      educationDegree,
      address,
    } = data;

    // Connect to the database
    await connectToDatabase();

    // Create and save the new user
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      educationDegree,
      address,
    });
    await user.save();

    // Return success response
    return apiResponse(201, {
      status: true,
      data: user,
      message: USER_REGISTERED_SUCCESSFULLY,
    });
  } catch (error) {
    // Log and return error response
    console.log("Registration error ", error);
    return apiResponse(400, {
      status: false,
      data: null,
      message: error?.message || SOMETHING_WENT_WRONG,
    });
  }
};

/**
 * Handles user login by validating credentials and generating a JWT token.
 *
 * @param {Object} event - The API Gateway event object.
 * @returns {Object} - The API response with user data and JWT token or error message.
 */
export const login = async (event) => {
  try {
    // Parse the request body
    const data = JSON.parse(event.body) || {};
    const { email, password } = data;

    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Return response if user is not found
      return apiResponse(404, {
        status: false,
        data: null,
        message: USER_NOT_FOUND,
      });
    }

    // Verify the provided password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Return response if credentials are invalid
      return apiResponse(404, {
        status: false,
        data: null,
        message: INVALID_CREDENTIALS,
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return success response with user data and token
    return apiResponse(200, {
      status: true,
      data: { user, token },
      message: USER_LOGIN_SUCCESSFULLY,
    });
  } catch (error) {
    // Log the error and return a general error response
    console.log("Login error ", error);
    return apiResponse(400, {
      status: false,
      data: null,
      message: error?.message || SOMETHING_WENT_WRONG,
    });
  }
};

/**
 * Assigns a course to a user by saving the user-course relationship in the database.
 *
 * @param {Object} event - The API Gateway event object containing request data and headers.
 * @returns {Object} - The API response indicating success or failure.
 */
export const assignCourseToUser = async (event) => {
  try {
    // Extract and verify JWT token from request headers
    const token =
      event?.headers?.Authorization || event?.headers?.authorization;

    const decodedToken = verifyToken(token);
    // Return unauthorized response if token verification fails
    if (!decodedToken) {
      return apiResponse(400, {
        status: false,
        data: null,
        message: AUTHORIZATION_REQUIRED,
      });
    }

    // Parse the request body to extract userId and courseId
    const data = JSON.parse(event.body) || {};
    const { userId, courseId } = data;

    // Check if both userId and courseId are provided
    if (!userId || !courseId) {
      return apiResponse(400, {
        status: false,
        data: null,
        message: "Both userId and courseId are required.",
      });
    }

    // Connect to the database
    await connectToDatabase();

    // Create and save the user-course relationship
    const userCourse = new UserCourse({ userId, courseId });
    await userCourse.save();
    return apiResponse(200, {
      status: true,
      data: null,
      message: USER_COURSE_ASSIGNED,
    });
  } catch (error) {
    console.log("error ", error);
    return apiResponse(400, {
      status: false,
      data: null,
      message: error?.message || SOMETHING_WENT_WRONG,
    });
  }
};

/**
 * Retrieves the list of courses assigned to a specific user.
 *
 * @param {Object} event - The API Gateway event object containing request data and headers.
 * @returns {Object} - The API response with the list of assigned courses or an error message.
 */
export const getAssignedCourses = async (event) => {
  try {
    // Extract and verify JWT token from request headers

    const token =
      event?.headers?.Authorization || event?.headers?.authorization;
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return apiResponse(400, {
        status: false,
        data: null,
        message: AUTHORIZATION_REQUIRED,
      });
    }
    let { userId } = event.queryStringParameters || {};
    if (!userId) {
      throw new Error(USER_ID_REQUIRED);
    }

    // Connect to the database
    await connectToDatabase();

    // Retrieve user courses with populated course details
    const userCourses = await UserCourse.find({ userId }).populate("courseId");

    // Map user courses to extract course details
    const result = userCourses.map((userCourse) => {
      const { courseId, ...rest } = userCourse.toObject();
      return {
        ...courseId,
      };
    });

    // Return success response with course details
    return apiResponse(200, {
      status: true,
      data: result,
      message: DATA_RECEIVED_SUCCESSFULLY,
    });
  } catch (error) {
    console.log("error ", error);
    return apiResponse(400, {
      status: false,
      data: null,
      message: error?.message || SOMETHING_WENT_WRONG,
    });
  }
};

/**
 * Retrieves the list of courses assigned to a specific user.
 *
 * @param {Object} event - The API Gateway event object containing request data and headers.
 * @returns {Object} - The API response with the list of assigned courses or an error message.
 */
export const unAssignCourseToUser = async (event) => {
  try {
    // Extract and verify JWT token from request headers
    const token =
      event?.headers?.Authorization || event?.headers?.authorization;
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return apiResponse(400, {
        status: false,
        data: null,
        message: AUTHORIZATION_REQUIRED,
      });
    }
    const { id } = JSON.parse(event.body) || {};
    if (!id) {
      throw new Error(ASSIGNED_ID_REQUIRED);
    }
    // Connect to the database
    await connectToDatabase();

    // delete record
    await UserCourse.deleteOne({ _id: id });
    return apiResponse(200, {
      status: true,
      data: null,
      message: USER_COURSE_UNASSIGNED,
    });
  } catch (error) {
    console.log("error ", error);
    return apiResponse(400, {
      status: false,
      data: null,
      message: error?.message || SOMETHING_WENT_WRONG,
    });
  }
};
