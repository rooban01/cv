const express = require("express");
const Formation = require("../models/formation")

const router = express.Router();




router.get("",(req,res,next) => {
 Formation.find()
    .then(documents => {

       res.status(200).json({message: 'formations fetched successfully', formations: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const formation = new Formation({
       date1: req.body.date1,
       diplome: req.body.diplome,
       lieu: req.body.lieu,
       description: req.body.description,

    });
    console.log(formation)
    formation.save().then(createdFormation => {

      res.status(201).json({
        message:"Post added sucessfully",
        formation:{
          ...createdFormation,
          id: createdFormation._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Formation.findById(req.params.id).then(formation => {
           if(formation){
             res.status(200).json(formation);
           }else {
             res.status(404).json({ message: 'formation not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const formation = new Formation({
                    _id: req.body.id,
                    date1: req.body.date1,
                    diplome: req.body.diplome,
                    lieu: req.body.lieu,
                    description: req.body.description,

                  });
                 Formation.updateOne({_id: req.body.id}, formation).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Formation.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "formations deleted "});
  });
});

module.exports = router;
