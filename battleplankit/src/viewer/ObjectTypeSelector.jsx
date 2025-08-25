
import React, { Component } from 'react';
import ObjectSizeSelector from './ObjectSizeSelector';

const options = [
    'Rounds',
    'Ovals'
];

class ObjectTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: options[0]
        };
    }

    handleTypeChange = (e) => {
        this.setState({ selectedType: e.target.value });
    }

    render() {
        return (
            <div>
                <select className="object-type-dropdown" value={this.state.selectedType} onChange={this.handleTypeChange}>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <ObjectSizeSelector objectType={this.state.selectedType} />
            </div>
        );
    }
}

export default ObjectTypeSelector;
