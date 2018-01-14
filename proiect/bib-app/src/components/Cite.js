import React,{Component} from 'react'

class Cite extends Component{
  render(){
    return (
      <div>
        <h4>{this.props.cite.title}</h4>
        {this.props.cite.description}
      </div>
    )
  }
}

export default Cite