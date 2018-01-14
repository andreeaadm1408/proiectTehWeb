import React,{Component} from 'react'

class Author extends Component{
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      author : this.props.author,
      authorName : this.props.author.name
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      author : nextProps,
      authorName : this.props.author.name,
      isEditing : false
    })
  }
  render(){
    if(this.state.isEditing){
      return (<div>
        <input type="text" name="authorName" value={this.state.authorName} onChange={this.handleChange}/> 
        <input type="button" value="save" onClick={() => this.props.onSave(this.props.author.id, {name : this.state.authorName})}/>
        <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
      </div>)            
    }
    else{
      return (<div>
        {this.state.authorName}
        <input type="button" value="delete" onClick={() => this.props.onDelete(this.state.author.id)}/>
        <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
        <input type="button" value="details" onClick={() => this.props.onSelect(this.props.author.id)}/> 
      </div>)
    }
  }
}

export default Author