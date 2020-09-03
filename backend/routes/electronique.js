const express = require("express");
const Electronique = require("../models/electronique")

const router = express.Router();




router.get("",(req,res,next) => {
 Electronique.find()
    .then(documents => {

       res.status(200).json({message: 'electroniques fetched successfully', electroniques: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const electronique = new Electronique({
       titre: req.body.titre,
       description: req.body.description,

    });

    electronique.save().then(createdElectronique => {

      res.status(201).json({
        message:"Post added sucessfully",
        electronique:{
          ...createdElectronique,
          id: createdElectronique._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Electronique.findById(req.params.id).then(electronique => {
           if(electronique){
             res.status(200).json(electronique);
           }else {
             res.status(404).json({ message: 'electronique not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const electronique = new Electronique({
                    _id: req.body.id,
                    titre: req.body.titre,
                   description: req.body.description,

                  });
                 Electronique.updateOne({_id: req.body.id}, electronique).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Electronique.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "electroniques deleted "});
  });
});

module.exports = router;
