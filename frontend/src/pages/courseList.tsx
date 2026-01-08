import React, { useEffect } from "react";
import CourseCard from "../components/courseCard";
import { Grid, Typography } from "@mui/material";
import { getCourseList } from "../store/thunk/courseThunk";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCourseList } from "../store/slices/courseSlice";
import ScreenLoader from "../components/layout/ScreenLoader";

const CourseList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { courseList, loading } = useAppSelector((state) => state.courseSlice);
  const userToken = useAppSelector((state) => state.authSlice.userData.token);

  useEffect(() => {
    dispatch(
      getCourseList({
        token: userToken,
      })
    );
    return () => {
      dispatch(setCourseList([]));
    };
  }, []);

  return (
    <div>
      <Typography variant="h5">Course List</Typography>
      {loading && <ScreenLoader />}
      <Grid container spacing={2}>
        {courseList?.map((course: any) => (
          <Grid item sm={4}>
            <CourseCard key={course.id} course={course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseList;
