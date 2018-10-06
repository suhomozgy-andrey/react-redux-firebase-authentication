import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon, Button } from "antd";
import SignOutButton from "../SignOut";
import * as routes from "../../constants/routes";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <Menu theme="dark" mode="inline">
    <Menu.Item key="1">
      <Link to={routes.LANDING}>
        <Icon type="user" />
        <span className="nav-text">Landing</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={routes.HOME}>
        <Icon type="video-camera" />
        <span className="nav-text">Home</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to={routes.ACCOUNT}>
        <Icon type="upload" />
        <span className="nav-text">Account</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu theme="dark" mode="inline">
    <Menu.Item key="1">
      <Link to={routes.LANDING}>
        <Icon type="user" />
        <span className="nav-text">Landing</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={routes.SIGN_IN}>
        <Icon type="login" />
        <span className="nav-text">Sign In</span>
      </Link>
    </Menu.Item>
  </Menu>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);
