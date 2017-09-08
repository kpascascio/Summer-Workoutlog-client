require('dotenv').config();
const express = require('express');
const app = express()

app.use(express.static(__dirname + 'dist'))

app.get('/', function(req,res){
    res.sendFile('index.html')
})

app.listen(process.env.PORT || 8080, function(){
    console.log('Webserver is listening on port 8080');
})