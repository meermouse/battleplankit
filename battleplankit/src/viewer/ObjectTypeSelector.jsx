
import React, { Component } from 'react';

const options = [
    'Rounds',
    'Ovals'
];

class ObjectTypeSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select className="object-type-dropdown">
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        );
    }
}

export default ObjectTypeSelector;
