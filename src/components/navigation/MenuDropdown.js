import React from 'react';
import { Link } from 'gatsby';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class MenuDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={this.state.anchorEl ? 'main-menu' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="main-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          {this.props.menuItems.map(item => (
              <MenuItem
                button
                key={item.title}
                component={Link}
                to={item.slug}
                onClick={this.handleClose}
              >
                {item.title}
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    );
  }
}

export default MenuDropdown;
