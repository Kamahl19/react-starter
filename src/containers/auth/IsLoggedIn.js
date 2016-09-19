import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default (Component) => {
    const mapStateToProps = (state, ownProps) => ({
        isLoggedIn: state.auth.isLoggedIn,
        pathname: ownProps.location.pathname,
    });

    @connect(mapStateToProps)
    class IsLoggedIn extends React.Component {
        static propTypes = {
            dispatch: PropTypes.func.isRequired,
            isLoggedIn: PropTypes.bool.isRequired,
            pathname: PropTypes.string.isRequired,
        };

        componentWillMount() {
            this.checkIsLoggedIn(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkIsLoggedIn(nextProps);
        }

        checkIsLoggedIn(props) {
            const { isLoggedIn, pathname, dispatch } = props;

            if (!isLoggedIn) {
                dispatch(push(`/login?next=${pathname}`));
            }
        }

        render() {
            return this.props.isLoggedIn ? <Component {...this.props} /> : <div />;
        }
    }

    return IsLoggedIn;
};
