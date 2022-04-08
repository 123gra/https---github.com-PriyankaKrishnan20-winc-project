const express=require('express');
var router=express.Router();
var ObjectId= require('mongoose').Types.ObjectId;
var {Event} =require('../models/events');
//main route
router.get('/',(req,res)=> {
    Event.find((err,docs) => {
        if(!err){res.send(docs);}
        else{console.log('error in retrieving event');}
    });

});
//if given id is present or not
router.get('/:id',(req,res)=> {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('no record with given id: ${req.params.id}');
Event.findById(req.params.id, (err,doc) => {
    if(!err) {res.send(doc);}
    else {console.log('error in retrieving  event');}

} );
    });
//for adding an event
router.post('/', (req,res)=>{
   var evt=new Event({

      category :req.body.category,
      description:req.body.description,
      name :req.body.name,
       vipPrice :req.body.vipPrice,
       gaPrice :req.body.gaPrice,
       eventdate :req.body.eventdate,
       city:req.body.city,



   });
   evt.save((err,doc)=> {
    if(!err){res.send(doc);}
    else{console.log('error in event save');}
   });
});

//updating a event
router.put('/:id',(req,res)=> {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('no record with given id: ${req.params.id}');

     var evt={
      category :req.body.category,
      description:req.body.description,
      name :req.body.name,
       vipPrice :req.body.vipPrice,
       gaPrice :req.body.gaPrice,
       eventdate :req.body.eventdate,
       city:req.body.city,


     };
     Event.findByIdAndUpdate(req.params.id, {$set:evt},{new:true},(err,doc)=> {
        if(!err){res.send(doc);}
        else{console.log('error in event update');}
       });
});

//delete event
router.delete('/:id',(req,res)=> {
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send('no record with given id: ${req.params.id}');
 Event.findByIdAndRemove(req.params.id,(err,doc)=> {
    if(!err){res.send(doc);}
    else{console.log('error in event delete');}
   });
});

module.exports=router;
