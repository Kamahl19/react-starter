import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default (Component) => {
    const mapStateToProps = (state) => ({
        isAuthenticating: state.auth.isAuthenticating,
        isLoggedIn: state.auth.isLoggedIn,
    });

    @connect(mapStateToProps)
    class IsVisitor extends React.Component {
        static propTypes = {
            dispatch: PropTypes.func.isRequired,
            isAuthenticating: PropTypes.bool.isRequired,
            isLoggedIn: PropTypes.bool.isRequired,
        };

        componentWillMount() {
            this.checkIsVisitor(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkIsVisitor(nextProps);
        }

        checkIsVisitor(props) {
            const { isLoggedIn, dispatch } = props;

            if (isLoggedIn) {
                dispatch(push('/'));
            }
        }

        render() {
            const { isLoggedIn, isAuthenticating } = this.props;

            return !isLoggedIn && !isAuthenticating ? <Component {...this.props} /> : <div />;
        }
    }

    return IsVisitor;
};
