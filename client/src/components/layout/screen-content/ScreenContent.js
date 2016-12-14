import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import classnames from 'classnames';

import './screen-content.scss';

const ScreenContent = ({ children, className }) => {
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
};

ScreenContent.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default ScreenContent;
