const express = require("express");
const Experience = require("../models/experience")

const router = express.Router();




router.get("",(req,res,next) => {
 Experience.find()
    .then(documents => {

       res.status(200).json({message: 'experiences fetched successfully', experiences: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const experience = new Experience({
       date1: req.body.date1,
       societe: req.body.societe,
       poste: req.body.poste,
       description: req.body.description,

    });
    console.log(experience)
    experience.save().then(createdExperience => {

      res.status(201).json({
        message:"Post added sucessfully",
        experience:{
          ...createdExperience,
          id: createdExperience._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Experience.findById(req.params.id).then(experience => {
           if(experience){
             res.status(200).json(experience);
           }else {
             res.status(404).json({ message: 'experience not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const experience = new Experience({
                    _id: req.body.id,
                    date1: req.body.date1,
                    societe: req.body.societe,
                    poste: req.body.poste,
                    description: req.body.description,

                  });
                 Experience.updateOne({_id: req.body.id}, experience).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Experience.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "experiences deleted "});
  });
});

module.exports = router;
