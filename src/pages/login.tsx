import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import AuthService from '../service/auth.service';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginWrapper = styled.div`
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

const LoginPage = () => {
  const router = useRouter();
  const [credential, setCredential] = useState({ email: '', password: '' });
  const [openSnack, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('false');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredential((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOpenSnackbar(false);
    setError('');
    try {
      await AuthService.login(credential);
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
    <LoginWrapper>
      <div className="login-container">
        <div className="mb-8 text-center">
          <Typography variant="h4" className="text-green-500">
            Login into Next Video
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
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="password"
                type="password"
                className="mb-5"
                id="pass"
                name="password"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                className="mb-5"
                type="submit"
              >
                Login
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                className="bg-red-600 text-white mb-5"
              >
                Signin Google
              </Button>

              <Link href="/signup" passHref>
                <Typography component="a" variant="body1" className="w-full text-center hover:underline" color="primary">
                  Create a account
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
    </LoginWrapper>
  );
};

export default LoginPage;
