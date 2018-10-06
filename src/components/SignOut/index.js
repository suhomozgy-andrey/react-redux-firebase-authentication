import React from "react";
import { Button } from "antd";
import { auth } from "../../firebase";

const SignOutButton = () => (
  <Button type="primary" icon="logout" onClick={auth.doSignOut}>
    Sign Out
  </Button>
);

export default SignOutButton;
