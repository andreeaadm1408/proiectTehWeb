import React, {Component} from 'react'
import AuthorStore from '../stores/AuthorStore'
import {EventEmitter} from 'fbemitter'
import Author from './Author'
import AuthorForm from './AuthorForm'
import AuthorDetails from './AuthorDetails'

const ee = new EventEmitter()
const store = new AuthorStore(ee)

function addAuthor(author){
  store.addOne(author)
}

function deleteAuthor(id){
  store.deleteOne(id)
}

function saveAuthor(id, author){
  store.saveOne(id, author)
}

class AuthorList extends Component{
  constructor(props){
    super(props)
    this.state = {
      authors : [],
      detailsFor : -1,
      selected : null
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.selectAuthor = (id) => {
      store.getOne(id)
      ee.addListener('SINGLE_AUTHOR_LOAD', () => {
        this.setState({
          detailsFor : store.selected.id,
          selected : store.selected
        })
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('AUTHOR_LOAD', () => {
      this.setState({
        authors : store.content
      })
    })
  }
  render(){
    if (this.state.detailsFor === -1){
      return (<div>
        {
          this.state.authors.map((e) => <Author author={e} onDelete={deleteAuthor} key={e.id} onSave={saveAuthor} onSelect={this.selectAuthor} />)
        }
        <AuthorForm handleAdd={addAuthor}/>
      </div>)      
    }
    else{
      return (
        <div>
          <AuthorDetails author={this.state.selected} />
          <input type="button" value="back" onClick={() => this.cancelSelection()}/>
        </div>  
      )
    }
  }
}

export default AuthorList



