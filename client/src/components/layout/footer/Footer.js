import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import './footer.scss';

export default class Footer extends Component {
    render() {
        return (
            <footer className="screen-footer">
                <Grid>
                    This is a footer
                </Grid>
            </footer>
        );
    }
}
