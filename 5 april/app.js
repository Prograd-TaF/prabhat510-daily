const express=require('express')
const app=express()
const fs=require('fs')
app.listen(3000,()=>{console.log('listening');})
app.use(express.json())
const details=(req,res)=>{
    const info=`${req.method} ${new Date()}\n`
    fs.appendFileSync('./middleware.txt',info)
}
app.post('/user/new',(req,res)=>{
  const rstream1=fs.readFileSync('./user.json')
  const rstream=JSON.parse(rstream1)
  console.log(rstream);
  if(rstream.length<1){
      const username=[]
      let user=req.body.user;
      user.id=1;
      username.push(user)
      fs.writeFileSync('./user.json',JSON.stringify(username))
      res.json(username)
  }
  else{
    let user=req.body.user;
    user.id=rstream.length+1;
    rstream.push(user)
    fs.writeFileSync('./user.json',JSON.stringify(rstream))
    res.json(rstream)
  }
  
})
app.put('/user/update/:id',(req,res)=>{
    const rstream1=fs.readFileSync('./user.json')
    let rstream=JSON.parse(rstream1)
    console.log(rstream);
    let id=Number(req.params.id);
    for(let i=0;i<rstream.length;i++){
        if(rstream[i].id===id){
           rstream[i].name='nomula'
        }
    }
    console.log(rstream); 
    fs.writeFileSync('./user.json',JSON.stringify(rstream)) 
    res.json(rstream)
    
})
app.get('/user/:id',(req,res)=>{
    const rstream1=fs.readFileSync('./user.json')
    const rstream=JSON.parse(rstream1)
    let id=Number(req.params.id);
    console.log(id)
    
    res.json(rstream.find((user)=>user.id===id))
})
app.get('/user/:id/balance',(req,res)=>{
    const rstream1=fs.readFileSync('./user.json')
    const rstream=JSON.parse(rstream1)
    let id=Number(req.params.id);
    for(let i=0;i<rstream.length;i++){
        if(rstream[i].id===id){
           res.json(rstream[i].balance)
        }
    }
    
})
app.get('/user/deposit/:id/:money',(req,res,next)=>{
    const rstream1=fs.readFileSync('./user.json')
    const rstream=JSON.parse(rstream1)
    let id=Number(req.params.id);
    let money=Number(req.params.money);
    console.log('hi');
    for(let i=0;i<rstream.length;i++){
        if(rstream[i].id===id){
           rstream[i].balance+=money;
           fs.writeFileSync('./user.json',JSON.stringify(rstream))
           res.json(rstream[i])
        }
    }
    next()
    
},details)
app.put('/user/withdraw/:id/:money',(req,res,next)=>{
    const rstream1=fs.readFileSync('./user.json')
    const rstream=JSON.parse(rstream1)
    let id=Number(req.params.id);
    console.log(id);
    let money=Number(req.params.money);
    for(let i=0;i<rstream.length;i++){
        if(rstream[i].id===id){
           rstream[i].balance-=money;
           fs.writeFileSync('./user.json',JSON.stringify(rstream))
           res.json(rstream[i])
        }
    }
    next()
},details)
app.delete('/user/delete/:id',(req,res)=>{
    let id=Number(req.params.id);
    const rstream1=fs.readFileSync('./user.json')
    const rstream=JSON.parse(rstream1)
    const persons=rstream.filter((user)=>user.id!=id)
    console.log(persons);
    fs.writeFileSync('./user.json',JSON.stringify(persons))
    res.json(persons)
})
