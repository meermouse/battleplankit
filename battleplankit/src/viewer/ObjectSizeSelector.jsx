import React, { Component } from 'react';

const roundSizes = [
    '25mm', 
    '28mm', 
    '32mm', 
    '40mm', 
    '50mm', 
    '60mm',
    '100mm', 
    '130mm',
    '160mm'
];
const ovalSizes = [
    '60x35mm', 
    '73x42mm', 
    '90x52mm', 
    '105x70mm',
    '120x92mm',
    '280x210mm'
];

class ObjectSizeSelector extends Component {
    render() {
        const { objectType } = this.props;
        const options = objectType === 'Rounds' ? roundSizes : ovalSizes;
        return (
            <select className="object-size-dropdown">
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        );
    }
}

export default ObjectSizeSelector;
