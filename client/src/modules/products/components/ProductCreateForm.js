import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/inputs';

@linkedState(['name', 'description'])
export default class ProductCreateForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    handleSubmit = (e) => {
        const { name, description, onSubmit } = this.props;

        onSubmit({ name, description });
    }

    render() {
        const { linkState, formErrors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Create Product</h3>

                <Input
                    {...linkState('name')}
                    label="Name"
                    placeholder="Name"
                    name="name"
                    error={formErrors.name}
                    autoFocus
                />

                <Input
                    {...linkState('description')}
                    type="textarea"
                    label="Description"
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
