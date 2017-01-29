import React, { PropTypes } from 'react';
import { Table } from '@src/common/components/table';
import ProductTableRow from './ProductTableRow';

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
