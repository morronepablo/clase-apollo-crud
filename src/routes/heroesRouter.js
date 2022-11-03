// ************ Require's ************
const express = require("express");
const router = express.Router();
// const multer = require('multer');

// ************ Controller Require ************
const heroesController = require("../controllers/heroesController");

// ************ Configuración de multer ************
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/img')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const upload = multer({ storage });

const uploadFile = require("../middlewares/multerMiddleware");

/*** Devolver todos los heroes ***/
router.get("/", heroesController.index);

/*** Crear un heroe ***/
router.get("/detail/create", heroesController.create);
// router.post('/detail', upload.single('imgFile'), heroesController.store);
router.post("/detail", uploadFile.single("imgFile"), heroesController.store);

/*** Devolver un heroe ***/
router.get("/detail/:id", heroesController.detail);

/*** Editar un heroe ***/
router.get("/detail/edit/:id", heroesController.edit);
router.put(
  "/detail/edit/:id",
  uploadFile.single("imgFile"),
  heroesController.update
);

/*** Eliminar un heroe***/
router.delete("/detail/delete/:id", heroesController.destroy);

module.exports = router;
