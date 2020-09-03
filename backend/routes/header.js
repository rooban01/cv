const express = require("express");
const router = express.Router();
const Header = require("../models/header");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");



// file image storage setup
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' :  'jpg',
  'application/pdf' :  'pdf'
};

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error ("Invalid mime type");

     if(isValid){
      error = null;
    }
   // cb(null, "images"); mode prod
    cb(null, "images");
  },

  filename: (req,file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-'+ Date.now() + '.' + ext);
  }
});


router.get("",(req,res,next) => {
  Header.find()
    .then(documents => {

       res.status(200).json({message: 'Contacts fetched successfully', headers: documents});
    });
 });

router.post("", checkAuth, multer({storage: storage}).single("image"),(req,res,next) => {
     const url = req.protocol + '://' + req.get("host");

      const header = new Header({
        gender: req.body.gender,
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero: req.body.numero,
        rue: req.body.rue,
        complementaire: req.body.complementaire,
        code: req.body.code,
        commune: req.body.commune,
        email: req.body.email,
        telephone: req.body.telephone,
        titre: req.body.titre,
        phrase: req.body.phrase,
       imagePath: url + "/images/" + req.file.filename,
    //   cvPath: url + "/cv/" + req.file.filename,

    });

    header.save().then(createdHeader => {

      res.status(201).json({
        message:"Post added sucessfully",
        header:{
          ...createdHeader,
          id: createdHeader._id

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
         Header.findById(req.params.id).then(header => {
           if(header){
             res.status(200).json(header);
           }else {
             res.status(404).json({ message: 'Contact not found'});
           }
         });
  });

  router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res,  next) => {
    let imagePath = req.body.imagePath;

    if(req.file){
      const url = req.protocol + '://' + req.get("host");
       imagePath = url + "/images/" + req.file.filename
    //   cvPath = url + "/cv/" + req.file.filename
       }

          const header = new Header({
            gender: req.body.gender,
            nom: req.body.nom,
            prenom: req.body.prenom,
            numero: req.body.numero,
            rue: req.body.rue,
            complementaire: req.body.complementaire,
            code: req.body.code,
            commune: req.body.commune,
            email: req.body.email,
            telephone: req.body.telephone,
            titre: req.body.titre,
            phrase: req.body.phrase,
          imagePath: url + "/images/" + req.file.filename,
     //     cvPath: url + "/cv/" + req.file.filename,
        });

    Header.updateOne({_id: req.body.id}, header).then(result => {
      if(result.nModified > 0){
        res.status(200).json({ message: "Updated successful!"})
      }else{
      res.status(401).json({message: 'Not Authorized!'});
      }
    });
  });

router.delete("/:id",  checkAuth, (req,res,next) => {

  Header.deleteOne({ _id: req.params.id }).then(result => {
    if(result.n > 0){
      res.status(200).json({ message: "Updated successful!"})
    }else{
    res.status(401).json({message: 'Not Authorized!'});
    }
  });
});

module.exports = router;
