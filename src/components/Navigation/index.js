import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Menu, Icon, Button } from "antd";
import SignOutButton from "../SignOut";
import * as routes from "../../constants/routes";

const Navigation = props => {
  const {
    location: { pathname }
  } = props;
  return (
    <div>
      {props.authUser ? (
        <NavigationAuth pathname={pathname} />
      ) : (
        <NavigationNonAuth />
      )}
    </div>
  );
};

const NavigationAuth = ({ pathname }) => (
  <Menu theme="dark" mode="inline" selectable={false} selectedKeys={[pathname]}>
    <Menu.Item key="/">
      <Link to={routes.LANDING}>
        <Icon type="user" />
        <span className="nav-text">Landing</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/films">
      <Link to={routes.FILMS}>
        <Icon type="user" />
        <span className="nav-text">Films</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/home">
      <Link to={routes.HOME}>
        <Icon type="video-camera" />
        <span className="nav-text">Home</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/account">
      <Link to={routes.ACCOUNT}>
        <Icon type="upload" />
        <span className="nav-text">Account</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="0">
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = ({ pathname }) => (
  <Menu theme="dark" mode="inline" selectable={false} selectedKeys={[pathname]}>
    <Menu.Item key="/">
      <Link to={routes.LANDING}>
        <Icon type="user" />
        <span className="nav-text">Landing</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/films">
      <Link to={routes.FILMS}>
        <Icon type="user" />
        <span className="nav-text">Films</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/sign_in">
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

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Navigation);
