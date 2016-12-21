import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Table } from '@src/components/ui';

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

const ProductTable = ({ products, canDelete, canUpdate, onDeleteClick }) => (
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                {canUpdate &&
                    <th></th>
                }
                {canDelete &&
                    <th></th>
                }
            </tr>
        </thead>
        <tbody>
            {products.map((product, idx) => (
                <ProductTableRow
                    key={product.id}
                    product={product}
                    idx={idx}
                    canDelete={canDelete}
                    canUpdate={canUpdate}
                    onDeleteClick={onDeleteClick}
                />
            ))}
            {!products.length &&
                <tr>
                    <td colSpan={10}>No products</td>
                </tr>
            }
        </tbody>
    </Table>
);

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    canDelete: PropTypes.bool.isRequired,
    canUpdate: PropTypes.bool.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default ProductTable;
