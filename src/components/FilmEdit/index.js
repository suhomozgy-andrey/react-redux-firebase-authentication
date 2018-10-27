import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { Form, Input, Button, Rate } from "antd";
import { db } from "../../firebase";
import * as routes from "../../constants/routes";
import withAuthorization from "../Session/withAuthorization";
import * as actions from "../../action";

const FormItem = Form.Item;

class FilmNewFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    db.onceGetFilm(id).then(snapshot => {
      this.setState({
        id,
        ...snapshot.val()
      });
    });
  }

  onSubmit = event => {
    const { id } = this.state;
    const { history, actions, form } = this.props;
    event.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        const result = await actions.filmUpdateRequest([
          id,
          values.title,
          values.kinopoiskLink,
          values.rate
        ]);
        if (result && result.status === "ok") {
          // this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.FILMS);
        }
      }
    });
  };

  render() {
    const { title, kinopoiskLink, rate } = this.state;
    const {
      error,
      form: { getFieldDecorator }
    } = this.props;

    const formItemLayout = {};
    return (
      <div>
        <Form onSubmit={this.onSubmit} className="film-edit-form">
          <FormItem label="Title">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Please input film name!" }],
              initialValue: title
            })(<Input placeholder="Film title" />)}
          </FormItem>
          <FormItem label="Kinipoisk Link">
            {getFieldDecorator("kinopoiskLink", {
              rules: [{ required: false }],
              initialValue: kinopoiskLink
            })(<Input placeholder="Film kinopoiskLink" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Rate This Film">
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
      </div>
    );
  }
}

const FilmUpdateLink = id => {
  return <Link to={`/films/${id.id}/edit`}>Edit</Link>;
};

const authCondition = authUser => !!authUser;
const mapStateToProps = state => ({
  error: state.filmState.filmUpdateError
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});
export default compose(
  Form.create(),
  withRouter,
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FilmNewFormPage);

export { FilmUpdateLink };
