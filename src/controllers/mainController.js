const controller = {
	home: (req, res) => {
		res.render('home/home');
	},
    about: (req, res) => {
		res.render('about/about');
	},
};

module.exports = controller;