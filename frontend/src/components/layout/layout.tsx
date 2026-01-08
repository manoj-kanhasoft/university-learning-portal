import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Grid } from "@mui/material";

// This component represents the layout for the application.
// It renders the child routes (Outlet) if the user is authenticated, otherwise redirects to the login page.
export default function Layout() {
  // Check if the user is authenticated by accessing the user token from the Redux store
  let userToken = useAppSelector((state) => state.authSlice.userData.token);

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        item
        sm={6}
        sx={{
          backgroundImage: "url(login.png)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#9bcdff",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid
        item
        sm={6}
        sx={{ backgroundColor: "white", display: "flex", alignItems: "center" }}
      >
        {userToken ? <Navigate to="/course-list" /> : <Outlet />}
      </Grid>
    </Grid>
  );
}
