const express = require("express");
const Langue = require("../models/langue")

const router = express.Router();




router.get("",(req,res,next) => {
 Langue.find()
    .then(documents => {

       res.status(200).json({message: 'langues fetched successfully', langues: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const langue = new Langue({
       titre: req.body.titre,
       description: req.body.description,

    });
    console.log(langue)
    langue.save().then(createdLangue => {

      res.status(201).json({
        message:"Post added sucessfully",
        langue:{
          ...createdLangue,
          id: createdLangue._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Langue.findById(req.params.id).then(langue => {
           if(langue){
             res.status(200).json(langue);
           }else {
             res.status(404).json({ message: 'langue not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const langue = new Langue({
                    _id: req.body.id,
                    titre: req.body.titre,
                   description: req.body.description,

                  });
                 Langue.updateOne({_id: req.body.id}, langue).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Langue.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "langues deleted "});
  });
});

module.exports = router;
