const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./db.config');
const Chat = require('./user_model');
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
    console.log('server is started', PORT);

    
const io = require('socket.io')(server, {cors: {origins: "*:*"}});

});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database Connected');
    },
    (error) => {
        console.log('Database can`t be connected' + error);
    }
);

        
        const connectedUser = new Set();
        io.on('connection', (socket)=>{
            console.log("connected Successfully", socket.id);
            connectedUser.add(socket.id);
            io.emit('connected-user', connectedUser.size);
            socket.on('disconnect', ()=>{
                console.log("Disconnected SuccessFully", socket.id);
                connectedUser.delete(socket.id);
                io.emit('connected-user', connectedUser.size);
            });
        
            socket.on('message', (data)=>{
                
                if(data == undefined){
                    return callback({message});
                }
                let model = {
                    message : data.message,
                    socket_id : socket.id,
                    date:  Date.now(),
                    user_id: "balaji"

                }
                console.log(model);
                const chat = new Chat(model);
                chat.save()
                
            //    .then((response) => {
            //     return callback(null, response);
                
            //      }).catch((error) => {
            //         return callback(error);
            //     });
                
                console.log(data);
                socket.broadcast.emit('message-receive', data);
          });
        });