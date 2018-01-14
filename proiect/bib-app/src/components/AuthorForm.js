import React,{Component} from 'react'

class AuthorForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      authorName : ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render(){
    return (<div>
      Name : <input type="text" name="authorName" onChange={this.handleChange}/>
      <input type="button" value="add" onClick={() => this.props.handleAdd({name : this.state.authorName})} />
    </div>)
  }
}

export default AuthorForm