import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import './input.scss';

const Input = ({ type, name, label, rightLabel, help, bsSize, error, ...props }) => (
    <FormGroup
        controlId={`input_${name}`}
        bsSize={bsSize}
        validationState={error ? 'error' : undefined}
    >

        {(label || rightLabel) &&
            <ControlLabel>
                {label}
                <span className="right-label">{rightLabel}</span>
            </ControlLabel>
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

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    bsSize: PropTypes.string,
    error: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
};

export default Input;
