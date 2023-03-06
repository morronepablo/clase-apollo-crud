const fs = require('fs');
const path = require('path');

const heroesFilePath = path.join(__dirname, '../data/heroes.json');
function getHeroes() {
	return JSON.parse(fs.readFileSync(heroesFilePath, 'utf-8'));
}

const controller = {
	// (get) Root - Mostrar todos los Heroes
	index: (req, res) => {
        const heroes = getHeroes();
		res.render('heroes/heroes',{
			 heroes
		})
	},

	// (get) Detail - Detalle de un Heroe
	detail: (req, res) => {
		const id = req.params.id;
		const heroes = getHeroes();
		const heroe = heroes.find(heroe => heroe.id == id);
		res.render('heroe/heroe',{
			heroe
	   })
	},

	// (get) Create - Formulario para crear Heroe
	create: (req, res) => {
		res.render('heroe/heroeFormCreate')
	},
	
	// (post) Create -  Método para guardar la info
	store: (req, res) => {
		//Guradamos el heroe

		const image = req.file ? req.file.filename : 'default-image.png';
		const heroes = getHeroes();
		let newHeroe = {
            id: heroes[heroes.length - 1].id + 1,
			nombre: req.body.name,
			bio: req.body.bio,
			img: image,
			aparicion: req.body.date,
			casa: req.body.casa
		}
		heroes.push(newHeroe);
		fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, "  "));
		res.redirect("/heroes")
	},

	// (get) Update - Formulario para editar un Heroe
	edit: (req, res) => {
		const id = req.params.id;
		const heroes = getHeroes();
		const heroe = heroes.find(heroe => heroe.id == id);
		
		res.render('heroe/heroeFormEdit', {
			heroe
		})
	},
	// (put) Update - Método ara actualizar la info
	update: (req, res) => {	
		// Editamos el heroe que llegó por parámetro su ID
		const id = req.params.id;
		const heroes = getHeroes();
		const heroeIndex = heroes.findIndex(heroe => heroe.id == id);
		const image = req.file ? req.file.filename : heroes[heroeIndex].image;
		heroes[heroeIndex] = {
			...heroes[heroeIndex],
			nombre: req.body.name,
			bio: req.body.bio,
			img: image,
			aparicion: req.body.date,
			casa: req.body.casa
		};

		fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, " "));
		
		res.redirect("/heroes")
	},

	// (delete) Delete - Método para eliminar un Heroe
	destroy : (req, res) => {
		//Eliminamos el Heroe que llegó por parámetro su ID
		let id = req.params.id;
		const heroes = getHeroes();
		const heroeIndex = heroes.findIndex(heroe => heroe.id == id);
		heroes.splice(heroeIndex, 1);
		fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, " "));

		res.redirect("/heroes")	
	}
};

module.exports = controller;