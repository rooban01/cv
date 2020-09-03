const express = require("express");
const router = express.Router();
const multer = require("multer");
const Cv = require("../models/cv");



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
  Cv.find()
    .then(documents => {

       res.status(200).json({message: 'Contacts fetched successfully', cvs: documents});
    });
 });

router.post("",multer({storage: storage}).single("cv"),(req,res,next) => {
     const url = req.protocol + '://' + req.get("host");

      const cv = new Cv({
        nom: req.body.nom,
       cvPath: url + "/images/" + req.file.filename,
    //   cvPath: url + "/cv/" + req.file.filename,

    });

    cv.save().then(createdCv => {

      res.status(201).json({
        message:"Post added sucessfully",
        cv:{
          ...createdCv,
          id: createdCv._id

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
         Cv.findById(req.params.id).then(cv => {
           if(cv){
             res.status(200).json(cv);
           }else {
             res.status(404).json({ message: 'Contact not found'});
           }
         });
  });




router.delete("/:id",  (req,res,next) => {

  Cv.deleteOne({ _id: req.params.id }).then(result => {
    if(result.n > 0){
      res.status(200).json({ message: "Updated successful!"})
    }else{
    res.status(401).json({message: 'Not Authorized!'});
    }
  });
});

module.exports = router;
