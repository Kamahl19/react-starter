import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import classnames from 'classnames';

import './screen-content.less';

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
                <Grid>
                    {children}
                </Grid>
            </div>
        );
    }
}
