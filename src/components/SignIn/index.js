import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { auth } from "../../firebase";
import * as routes from "../../constants/routes";

const FormItem = Form.Item;

const SignInPage = ({ history }) => (
  <div>
    <h1>SignIn</h1>
    <WrappedSignInForm history={history} />

    <SignUpLink />
  </div>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // onSubmit = event => {
  //   const { email, password } = this.state;

  //   const { history } = this.props;

  //   auth
  //     .doSignInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       this.setState(() => ({ ...INITIAL_STATE }));
  //       history.push(routes.HOME);
  //     })
  //     .catch(error => {
  //       this.setState(updateByPropertyName("error", error));
  //     });

  //   event.preventDefault();
  // };

  handleSubmit = event => {
    const { history } = this.props;
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        auth
          .doSignInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            // this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      }
    });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br />
          <span className="login-form-forgot">
            <PasswordForgetLink />
          </span>
          {error && <p>{error.message}</p>}
        </FormItem>
      </Form>
    );
  }
}

// <form onSubmit={this.onSubmit}>
//         <input
//           value={email}
//           onChange={event =>
//             this.setState(updateByPropertyName("email", event.target.value))
//           }
//           type="text"
//           placeholder="Email Address"
//         />
//         <input
//           value={password}
//           onChange={event =>
//             this.setState(updateByPropertyName("password", event.target.value))
//           }
//           type="password"
//           placeholder="Password"
//         />
//         <button disabled={isInvalid} type="submit">
//           Sign In
//         </button>

//         {error && <p>{error.message}</p>}
//       </form>

const WrappedSignInForm = Form.create()(SignInForm);

export default withRouter(SignInPage);

export { WrappedSignInForm };
