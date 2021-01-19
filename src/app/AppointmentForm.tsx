import { FormGroup, H4, InputGroup } from '@blueprintjs/core';
import React from 'react';

import './AppointmentForm.scss';

const AppointmentForm: React.FC = () => {
    return (
        <div className="appointment-form">
            <H4>Appointment on Feb.6, 2021</H4>
            <div className="content">
                {['first-name', 'last-name', 'note'].map((elementType) => {
                    let label;
                    let placeholder;

                    switch (elementType) {
                        case 'first-name':
                            label = 'First Name';
                            placeholder = 'First Name';
                            break;

                        case 'last-name':
                            label = 'Last Name';
                            placeholder = 'Last Name';
                            break;
                        case 'note':
                            label = 'Note';
                            placeholder = 'Note';
                            break;
                        default:
                            throw new Error('Unknown label and placeholder.');
                    }
                    return (
                        <FormGroup
                            key={`appointment-form-${elementType}`}
                            // helperText="Helper text with details..."
                            label={label}
                            labelFor={elementType}
                            labelInfo="(required)"
                        >
                            <InputGroup
                                id={elementType}
                                placeholder={placeholder}
                            />
                        </FormGroup>
                    );
                })}
            </div>
        </div>
    );
};

export default AppointmentForm;
