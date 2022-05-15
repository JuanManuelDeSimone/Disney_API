const express = require('express');
const morgan = require('morgan');
const app = express();
const { sequelize } = require("./database/database");
const index = require('./routes/index');
const cors = require("cors");
const { Character } = require("./models/Character");
const { Movie } = require("./models/Movie");
const { Genre } = require("./models/Genre");
const { GenreMovie } = require("./models/GenreMovie");
const { } = require("./models/CharacterMovie");

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2)

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

//routes
app.use(index);

async function main(){
  try {
    //starting the server
    //await sequelize.sync({force: true});
    app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
