const express=require('express')
const app=express()
app.listen(8080,(req,res)=>{
    console.log('server is running');
})
app.get('/',(req,res)=>{
   res.send('hello world');
})
//params
app.get('/hey/:id',(req,res)=>{
  console.log(req.params['id']);
  res.send(req.params['id']);
})
//query
app.get('/hey/?id=32&name=srihari',(req,res)=>{
  const id=req.query.id;
  const name=req.query.name;
  console.log(id.value);
  console.log(name.value);
  res.send(id,name);
})
