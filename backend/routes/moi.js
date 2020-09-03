const express = require("express");
const Moi = require("../models/moi")

const router = express.Router();




router.get("",(req,res,next) => {
  Moi.find()
    .then(documents => {

       res.status(200).json({message: 'mois fetched successfully', mois: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const moi = new Moi({
       titre1: req.body.titre1,
       titre2: req.body.titre2,
       titre3: req.body.titre3,
       titre4: req.body.titre4,
       presentation1: req.body.presentation1,
       presentation2: req.body.presentation2,
       presentation3: req.body.presentation3,
       presentation4: req.body.presentation4,
    });
    moi.save().then(createdMoi => {

      res.status(201).json({
        message:"Post added sucessfully",
        moi:{
          ...createdMoi,
          id: createdMoi._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
         Moi.findById(req.params.id).then(moi => {
           if(moi){
             res.status(200).json(moi);
           }else {
             res.status(404).json({ message: 'moi not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const moi = new Moi({
                    _id: req.body.id,
                    titre1: req.body.titre1,
                    titre2: req.body.titre2,
                    titre3: req.body.titre3,
                    titre4: req.body.titre4,
                    presentation1: req.body.presentation1,
                    presentation2: req.body.presentation2,
                    presentation3: req.body.presentation3,
                    presentation4: req.body.presentation4,

                  });
                  Moi.updateOne({_id: req.body.id}, moi).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

  Moi.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "mois deleted "});
  });
});

module.exports = router;
