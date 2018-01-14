import axios from 'axios'
const SERVER = 'https://tehwebproj-andreeaadm.c9users.io'

class CiteStore{
  constructor(ee){
    this.ee = ee
    this.content = []
  }
  getAll(authorId){
    axios(SERVER + '/authors/' + authorId + '/cites')
      .then((response) => {
        this.content = response.data
        this.ee.emit('CITE_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(authorId, cite){
    axios.post(SERVER + '/authors/' + authorId + '/cites', cite)
      .then(() => this.getAll(authorId))
      .catch((error) => console.warn(error))
  }
  deleteOne(authorId, citeId){
    axios.delete(SERVER + '/authors/' + authorId + '/cites/' + citeId)
      .then(() => this.getAll(authorId))
      .catch((error) => console.warn(error))
  }
  saveOne(authorId, citeId, cite){
    axios.put(SERVER + '/authors/' + authorId + '/messages/' + citeId, cite)
      .then(() => this.getAll(authorId))
      .catch((error) => console.warn(error))
  }
}

export default CiteStore
