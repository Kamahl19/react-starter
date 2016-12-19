import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchUser } from '@src/ducks/auth';

const mapStateToProps = (state) => ({
    user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchUser }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default (WrappedComponent) => class extends Component {
    static displayName = 'UserContainer';

    static propTypes = {
        actions: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { actions, user } = this.props;

        actions.fetchUser(user.id);
    }

    render() {
        const { user } = this.props;

        if (!user) {
            return (<div />);
        }

        return (
            <WrappedComponent
                {...this.props}
            />
        );
    }
};
