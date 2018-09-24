import React from 'react';
import { Link } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import css from 'appAssets/css/profile.module.css';

const tabs = [
  { url: '/profile/about/', text: 'about' },
  { url: '/profile/talks/', text: 'talks' },
  { url: '/profile/account/', text: 'account' },
  { url: '/profile/communication/', text: 'communication' },
]

const SideBarLink = ({ to, text, isActive }) => (
  <ListItem
    button
    component={Link}
    to={to}
    className={isActive ? css.sidebarObjectSelected : ''}
  >
    <ListItemText primary={text} />
  </ListItem>
);

const SideBar = ({ baseUrl, subroutes, activeSubroute, location }) => (
  <div>
    <h2 className={css.sidebarTitle}>MENU</h2>
    <List component="nav">
      {
        tabs.map(tab => {
          const isActive = location.pathname === tab.url;
          return(
            <SideBarLink
              key={tab.url}
              to={tab.url}
              text={tab.text}
              isActive={isActive}
            />
          )
        })
      }
    </List>
  </div>
);

export default SideBar;
