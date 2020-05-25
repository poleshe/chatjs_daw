$(function(){
    // Crear la connexio
 var socket = io.connect('http://localhost:3000')

 // Inicialitzar els botons
 var message = $("#message")
 var username = $("#username")
 var send_message = $("#send_message")
 var send_username = $("#send_username")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")

 // Enviar missatges (( emit envia una peticio al servidor )
 send_message.click(function(){
     socket.emit('new_message', {message : message.val()})
 })

 // Escoltar els missatges als que son connectats a socket
 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
 })

 // Canviar nom de usuari
 send_username.click(function(){
     socket.emit('change_username', {username : username.val()})
 })

 // Funció per a veure si algu esta escribint
 message.bind("keypress", () => {
     socket.emit('typing')
 })

 // Escoltar si algu esta escribint
 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
 })
});