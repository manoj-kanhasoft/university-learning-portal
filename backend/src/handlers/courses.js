import { connectToDatabase } from "../utils/db/connection.js";
import Courses from "../utils/db/models/Course.js";
import { apiResponse } from "../utils/apiResponse.js";
import { verifyToken } from "../utils/authenticate.js";
import {
  AUTHORIZATION_REQUIRED,
  DATA_RECEIVED_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
} from "../utils/messages.js";

/**
 * Handles the API request to fetch courses based on the user's department.
 *
 * @param {Object} event - The event object containing request details.
 * @returns {Object} - The API response with course data or error message.
 */
export const getCourses = async (event) => {
  try {
    // Extract the token from request headers
    const token =
      event?.headers?.Authorization || event?.headers?.authorization;

    // Verify and decode the token
    const decodedToken = verifyToken(token);

    // If token is invalid or not provided
    if (!decodedToken) {
      return apiResponse(400, {
        status: false,
        data: null,
        message: AUTHORIZATION_REQUIRED,
      });
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch courses based on the department from the decoded token
    const courses = await Courses.find({
      department: decodedToken.user.educationDegree,
    });

    // Return successful response with course data
    return apiResponse(200, {
      status: true,
      data: courses,
      message: DATA_RECEIVED_SUCCESSFULLY,
    });
  } catch (error) {
    // Log error details
    console.log("error ", error);
    
    // Return error response
    return apiResponse(500, {
      status: false,
      data: null,
      message: error?.message || SOMETHING_WENT_WRONG,
    });
  }
};
