import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from "../store/store";
import { loginUserThunk } from '../store/thunk/authThunk';

interface IFormInput {
  email: string;
  password: string;
}

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  
  const dispatch: any = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(loginUserThunk({payload: data}));
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account? 
        <Link component={RouterLink} to="/sign-up" sx={{ ml: 1 }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
