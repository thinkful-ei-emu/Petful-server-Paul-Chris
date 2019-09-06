const express = require('express');
const catRouter=express.Router();
const cats = require('../data/cats');

catRouter
  .route('/')
  .get((req,res,next)=>{
    //returns null if top is empty
    return res.json(cats.peek());
  })
  .delete((req,res,next)=>{
    //want to protect this with some kind of admin user/authentication or some token that only the adoption approver knows.
    cats.dequeue();
    res.status(204).end();
  });

//unsure if we are going to use this.
catRouter
  .route('/all')
  .get((req,res,next)=>{
    let arr=[];
    let node=cats.first;
    while(node!==null){
      arr.push(node.value);
      node=node.next;
    }
    return res.json(arr);
  });

module.exports=catRouter;