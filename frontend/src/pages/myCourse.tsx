import React, { useEffect } from "react";
import CourseCard from "../components/courseCard";
import { Grid, Typography } from "@mui/material";
import { getMyCourseList } from "../store/thunk/courseThunk";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCourseList } from "../store/slices/courseSlice";
import ScreenLoader from "../components/layout/ScreenLoader";

const MyCourseList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { courseList, loading } = useAppSelector((state) => state.courseSlice);
  const userToken = useAppSelector((state) => state.authSlice.userData.token);
  const userId = useAppSelector((state) => state.authSlice.userData.id);

  useEffect(() => {
    dispatch(
      getMyCourseList({
        token: userToken,
        id: userId,
      })
    );
    return () => {
      dispatch(setCourseList([]));
    };
  }, []);

  return (
    <div>
      {loading && <ScreenLoader />}
      <Typography variant="h5">My Registered Course List</Typography>
      <Grid container spacing={2}>
        {courseList?.map((course: any) => (
          <Grid item sm={4}>
            <CourseCard key={course.id} course={course} hideRegister={true} />
          </Grid>
        ))}
        {courseList.length === 0 ? (
          <Typography mt={5}>
            Sorry! you are not register in any course
          </Typography>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default MyCourseList;
