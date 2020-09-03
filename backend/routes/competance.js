const express = require("express");
const Competance = require("../models/competence")

const router = express.Router();




router.get("",(req,res,next) => {
  Competance.find()
    .then(documents => {

       res.status(200).json({message: 'competances fetched successfully', competances: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const competance = new Competance({
       sujet: req.body.sujet,
       niveau: req.body.niveau,
       commentaire: req.body.commentaire,

    });
    competance.save().then(createdCompetance => {

      res.status(201).json({
        message:"Post added sucessfully",
        competance:{
          ...createdCompetance,
          id: createdCompetance._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
         Competance.findById(req.params.id).then(competance => {
           if(competance){
             res.status(200).json(competance);
           }else {
             res.status(404).json({ message: 'competance not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const competance = new Competance({
                    _id: req.body.id,
                    sujet: req.body.sujet,
                    niveau: req.body.niveau,
                    commentaire: req.body.commentaire,

                  });
    Competance.updateOne({_id: req.body.id}, competance).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

  Competance.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "competances deleted "});
  });
});

module.exports = router;
