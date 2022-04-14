const express=require('express')
const user=require('./routes/users.js')
const app=express()
const fs=require('fs')
app.use(express.json())
const arr=[]
app.post('/newuser',(req,res)=>{
    const body=req.body.user
    //const data=JSON.parse(body)
    console.log(body);
    body.id=arr.length+1
    arr.push(body)
    res.json(arr)
})
app.get('/get/latest',(req,res)=>{
    const size=arr.length
    console.log(arr[size-1]);
    res.json(arr[size-1])
})
app.delete('/delete/latest',(req,res)=>{
    const size=arr.length
    console.log(arr[size-1]);
    arr.pop()
    res.json(arr)
})
app.put('/update/:id',(req,res)=>{
    console.log('hi');
    const {id}=req.params
    console.log(id);
    console.log(arr);
    for(let i=0;i<arr.length;i++){
        if(arr[i].id===Number(id)){
            arr[i].name='nomula'
            console.log(arr);
            res.json(arr)
        }
            
        
    }
    
    
})
app.all('/*',(req,res)=>{
    res.status(404)
    res.send('url not found')
})

//app.post('/new')
app.listen(3000,()=>{console.log('listening');})