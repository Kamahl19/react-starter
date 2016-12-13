import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';

export default class TableCustom extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children, ...props } = this.props;

        return (
            <Table striped responsive bordered {...props}>
                {children}
            </Table>
        );
    }
}
