const express = require('express');
const bodyParser = require('body-parser');
const db = require('monk')('localhost/clowns')
const clowns = db.get('clowns');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get('/', (req,res,next)=>{
  clowns.find({}).then(result=>{
    res.send(result);
  })
})

app.post('/', (req, res, next) => {
    clowns.insert(req.body).then((result) => {
        console.log(result);
        res.send(result)
    }).catch((error) => {
      console.log('sad')
        next(new Error('It Broke'))
    })
})


app.listen(3000, () => {
    console.log('Listening on 3000')
})
