const express = require("express");
const Loisir = require("../models/loisir")

const router = express.Router();




router.get("",(req,res,next) => {
 Loisir.find()
    .then(documents => {

       res.status(200).json({message: 'loisirs fetched successfully', loisirs: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const loisir = new Loisir({
       titre: req.body.titre,
       description: req.body.description,

    });
    console.log(loisir)
    loisir.save().then(createdLoisir => {

      res.status(201).json({
        message:"Post added sucessfully",
        loisir:{
          ...createdLoisir,
          id: createdLoisir._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Loisir.findById(req.params.id).then(loisir => {
           if(loisir){
             res.status(200).json(loisir);
           }else {
             res.status(404).json({ message: 'loisir not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const loisir = new Loisir({
                    _id: req.body.id,
                    titre: req.body.titre,
                   description: req.body.description,

                  });
                 Loisir.updateOne({_id: req.body.id}, loisir).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Loisir.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "loisirs deleted "});
  });
});

module.exports = router;
