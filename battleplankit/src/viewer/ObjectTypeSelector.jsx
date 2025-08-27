
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
            selectedType: options[0],
            selectedSize: ''
        };
    }

    handleTypeChange = (e) => {
        const newType = e.target.value;
        this.setState({ selectedType: newType });
    }

    handleSizeChange = (size) => {
        this.setState({ selectedSize: size });
    }

    handleButtonClick = () => {
        const { selectedType, selectedSize } = this.state;
        alert(`Type: ${selectedType}, Size: ${selectedSize}`);
    }

    render() {
        return (
            <div>
                <select className="object-type-dropdown" value={this.state.selectedType} onChange={this.handleTypeChange}>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <ObjectSizeSelector objectType={this.state.selectedType} onSizeChange={this.handleSizeChange} />
                <button onClick={this.handleButtonClick}>Add Shape</button>
            </div>
        );
    }
}

export default ObjectTypeSelector;
