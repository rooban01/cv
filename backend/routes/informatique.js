const express = require("express");
const Informatique = require("../models/informatique")

const router = express.Router();




router.get("",(req,res,next) => {
 Informatique.find()
    .then(documents => {

       res.status(200).json({message: 'informatiques fetched successfully', informatiques: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const informatique = new Informatique({
       titre: req.body.titre,
       description: req.body.description,

    });

    informatique.save().then(createdInformatique => {

      res.status(201).json({
        message:"Post added sucessfully",
        informatique:{
          ...createdInformatique,
          id: createdInformatique._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Informatique.findById(req.params.id).then(informatique => {
           if(informatique){
             res.status(200).json(informatique);
           }else {
             res.status(404).json({ message: 'informatique not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const informatique = new Informatique({
                    _id: req.body.id,
                    titre: req.body.titre,
                   description: req.body.description,

                  });
                 Informatique.updateOne({_id: req.body.id}, informatique).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Informatique.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "informatiques deleted "});
  });
});

module.exports = router;
