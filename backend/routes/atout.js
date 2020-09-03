const express = require("express");
const Atout = require("../models/atout")

const router = express.Router();




router.get("",(req,res,next) => {
 Atout.find()
    .then(documents => {

       res.status(200).json({message: 'atouts fetched successfully', atouts: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const atout = new Atout({
       titre: req.body.titre,
       description: req.body.description,

    });

    atout.save().then(createdAtout => {

      res.status(201).json({
        message:"Post added sucessfully",
        atout:{
          ...createdAtout,
          id: createdAtout._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Atout.findById(req.params.id).then(atout => {
           if(atout){
             res.status(200).json(atout);
           }else {
             res.status(404).json({ message: 'atout not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const atout = new Atout({
                    _id: req.body.id,
                    titre: req.body.titre,
                   description: req.body.description,

                  });
                 Atout.updateOne({_id: req.body.id}, atout).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Atout.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "atouts deleted "});
  });
});

module.exports = router;
