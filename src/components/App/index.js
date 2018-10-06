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
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Navigation />
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "24px 16px 0" }}>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                <Route
                  exact
                  path={routes.LANDING}
                  component={() => <LandingPage />}
                />
                <Route
                  exact
                  path={routes.SIGN_UP}
                  component={() => <SignUpPage />}
                />
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
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withAuthentication(App);
