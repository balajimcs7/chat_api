const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./db.config');
const User = require('./user.model');
const Chat = require('./user_model');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const {unless} = require('express-unless');
const errors = require('./error');
const { query } = require('express');
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
    console.log('server is started', PORT);

    

});
const io = require('socket.io')(server, {cors: {origins: "*:*"}});

        
        const connectedUser = new Set();
        io.use(function(socket, next){
            if (socket.handshake.query && socket.handshake.query.token){
              jwt.verify(socket.handshake.query.token, 'Snippet_SceretKey', function(err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
              });
            }
            else {
                console.log("Authentication error");
              next(new Error('Authentication error'));
            }    
          }).
        
        on('connection', (socket)=>{
            
            socket.join('test');
            console.log("connected Successfully", socket.id);
            connectedUser.add(socket.id);
            console.log(socket.decoded);
            io.emit('connected-user', connectedUser.size);
            socket.on('disconnect', ()=>{
                console.log("Disconnected SuccessFully", socket.id);
                connectedUser.delete(socket.id);
                io.emit('connected-user', connectedUser.size);
            });
        
            socket.on('message', async (data)=>{
                console.log(data);
                if(data == undefined){
                    return callback({message});
                }
                const user = await User.findOne({email:socket.decoded.data});
                

                let model = {
                    message : data.message,
                    socket_id : socket.id,
                    date:  Date.now(),
                    user_id: user._id,

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
                socket.emit('message-receive', data);
                socket.broadcast.emit('message-receive', data);
                
          });
        });


        auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] },
        ],
    })
);

app.use(express.json());

app.use("/users", require('./users.routes'));

app.use(errors.errorHandler);

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
