const Contact = require("../models/contact");


exports.getContacts = (req,res,next) => {
                  Contact.find()
                    .then(documents => {

                      res.status(200).json({message: 'Contacts fetched successfully', contacts: documents
                      });

                    })
                    .catch(error => {
                      res.status(500).json({
                        message: "Echec de la récuperation du message. Veuillez réessayer."  //a voir s!!!!!!!!!!!!
                      });
                    });

                  }
exports.createContact = (req,res,next) => {



                        // const url = req.protocol + '://' + req.get("host");
                        const contact = new Contact({
                                      gender: req.body.gender,
                                      nom: req.body.nom,
                                      prenom1: req.body.prenom1,
                                      poste: req.body.poste,
                                      societe: req.body.societe,
                                      addresse: req.body.addresse,
                                      telephone: req.body.telephone,
                                      email: req.body.email,
                                      commentaire: req.body.commentaire,
                                      rdv: req.body.rdv,
                                      creator: req.userData.userId


                      //   imagePath: url + "/images/" + req.file.filename,
                        //   imagePath: req.file ? (url + "/images/" +  req.file.filename) : ''

                      });

                      contact.save().then(createdContact => {

                        res.status(201).json({
                          message:"Post added sucessfully",
                          contact:{
                            ...createdContact,
                            id: createdContact._id

                          }
                        }).res.send('Votre message estenvoyé !! merci pour votre visite')
                      })
                      .catch(error => {
                            res.status(500).json({
                              message: "L'envoi du message a échoué. Veuillez réessayer."
                            });
                      });
                      }


exports.getContact =  (req, res, next) =>{
                        Contact.findById(req.params.id).then(contact => {
                          if(contact){
                            res.status(200).json(contact);
                          }else {
                            res.status(404).json({ message: 'Pas de message'});
                          }
                        })
                        .catch(error => {
                        res.status(500).json({
                          message: "Echec de la récuperation du message. Veuillez réessayer."
                        });
                      });
                      }



  exports.updateContact = (req, res,  next) => {
                                        let imagePath = req.body.imagePath;

                                        if(req.file){
                                          const url = req.protocol + '://' + req.get("host");
                                          imagePath = url + "/images/" + req.file.filename
                                        //  imagePath = req.file ? (url + "/images/" +  req.file.filename) : ''
                                      }

                                        const contact = new Contact({
                                                        _id: req.body.id,
                                                        gender: req.body.gender,
                                                        nom: req.body.nom,
                                                        prenom1: req.body.prenom1,
                                                        poste: req.body.poste,
                                                        societe: req.body.societe,
                                                        addresse: req.body.addresse,
                                                        telephone: req.body.telephone,
                                                        email: req.body.email,
                                                        commentaire: req.body.commentaire,
                                                        rdv: req.body.rdv,
                                                      // imagePath: imagePath,

                                                        creator: req.userData.userId
                                                      });
                                        Contact.updateOne({_id: req.body.id, creator: req.userData.userId}, contact).then(result => {
                                          if(result.n > 0){
                                            res.status(200).json({ message: "Updated successful!"})
                                          }else{
                                          res.status(401).json({message: 'Non authorisé'});
                                          }
                                        })
                                          .catch(erro => {
                                            res.status(500).json({
                                            message: "Mise à jour du message a échoué. Veuillez réessayer. "
                                          });
                                        });
                                      }



  exports.deleteContact = (req,res,next) => {

                    Contact.deleteOne({ _id: req.params.id , creator: req.userData.userId }).then(result => {
                      if(result.n > 0){
                        res.status(200).json({ message: "Updated successful!"})
                      }else{
                      res.status(401).json({message: 'Not Authorized!'});
                      }
                    })
                    .catch(error => {
                      res.status(500).json({
                        message: "Le message n'a pas pu être supprimé. Veuillez réessayer."
                      });
                    });
                  }



