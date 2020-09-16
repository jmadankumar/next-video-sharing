import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <AppBar>
      <Toolbar className="bg-white">
        <div className="flex-grow">
          <Link href="/">
            <Typography variant="h5" className="text-black">Next Video</Typography>
          </Link>
        </div>
        <Button color="primary" >Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
