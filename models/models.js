var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database

// SQLite   DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// CARGAR MÓDULO ORM

var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres

var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// IMPORTAR LA DFINICION DE LA TABLA DE QUIZ EN QUIZ.JS

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// EXPORTA LA DEFINICION DE LA TABLA QUIZ

exports.Quiz = Quiz;

// CREA E INICIALIZA LA TABLA DE PREGUNTAS EN LA BBDD

sequelize.sync().success(function(){

  // success(...) ejecuta el manejador una vez creada la tabla

  Quiz.count().success(function(count){

    // LA TABLA SE INICIALIZA SOLO SI ESTÁ VACÍA

    if (count === 0) {
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                    })
      .success(function(){console.log('Base de Datos Inicializada')});
    };
  });
});
