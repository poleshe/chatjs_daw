const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


// Connexions
io.on('connection', (socket) => {
	console.log(' Nou usuari connectat ')

	// Assignar usuari default
	socket.username = "Anonymous"

    // Peticio de canviar usuari
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    // Escoltar el missatge i...
    socket.on('new_message', (data) => {
        // Realitzar broadcast del missatge 
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    // Escoltar si algu esta escrivint
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})