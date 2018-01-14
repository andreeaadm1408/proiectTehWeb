var express = require("express")
var app = express()

var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")
app.use(nodeadmin(app));

//connect to mysql database
var sequelize = new Sequelize('bib', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Authors = sequelize.define('authors', {
    name: Sequelize.STRING
})

var Cites = sequelize.define('cites', {
    title: Sequelize.STRING,
    author_id: Sequelize.INTEGER,
    description: Sequelize.STRING,
    image: Sequelize.STRING
})


var app = express()
app.use(express.static('../bib-app/build'))

//access static files
//app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// get a list of authors
app.get('/authors', function(request, response) {
    Authors.findAll().then(function(authors){
        response.status(200).send(authors)
    })
        
})

// get one author by id
app.get('/authors/:id', function(request, response) {
    Authors.findOne({where: {id:request.params.id}}).then(function(author) {
        if(author) {
            response.status(200).send(author)
        } else {
            response.status(404).send()
        }
    })
})

//create a new author
app.post('/authors', function(request, response) {
    Authors.create(request.body).then(function(author) {
        response.status(201).send(author)
    })
})

app.put('/authors/:id', function(request, response) {
    Authors.findById(request.params.id).then(function(author) {
        if(author) {
            author.update(request.body).then(function(author){
                response.status(201).send(author)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/authors/:id', function(request, response) {
    Authors.findById(request.params.id).then(function(author) {
        if(author) {
            author.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


// get a list of authors
app.get('/cites', function(request, response) {
    Cites.findAll().then(function(cites){
        response.status(200).send(cites)
    })
        
})


app.get('/cites/:id', function(request, response) {
    Cites.findById(request.params.id).then(
            function(cite) {
                response.status(200).send(cite)
            }
        )
})



app.post('/cites', function(request, response) {
    Cites.create(request.body).then(function(cite) {
        response.status(201).send(cite)
    })
})



app.put('/cites/:id', function(request, response) {
    Cites.findById(request.params.id).then(function(cite) {
        if(cite) {
            cite.update(request.body).then(function(cite){
                response.status(201).send(cite)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
app.put('/authors/:aid/cites/:mid', (req, res, next) => {
	Cites.findById(req.params.mid)
		.then((cite) => {
			if (cite){
				return cite.update(req.body, {fields : ['title', 'description']})
			}
			else{
				res.status(404).send('not found')
			}
		})
		.then(() => {
			if (!res.headersSent){
				res.status(201).send('modified')
			}
		})
		.catch((err) => next(err))
})

app.post('/authors/:aid/cites', (req, res, next) => {
	Authors.findById(req.params.aid)
		.then((author) => {
			if (author){
				let cite = req.body
				cite.author_id = author.id
				return Cites.create(cite)
			}
			else{
				res.status(404).send('not found')
			}
		})
		.then((messages) => {
			if (!res.headersSent){
				res.status(200).send('created')
			}	
		})
		.catch((err) => next(err))
	
})


app.delete('/cites/:id', function(request, response) {
    Cites.findById(request.params.id).then(function(cite) {
        if(cite) {
            cite.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/authors/:id/cites', function(request, response) {
    Cites.findAll({where:{author_id: request.params.id}}).then(
            function(cites) {
                response.status(200).send(cites)
            }
        )
})

app.listen(8080)