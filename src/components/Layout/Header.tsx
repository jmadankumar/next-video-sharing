import {
  AppBar,
  Avatar,
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popover,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SearchBar from '../SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AuthState } from '../../store/auth/types';
import { logout } from '../../store/auth/actions';
import { useRouter } from 'next/router';
import AuthService from '../../service/auth.service';

const HeaderWrapper = styled(AppBar)`
  z-index: 1201;
`;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { user, authenticated } = useSelector<RootState, AuthState>((state) => state.authState);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const doLogout = async () => {
    setAnchorEl(null);
    try {
      await AuthService.logout();
      await dispatch(logout());
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeaderWrapper position="fixed" elevation={0} className="border-b border-gray-300">
      <Toolbar className="bg-white">
        <div>
          <Link href="/">
            <Typography variant="h5" className="text-black cursor-pointer">
              Next Video
            </Typography>
          </Link>
        </div>
        <div className="flex justify-center flex-grow ml-5 w-6/12">
          <SearchBar />
        </div>
        {!authenticated && (
          <Link href="/login">
            <Button color="primary">Login</Button>
          </Link>
        )}
        {authenticated && (
          <div>
            <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
              <Avatar alt={user?.name} src={user?.imageUrl} />
              <Typography variant="button" className="ml-2">
                {user?.name}{' '}
              </Typography>
            </Button>
          </div>
        )}
      </Toolbar>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <MenuList>
            <MenuItem onClick={doLogout}>Logout</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </HeaderWrapper>
  );
};

export default Header;
