import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { registerUserThunk } from "../store/thunk/authThunk";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  id: string;
  firstname: string;
  lastname: string;
  educationDegree: string;
  password: string;
  address: string;
  email: string;
  phone: string;
}

const engineeringFields: string[] = [
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Engineering",
  "Electrical Engineering",
  "Environmental Engineering",
  "Industrial Engineering",
  "Mechanical Engineering",
  "Software Engineering",
  "Structural Engineering",
];

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    dispatch(registerUserThunk({payload: data})).then(() => {
      navigate("/");
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Student Registration Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID"
              {...register('id', { required: 'ID is required' })}
              error={!!errors.id}
              helperText={errors.id?.message}
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              {...register("firstname", { required: "First name is required" })}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              {...register("lastname", { required: "Last name is required" })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.educationDegree}>
              <InputLabel>Education Degree</InputLabel>
              <Controller
                name="educationDegree"
                control={control}
                defaultValue=""
                rules={{ required: "Education degree is required" }}
                render={({ field }) => (
                  <Select {...field} label="Education Degree">
                    {engineeringFields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.educationDegree && (
                <FormHelperText>
                  {errors.educationDegree.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              {...register("phone", { required: "Phone number is required" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ mt: 2, textAlign: "left" }}>
                Already have an account?
                <Link component={RouterLink} to="/" sx={{ ml: 1 }}>
                  Sign In
                </Link>
              </Typography>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default StudentForm;
