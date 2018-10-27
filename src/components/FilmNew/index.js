import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Rate } from 'antd';
import * as routes from '../../constants/routes';
import withAuthorization from '../Session/withAuthorization';
import * as actions from '../../action';

const FormItem = Form.Item;

const INITIAL_STATE = {
  title: '',
  kinopoiskLink: '',
};

class FilmNewFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { history, actions, form } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        const result = await actions.filmCreateRequest([values.title, values.kinopoiskLink, values.rate]);

        if (result && result.status === 'ok') {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.FILMS);
        }
      }
    });
  };

  render() {
    const { title, kinopoiskLink, rate } = this.state;

    const {
      error,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {};
    return (
      <div>
        <h1>Add new film</h1>
        <Form onSubmit={this.onSubmit} className="film-edit-form">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input film name!' }],
              initialValue: title,
            })(<Input placeholder="Film title" />)}
          </FormItem>
          <FormItem label="Kinopoisk Link">
            {getFieldDecorator('kinopoiskLink', {
              rules: [{ required: false }],
              initialValue: kinopoiskLink,
            })(<Input placeholder="Film kinopoiskLink" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Rate This Film">
            {getFieldDecorator('rate', {
              initialValue: rate,
            })(<Rate />)}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Create
            </Button>
            <br />
            {error && <p>{error.message}</p>}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const FilmNewLink = () => (
  <p>
    <Link to={routes.FILM_NEW}>Add new film</Link>
  </p>
);

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => ({
  error: state.filmState.filmCreateError,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default compose(
  Form.create(),
  withRouter,
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FilmNewFormPage);

export { FilmNewLink };
