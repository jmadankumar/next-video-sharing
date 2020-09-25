import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import AuthService from '../service/auth.service';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { SignupFormData } from '../types/form';

const SignupWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .login-container {
    width: 400px;
    margin: auto;
  }
`;

const Signup: React.FC = () => {
  const router = useRouter();
  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    name: '',
    dob: new Date(),
    gender: 'Male',
  });
  const [openSnack, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('false');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupFormData((values: SignupFormData) => ({ ...values, [name]: value }));
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSignupFormData((values: SignupFormData) => ({ ...values, dob: date as Date }));
  };

  const handleGenderChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setSignupFormData((values: SignupFormData) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOpenSnackbar(false);
    setError('');
    try {
      await AuthService.register(signupFormData);
      router.replace('/');
    } catch (error) {
      if (error.response) {
        setOpenSnackbar(true);
        setError(error.response.data.message);
      }
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <SignupWrapper>
      {' '}
      <div className="login-container">
        <div className="mb-8 text-center">
          <Typography variant="h4" className="text-green-500">
            Create a account with Next Video
          </Typography>
        </div>
        <Card className="login-card">
          <CardContent>
            <form className="flex flex-col my-5" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Email"
                className="mb-5"
                id="email"
                name="email"
                value={signupFormData.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                className="mb-5"
                id="paspasswords"
                name="password"
                onChange={handleChange}
                value={signupFormData.password}
              />
              <TextField
                variant="outlined"
                label="Name"
                type="text"
                className="mb-5"
                id="name"
                name="name"
                onChange={handleChange}
                value={signupFormData.name}
              />
              <KeyboardDatePicker
                margin="normal"
                id="dob"
                name="dob"
                label="Date of birth"
                format="dd/MM/yyyy"
                value={signupFormData.dob}
                onChange={handleDateChange}
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date of birth',
                }}
                className="mb-5"
              />
              <FormControl variant="outlined">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={signupFormData.gender}
                  onChange={handleGenderChange}
                  label="Gender"
                  className="mb-5"
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                className="mb-5"
                type="submit"
              >
                Signup
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                className="bg-red-600 text-white mb-5"
              >
                Signup Google
              </Button>

              <Link href="/login" passHref>
                <Typography
                  component="a"
                  variant="body1"
                  className="w-full text-center hover:underline"
                  color="primary"
                >
                  Go to Login
                </Typography>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
      <Snackbar
        open={openSnack}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={5000}
        onClose={handleClose}
        message={error}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </SignupWrapper>
  );
};

export default Signup;
