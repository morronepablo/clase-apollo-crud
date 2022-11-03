// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Sistema de Rutas ************
const mainRouter = require('./routes/mainRouter'); // Rutas main
const heroesRouter = require('./routes/heroesRouter'); // Rutas /products

app.use('/', mainRouter);
app.use('/heroes', heroesRouter);

//Pagina no encontrada
app.use ( async (req, res, next) => {
    res.status(404).render('notfound/notFound');
})

// ************ Creando servidor ************
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Servidor corriendo en http://localhost:${port} 🤓👌`);})


