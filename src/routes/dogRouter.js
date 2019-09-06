const express = require('express');
const dogRouter=express.Router();
const dogs = require('../data/dogs');

dogRouter
  .route('/')
  .get((req,res,next)=>{
    //returns null if top is empty
    return res.json(dogs.peek());
  })
  .delete((req,res,next)=>{
    //want to protect this with some kind of admin user/authentication or some token that only the adoption approver knows.
    dogs.dequeue();
    res.status(204).end();
  });

//unsure if we are going to use this.
dogRouter
  .route('/all')
  .get((req,res,next)=>{
    let arr=[];
    let node=dogs.first;
    while(node!==null){
      arr.push(node.value);
      node=node.next;
    }
    return res.json(arr);
  });

module.exports=dogRouter;