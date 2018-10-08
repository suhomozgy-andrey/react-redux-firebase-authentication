import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import withAuthentication from "../Session/withAuthentication";
import * as routes from "../../constants/routes";

import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <Layout className="layout">
          {authUser && (
            <Sider breakpoint="lg" collapsedWidth="0">
              <div className="logo" />
              <Navigation />
            </Sider>
          )}

          <Layout>
            <Content>
              <div className="content_wrapper">
                <Route
                  exact
                  path={routes.LANDING}
                  component={() => <LandingPage />}
                />
                {/*<Route
                  exact
                  path={routes.SIGN_UP}
                  component={() => <SignUpPage />}
                />*/}
                <Route
                  exact
                  path={routes.SIGN_IN}
                  component={() => <SignInPage />}
                />
                <Route
                  exact
                  path={routes.PASSWORD_FORGET}
                  component={() => <PasswordForgetPage />}
                />
                <Route
                  exact
                  path={routes.HOME}
                  component={() => <HomePage />}
                />
                <Route
                  exact
                  path={routes.ACCOUNT}
                  component={() => <AccountPage />}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withAuthentication(App);
