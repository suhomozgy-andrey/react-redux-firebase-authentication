import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Input,
  Button,
  Upload,
  Icon,
  Rate
} from "antd";
import { db } from "../../firebase";
import { db as database } from "../../firebase/firebase";
import * as routes from "../../constants/routes";
import withAuthorization from "../Session/withAuthorization";

const FormItem = Form.Item;

const FilmNewFormPage = props => (
  <div>
    <h1>Edit film</h1>
    <FilmUpdateForm {...props} />
  </div>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

class FilmUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidMount() {
    const {
      onSetFilm,
      match: {
        params: { id }
      }
    } = this.props;
    let film = {};
    db.onceGetFilm(id).then(snapshot => {
      this.setState({
        id,
        ...snapshot.val()
      });
    });
  }

  onSubmit = event => {
    const { id, title, kinopoiskLink } = this.state;
    const { history } = this.props;

    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        db.doUpdateFilm(id, values.title, values.kinopoiskLink, values.rate)
          .then(() => {
            history.push(routes.FILMS);
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      }
    });
  };

  render() {
    const { title, kinopoiskLink, rate, error } = this.state;

    const isInvalid = title === "";

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form onSubmit={this.onSubmit} className="film-edit-form">
        <FormItem>
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please input film name!" }],
            initialValue: title
          })(<Input placeholder="Film title" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("kinopoiskLink", {
            rules: [{ required: false }],
            initialValue: kinopoiskLink
          })(<Input placeholder="Film kinopoiskLink" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Rate">
          {getFieldDecorator("rate", {
            initialValue: rate
          })(<Rate />)}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update
          </Button>
          <br />
          {error && <p>{error.message}</p>}
        </FormItem>
      </Form>
    );
  }
}

const FilmUpdateLink = id => {
  return <Link to={`/films/${id.id}/edit`}>Edit</Link>;
};

const authCondition = authUser => !!authUser;

export default compose(
  Form.create(),
  withRouter,
  withAuthorization(authCondition)
)(FilmUpdateForm);

export { FilmUpdateForm, FilmUpdateLink };
