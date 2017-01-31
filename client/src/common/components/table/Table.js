import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const Tbl = ({ children, ...props }) => (
  <Table striped responsive bordered {...props}>
    {children}
  </Table>
);

Tbl.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tbl;
