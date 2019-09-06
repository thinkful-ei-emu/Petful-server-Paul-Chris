class _Node{
  constructor(value,next){
    this.value=value;
    this.next=next;
  }
}

class Queue{
  constructor(){
    this.first=null;
    this.last=null;
  }
  dequeue(){
    if(this.first===null){
      return null;
    }
    let dequeueVal=this.first.value;
    this.first=this.first.next;
    if(this.first===null){
      this.last=null;
    }
    return dequeueVal;
  }
  enqueue(value){
    if(this.first===null){
      this.first=new _Node(value,null);
      this.last=this.first;
      return;
    }
    this.last.next=new _Node(value,null);
    this.last=this.last.next;
  }
  peek(){
    if(this.first===null){
      return null;
    }
    return this.first.value;
  }
  isEmpty(){
    if(this.first===null){
      return true;
    }
    return false;
  }
  display(){
    let node=this.first;
    while(node!==null){
      process.stdout.write(JSON.stringify(node.value)+' -> ');
      node=node.next;
    }
    process.stdout.write('null\n');
  }
}

module.exports= Queue;