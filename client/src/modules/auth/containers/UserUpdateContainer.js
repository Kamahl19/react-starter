import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formValidation from '@src/utils/formValidation';
import { getUser, updateUser } from '../ducks/authDucks';
import { UserUpdateForm } from '../components';
import { updateUserSchema } from '../schema/authSchema';

const mapStateToProps = (state) => ({
    user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateUser }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class UserUpdateContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (userData) => {
        const { actions, user } = this.props;

        this.setState({ formErrors: {} });

        formValidation(updateUserSchema, userData)
            .then(() => {
                actions.updateUser(user.id, { ...userData, repeatPassword: undefined });
            }, (formErrors) => {
                this.setState({ formErrors });
            });
    }

    render() {
        const { user } = this.props;
        const { formErrors } = this.state;

        if (!user) {
            return (<div />);
        }

        return (
            <UserUpdateForm
                user={user}
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
