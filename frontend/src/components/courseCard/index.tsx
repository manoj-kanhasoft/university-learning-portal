import React, { useState } from "react";
import { Card, CardContent, Typography, styled, Button } from "@mui/material";
import ConfirmationDialog from "../confirmDialog"; // Import the reusable dialog component
import { registerCourse } from "../../store/thunk/courseThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";

// Define TypeScript types
interface Course {
  _id: number;
  name: string;
  description: string;
  department: string;
  credits: number;
}

const RootCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginBottom: theme.spacing(2),
}));

const TitleTypography = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: "bold",
}));

const ImageContainer = styled("div")({
  width: "100%",
  height: 200,
  overflow: "hidden",
  borderRadius: 4,
  marginBottom: 12,
});

const CourseCard: React.FC<{ course: Course; hideRegister?: boolean }> = ({
  course,
  hideRegister,
}) => {
  const dispatch = useAppDispatch();

  const userToken = useAppSelector((state) => state.authSlice.userData.token);
  const userId = useAppSelector((state) => state.authSlice.userData.id);
  useAppSelector;
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRegister = () => {
    handleOpenDialog();
    // Additional registration logic can be added here
  };

  const handleConfirmRegistration = () => {
    // Implement your registration logic here
    handleCloseDialog();
    dispatch(
      registerCourse({
        token: userToken,
        payload: { userId: userId, courseId: course._id },
      })
    );
  };

  return (
    <RootCard>
      <CardContent>
        <ImageContainer>
          <img
            src={"course-default.jpg"}
            alt="Course"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ImageContainer>
        <TitleTypography gutterBottom>{course.name}</TitleTypography>
        <Typography variant="body2" component="p">
          {course.description}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Department: {course.department}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Credits: {course.credits}
        </Typography>
        {!hideRegister && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleRegister}
          >
            Register
          </Button>
        )}

        {/* Reusable ConfirmationDialog component */}
        <ConfirmationDialog
          open={openDialog}
          title="Confirm Registration"
          message={`Are you sure you want to register for "${course.name}"?`}
          onConfirm={handleConfirmRegistration}
          onClose={handleCloseDialog}
        />
      </CardContent>
    </RootCard>
  );
};

export default CourseCard;
