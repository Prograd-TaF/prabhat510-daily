const express=require('express')
const router=express.Router()
router.get('/:username',(req,res)=>{
    const {username}=req.params
    console.log(username);
    res.send(`user name is:${username}`)
})
router.post('/newuser',(req,res)=>{
    const obj=req.body.a;
    console.log(obj);
    res.json(obj)
})
router.put('/udate',(req,res)=>{
    const obj=req.body.a;
    console.log(obj);
    res.json(obj)
})
module.exports=router