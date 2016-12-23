import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/inputs';

@linkedState(['name', 'description'])
export default class ProductUpdateForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        product: PropTypes.object.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { linkSetState, product } = this.props;

        linkSetState({
            name: product.name,
            description: product.description,
        });
    }

    handleSubmit = (e) => {
        const { name, description, onSubmit } = this.props;

        onSubmit({ name, description });
    }

    render() {
        const { linkState, formErrors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Update Product</h3>

                <Input
                    {...linkState('name')}
                    placeholder="Name"
                    name="name"
                    error={formErrors.name}
                    autoFocus
                />

                <Input
                    {...linkState('description')}
                    type="textarea"
                    placeholder="Description"
                    name="description"
                    error={formErrors.description}
                />

                <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    bsStyle="primary"
                >
                    Submit
                </Button>

            </form>
        );
    }
}
