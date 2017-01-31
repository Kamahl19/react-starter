import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

const ProductTableRow = ({ product, idx, canDelete, canUpdate, onDeleteClick }) => (
  <tr>
    <td>{idx + 1}</td>
    <td>
      <Link to={`products/${product.id}`}>{product.name}</Link>
    </td>
    <td>{product.description}</td>
    {canUpdate &&
      <td className="text-center">
        <LinkContainer to={`/products/${product.id}/update`}>
          <Button bsStyle="warning" bsSize="xsmall">
            <FontAwesome name="pencil" />
          </Button>
        </LinkContainer>
      </td>
    }
    {canDelete &&
      <td className="text-center">
        <Button bsStyle="danger" bsSize="xsmall" onClick={() => onDeleteClick(product.id)}>
          <FontAwesome name="trash" />
        </Button>
      </td>
    }
  </tr>
);

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  canDelete: PropTypes.bool.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ProductTableRow;
