const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/arena', {
  useNewUrlParser: true
});


// Create a scheme for items in the arena: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  url: String,
  name: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// get all the winners
app.get('/api/winners', async (req, res) => {
    try {
      let items = await Item.find();
      res.send({items: items});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

// create a winner
app.post('/api/winners', async (req, res) => {
    const winner = new Item({
    name: req.body.name,
    url: req.body.url
  });
  try {
    await winner.save();
    res.send(winner);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// delete a winner
app.delete('/api/winners/:id', async (req, res) => {
    try {
      await Item.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

// edit a winner
app.put('/api/winners/:id', async (req, res) => {
    try{
      let item = await Item.findOne({
        _id: req.params.id
      });
      item.name = req.body.name;
      item.url = req.body.url;
      await item.save();
      res.send(item);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});
  
  

app.listen(3000, () => console.log('Server listening on port 3000!'));