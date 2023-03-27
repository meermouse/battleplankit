import React, { Component } from 'react';
import './BattlePlanDropdown.scss';

class BattlePlanDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.options[0] || ''
    };
  }

  handleChange = (event) => {
    const newSelectedOption = event.target.value;
    this.setState({ selectedOption: newSelectedOption });
    this.props.onOptionChanged(newSelectedOption);
  };

  render() {
    return (
      <div className="battle-plan-dropdown">
        <select value={this.state.selectedOption} onChange={this.handleChange}>
          {this.props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default BattlePlanDropdown;
