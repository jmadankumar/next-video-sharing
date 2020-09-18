import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SearchBar from '../SearchBar';

const HeaderWrapper = styled(AppBar)`
  z-index: 1201;
`;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <HeaderWrapper position="fixed">
      <Toolbar className="bg-white">
        <div className="flex flex-between flex-grow">
          <Link href="/">
            <Typography variant="h5" className="text-black">
              Next Video
            </Typography>
          </Link>
          <div className="ml-5">
            <SearchBar />
          </div>
        </div>
        <Link href="/login">
          <Button color="primary">Login</Button>
        </Link>
      </Toolbar>
    </HeaderWrapper>
  );
};

export default Header;
