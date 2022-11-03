const fs = require('fs');
const path = require('path');

const heroesFilePath = path.join(__dirname, '../data/heroes.json');
const heroes = JSON.parse(fs.readFileSync(heroesFilePath, 'utf-8'));

const controller = {
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {
        const heroes = JSON.parse(fs.readFileSync(heroesFilePath, 'utf-8'));
		res.render('heroes/heroes',{
			 heroes
		})
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {
		const id = req.params.id;
		const heroe = heroes.find(heroe => heroe.id == id);
		res.render('heroe/heroe',{
			heroe
	   })
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		res.render('heroe/heroeFormCreate')
	},
	
	// (post) Create -  Método para guardar la info
	store: (req, res) => {
		//Guradamos el producto

		let newHeroe = {
            id: heroes[heroes.length - 1].id + 1,
			nombre: req.body.name,
			bio: req.body.bio,
			img: req.file.filename,
			aparicion: req.body.date,
			casa: req.body.casa
		}
		heroes.push(newHeroe);
		fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, "  "));
		res.redirect("/heroes")
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		const id = req.params.id;
		const heroe = heroes.find(heroe => heroe.id == id);
		
		res.render('heroe/heroeFormEdit', {
			heroe
		})
	},
	// (put) Update - Método ara actualizar la info
	update: (req, res) => {	
		// Editamos el producto que llegó por parámetro su ID
		let id = req.params.id;
		let heroeToEdit = heroes.find(heroe => {
			return heroe.id == id;
		});

		let editHeroe = {
			id: id,
			nombre: req.body.name,
			bio: req.body.bio,
			img: req.file ? req.file.filename : heroeToEdit.img,
			aparicion: req.body.date,
			casa: req.body.casa
		}
		
		// // Ya hemos modificado el array
		heroes.forEach((heroe, index) => {
			if(heroe.id == id) {
				heroes[index] = editHeroe;
			}
		});

		fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, " "));
		
		res.redirect("/heroes")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		//Eliminamos el producto que llegó por parámetro su ID
		let id = req.params.id;
		
		let finalHeroes = heroes.filter(heroe => heroe.id != id);
		
		fs.writeFileSync(heroesFilePath, JSON.stringify(finalHeroes, null, " "));

		res.redirect("/heroes")	
	}
};

module.exports = controller;