require('dotenv').config();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieparser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const notifyRouter = require("./routers/notifyRouter");
const messageRouter = require('./routers/messageRouter');
const socketServer = require('./socketServer');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', notifyRouter);
app.use('/api', messageRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

io.on('connection', socket => {
    socketServer(socket)
})

mongoose.connect("mongodb+srv://jover:jover123@cluster0.al7lu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) throw err;
    console.log('Mongodb is connected');
});

// app.get("/", (req, res) => {
//     res.status(500).send("Hi");
// });

http.listen(port, () => {
    console.log(`app is running on ${port}`);
});