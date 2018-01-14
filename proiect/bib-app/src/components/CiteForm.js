import React,{Component} from 'react'

class CiteForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      citeTitle : '',
      citeDescription : ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render(){
    return (<div>
      Title : <input type="text" name="citeTitle" onChange={this.handleChange}/>
      Description : <input type="text" name="citeDescription" onChange={this.handleChange} />
      <input type="button" value="add" onClick={() => this.props.onAdd({title : this.state.citeTitle, description : this.state.citeDescription})} />
    </div>)
  }
}

export default CiteForm


