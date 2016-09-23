import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ScreenContent extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
    };

    render() {
        const { children, className } = this.props;

        const cn = classnames('screen-content', {
            [className]: className,
        });

        return (
            <div className={cn}>
                {children}
            </div>
        );
    }
}
