import React, {Component} from 'react'
import Cite from './Cite'
import CiteForm from './CiteForm'
import CiteStore from '../stores/CiteStore'
import {EventEmitter} from 'fbemitter'

const ee = new EventEmitter()
const store = new CiteStore(ee)

class AuthorDetails extends Component{
  constructor(props){
    super(props)
    this.state = {
      cites : []
    }
    this.addCite = (cite) => {
      store.addOne(this.props.author.id, cite)
    }
    this.deleteCite = () => {}
    this.saveCite = () => {}
  }
  componentDidMount(){
    store.getAll(this.props.author.id)
    ee.addListener('CITE_LOAD', () => {
      this.setState({
        cites : store.content
      })
    })
  }
  render(){
    return (
      <div>
        Author {this.props.author.name}
        <h3>These are his quotes:</h3>
        {
          this.state.cites.map((m) => <Cite cite={m} onDelete={this.deleteCite} key={m.id} onSave={this.saveCite} />)
        }
        <h3>Add me another one:</h3>
        <CiteForm onAdd={this.addCite}/>
      </div>  
    )
  }
}

export default AuthorDetails





