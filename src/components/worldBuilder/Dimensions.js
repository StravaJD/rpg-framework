import React, { Component } from 'react';

const Dimensions = ({ selectedDim, selectDim, addDim, removeDim, dims }) =>
  <div className="Dimensions">
    <AddDimension addDim={ addDim }/>
    {
      dims.map((dim, index) =>
        <div
          key={ index }
          className={`Dimension ${selectedDim && selectedDim.name === dim.name ? 'is-selected' : '' }`}
          onClick={ () => selectDim(dim) }
        >
          { dim.name }
          <span className="RemoveDimension" onClick={ () => removeDim(dim) }>X</span>
        </div>
      )
    }
  </div>;

class AddDimension extends Component {
  constructor(props){
    super(props);
    this.state = {
      adding: false
    }
  }
  
  handleBlur(){
    if(this.input.value){
      this.props.addDim({name:this.input.value});
    }
    this.setState({adding: false});
  }
  
  handleKeyDown(event){
    if(event.keyCode === 13){
      if(this.input.value){
        this.props.addDim({name:this.input.value});
      }
      this.setState({adding: false});
    }
  }
  
  startAdding(){
    this.setState({adding: true});
  }
  
  render(){
    return this.state.adding
    ? ( <div className="Dimensions-AddDimension">
      <input
        ref={(el)=>{this.input = el; el && el.focus();}}
        onBlur={ this.handleBlur.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
      /></div> ) 
    : ( <div className="Dimensions-AddDimension SwitchToAdding" onClick={this.startAdding.bind(this)} >Add Dimension</div>)
  }
}

export default Dimensions;