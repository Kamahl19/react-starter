import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { checkIsAdmin } from '@utils/authHelpers';

export default (Component) => {
    const mapStateToProps = (state) => ({
        isAdmin: checkIsAdmin(state.auth.user),
    });

    @connect(mapStateToProps)
    class IsAdmin extends React.Component {
        static propTypes = {
            dispatch: PropTypes.func.isRequired,
            isAdmin: PropTypes.bool.isRequired,
            pathname: PropTypes.string.isRequired,
        };

        componentWillMount() {
            this.checkIsAdmin(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkIsAdmin(nextProps);
        }

        checkIsAdmin(props) {
            const { isAdmin, dispatch } = props;

            if (!isAdmin) {
                dispatch(push('/'));
            }
        }

        render() {
            const { isAdmin } = this.props;

            return isAdmin ? <Component {...this.props} /> : <div />;
        }
    }

    return IsAdmin;
};
