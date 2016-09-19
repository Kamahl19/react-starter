import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class Input extends Component {
    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string,
        label: PropTypes.string,
        help: PropTypes.string,
        bsSize: PropTypes.string,
        error: PropTypes.string,
    };

    static defaultProps = {
        type: 'text',
    };

    render() {
        const { type, name, label, help, bsSize, error, ...props } = this.props;

        return (
            <FormGroup
                controlId={`input_${name}`}
                bsSize={bsSize}
                validationState={error ? 'error' : undefined}
            >

                {label &&
                    <ControlLabel>{label}</ControlLabel>
                }

                <FormControl
                    type={type}
                    {...props}
                />

                {help &&
                    <HelpBlock>{help}</HelpBlock>
                }

                {error &&
                    <HelpBlock>{error}</HelpBlock>
                }

            </FormGroup>
        );
    }
}
