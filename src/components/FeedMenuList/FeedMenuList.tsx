import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import HistoryIcon from '@material-ui/icons/History';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';

const menus = [
  {
    href: '/feed/history',
    icon: HistoryIcon,
    title: 'History',
  },
  {
    href: '/feed/my_videos',
    icon: VideoLibraryIcon,
    title: 'My Videos',
  },
];
const FeedMenuList = () => {
  const router = useRouter();
  return (
    <List>
      {menus.map(({ href, title, icon: Icon }) => {
        const active = router.pathname === href;
        return (
          <Link href={href} key={href} passHref>
            <ListItem component="a" selected={active}>
              <ListItemIcon>
                <Icon className={cx({ 'text-green-500': active })} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
};

export default FeedMenuList;
