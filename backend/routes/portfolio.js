const express = require("express");
const Portfolio = require("../models/portfolio")

const router = express.Router();




router.get("",(req,res,next) => {
 Portfolio.find()
    .then(documents => {

       res.status(200).json({message: 'portfolios fetched successfully', portfolios: documents});
    });
 });

router.post("",(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");

    const portfolio = new Portfolio({
       nom: req.body.nom,
       description: req.body.description,
       description1: req.body.description1,
       lien: req.body.lien,
       btn: req.body.btn,


    });
    console.log(portfolio)
    portfolio.save().then(createdPortfolio => {

      res.status(201).json({
        message:"Post added sucessfully",
        portfolio:{
          ...createdPortfolio,
          id: createdPortfolio._id,

        }
      });
    });
  });

  router.get("/:id", (req, res, next) =>{
        Portfolio.findById(req.params.id).then(portfolio => {
           if(portfolio){
             res.status(200).json(portfolio);
           }else {
             res.status(404).json({ message: 'portfolio not found'});
           }
         });
  });




  router.put("/:id", (req, res,  next) => {

    const portfolio = new Portfolio({
                    _id: req.body.id,
                    nom: req.body.nom,
                    description: req.body.description,
                    description1: req.body.description1,
                    lien: req.body.lien,
                    btn: req.body.btn,


                  });
                 Portfolio.updateOne({_id: req.body.id}, portfolio).then(result => {
       console.log(result);
       res.status(200).json({message: 'Updated successful!!'});
    });
  });

router.delete("/:id",(req,res,next) => {

 Portfolio.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "portfolios deleted "});
  });
});

module.exports = router;
