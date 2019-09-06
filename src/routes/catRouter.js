const express = require('express');
const catRouter=express.Router();
const jsonBodyParser = express.json();
const xss = require('xss');
const cats = require('../data/cats');

catRouter
  .route('/')
  .get((req,res,next)=>{
    //returns null if top is empty
    return res.json(serialize(cats.peek()));
  })
  .delete((req,res,next)=>{
    //want to protect this with some kind of admin user/authentication or some token that only the adoption approver knows.
    cats.dequeue();
    res.status(204).end();
  })
  .post(jsonBodyParser,(req,res,next)=>{
    const {name,sex,age,breed,story,imageURL,imageDescription}=req.body;
    let newCat={name,sex,age,breed,story,imageURL,imageDescription};
    let keys=Object.keys(newCat);
    for(let i=0;i< keys.length;i++){
      if(keys[i]==='imageDescription' )
        continue;
      if(newCat[keys[i]]===undefined)
        return res.status(400).json({error:`Missing '${keys[i]}' in request body`});
    }
    newCat=serialize(newCat);
    cats.enqueue(newCat);
    res.status(201).json(newCat);

  });

//unsure if we are going to use this.
catRouter
  .route('/all')
  .get((req,res,next)=>{
    let arr=[];
    let node=cats.first;
    while(node!==null){
      arr.push(serialize(node.value));
      node=node.next;
    }
    return res.json(arr);
  });


function serialize(cat){
  return {
    imageURL: cat.imageURL,
    imageDescription: xss(cat.imageDescription),
    name: xss(cat.name),
    sex: xss(cat.sex),
    age: xss(cat.age),
    breed: xss(cat.breed),
    story: xss(cat.story),
  };
}

module.exports=catRouter;