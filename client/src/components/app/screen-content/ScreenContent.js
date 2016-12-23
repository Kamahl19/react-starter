import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import './screen-content.scss';

const ScreenContent = ({ children }) => (
    <div id="screen-content" className="screen-content">
        <Grid>
            {children}
        </Grid>
    </div>
);

ScreenContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ScreenContent;
