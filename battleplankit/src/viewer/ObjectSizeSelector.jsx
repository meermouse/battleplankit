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
    constructor(props) {
        super(props);
        this.state = {
            selectedSize: (props.objectType === 'Rounds' ? roundSizes[0] : ovalSizes[0])
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.objectType !== this.props.objectType) {
            const newSize = this.props.objectType === 'Rounds' ? roundSizes[0] : ovalSizes[0];
            this.setState({ selectedSize: newSize });
            if (this.props.onSizeChange) {
                this.props.onSizeChange(newSize);
            }
        }
    }

    handleSizeChange = (e) => {
        this.setState({ selectedSize: e.target.value });
        if (this.props.onSizeChange) {
            this.props.onSizeChange(e.target.value);
        }
    }

    render() {
        const { objectType } = this.props;
        const options = objectType === 'Rounds' ? roundSizes : ovalSizes;
        return (
            <select className="object-size-dropdown" value={this.state.selectedSize} onChange={this.handleSizeChange}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        );
    }
}

export default ObjectSizeSelector;
