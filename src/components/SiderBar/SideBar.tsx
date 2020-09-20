import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { useRouter } from 'next/dist/client/router';
import cx from 'classnames';
import Link from 'next/link';

const menuList: Array<{ title: string; path: string; icon: any }> = [
  {
    title: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    title: 'Trending',
    path: '/trending',
    icon: WhatshotIcon,
  },
  {
    title: 'Subscriptions',
    path: '/subscriptions',
    icon: SubscriptionsIcon,
  },
];
const SideBarWrapper = styled(Drawer)`
  width: 240px;
  flex-shrink: 0;
  .sidebar-paper {
    width: 240px;
  }
`;
interface SideBarProps {
  floatSideBar?: boolean;
}
const SideBar: React.FC<SideBarProps> = ({ floatSideBar }) => {
  const router = useRouter();
  return (
    <SideBarWrapper
      variant={floatSideBar ? 'temporary' : 'permanent'}
      className=""
      classes={{ paper: 'sidebar-paper' }}
    >
      <Toolbar />
      <List>
        {menuList.map(({ title, icon: Icon, path }) => {
          const active = router.pathname === path;
          return (
            <Link href={path} key={path}>
              <ListItem selected={active} button>
                <ListItemIcon>
                  <Icon className={cx({ 'text-green-500': active })} />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </SideBarWrapper>
  );
};

export default SideBar;
