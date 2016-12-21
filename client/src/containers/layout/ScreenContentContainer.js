import React, { PropTypes } from 'react';
import { ScreenContent } from '@src/components/layout';

const ScreenContentContainer = ({ children }) => (
    <ScreenContent>
        {children}
    </ScreenContent>
);

ScreenContentContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ScreenContentContainer;
