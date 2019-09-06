const express = require('express');
const dogRouter=express.Router();
const dogs = require('../data/dogs');
const jsonBodyParser = express.json();
const xss = require('xss');

dogRouter
  .route('/')
  .get((req,res,next)=>{
    //returns null if top is empty
    return res.json(serialize(dogs.peek()));
  })
  .delete((req,res,next)=>{
    //want to protect this with some kind of admin user/authentidogion or some token that only the adoption approver knows.
    dogs.dequeue();
    res.status(204).end();
  })
  .post(jsonBodyParser,(req,res,next)=>{
    const {name,sex,age,breed,story,imageURL,imageDescription}=req.body;
    let newdog={name,sex,age,breed,story,imageURL,imageDescription};
    let keys=Object.keys(newdog);
    for(let i=0;i< keys.length;i++){
      if(keys[i]==='imageDescription' )
        continue;
      if(newdog[keys[i]]===undefined)
        return res.status(400).json({error:`Missing '${keys[i]}' in request body`});
    }
    newdog=serialize(newdog);
    dogs.enqueue(newdog);
    res.status(201).json(newdog);

  });

//unsure if we are going to use this.
dogRouter
  .route('/all')
  .get((req,res,next)=>{
    let arr=[];
    let node=dogs.first;
    while(node!==null){
      arr.push(serialize(node.value));
      node=node.next;
    }
    return res.json(arr);
  });

function serialize(dog){
  return {
    imageURL: dog.imageURL,
    imageDescription: xss(dog.imageDescription),
    name: xss(dog.name),
    sex: xss(dog.sex),
    age: xss(dog.age),
    breed: xss(dog.breed),
    story: xss(dog.story),
  };
}

module.exports=dogRouter;