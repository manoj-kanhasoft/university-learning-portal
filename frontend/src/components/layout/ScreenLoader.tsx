import { Backdrop, CircularProgress } from "@mui/material";

// screen Loader component definition
const ScreenLoader = () => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

// Exporting the ScreenLoader component as default
export default ScreenLoader;
