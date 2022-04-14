const request=require("request-promise");
const cheerio=require("cheerio");
const fs=require('fs');
const express=require('express');
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db4?retryWrites=true&w=majority';
const app=express();
app.use(express.json());
app.get('/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    var obj={};
    var obj1={};
    var obj2={};
    var obj3={};
    var obj4={};
    request("https://www.screener.in/company/"+`${id}`+"/consolidated/",(error,response,html)=>{
    if(!error && response.statusCode==200){
        const $=cheerio.load(html);
        
        //pros
        const pros=$(".pros");
        //console.log(pros);
        const prosArr=[];
        const prosList=$('.pros ul li');
        prosList.each((idx,ele)=>{
            //console.log($(ele).text());
            prosArr.push($(ele).text());

        })
        //console.log(prosArr);

        //cons
        const cons=$(".cons");
        const consList=$('.cons ul li');
        const consArr=[];
        consList.each((idx,ele)=>{
            //console.log($(ele).text());
            consArr.push($(ele).text());
        })
        obj['analysis']={'pros':prosArr,'cons':consArr};
        //console.log(consArr);
        //console.log("*************");

        //table1
        
        const profitHead=$($("#profit-loss table")[0]).find("thead tr th");
        const headArr1=[];
        profitHead.each((idx,data)=>{
            //console. log($(data).text());
            headArr1.push($(data).text());
        });
        const bodyArr1=[]
        
        $($("#profit-loss table")[0]).find("tbody tr").each((i,row)=>{
            var a=[];
            var arr1=[]
            $(row).find("td").each((idx,data)=>{
                if(idx%13===0 ){
                    a.push($(data).text());
                    }
                else{
                   arr1.push($(data).text())
                }
                 });
             for(let i=0;i<a.length;i++){
                obj1[a[i].trim()]=arr1;
                }
        });
        obj1['head']=headArr1;
        
        obj['profit_loss']=obj1;
        
        //console.log(obj);
        
        //console.log('*****');
        
        //table2
        //head
        const balanceHead=$($("#balance-sheet table")[0]).find("thead tr th");
        const headArr2=[];
        balanceHead.each((idx,data)=>{
            //console. log($(data).text());
            headArr2.push($(data).text());
        });
        //body
        $($("#balance-sheet table")[0]).find("tbody tr").each((i,row)=>{
            var a1=[];
            var arr2=[]
            $(row).find("td").each((idx,data)=>{
                if(idx%13===0 ){
                    a1.push($(data).text());
                    }
                else{
                   arr2.push($(data).text())
                }
                 });
             for(let i=0;i<a1.length;i++){
                obj2[a1[i].trim()]=arr2;
                }
        });
        obj2['head']=headArr2;
       // obj['balance_sheet']['head']=headArr2;
        obj['balance_sheet']=obj2;
        //console.log(obj);
        //table3
        //head
        const cashHead=$($("#cash-flow table")[0]).find("thead tr th");
        const headArr3=[];
        cashHead.each((idx,data)=>{
            //console. log($(data).text());
            headArr3.push($(data).text());
        });
        //console.log(headArr3);
        //body
        $($("#cash-flow table")[0]).find("tbody tr").each((i,row)=>{
            var a2=[];
            var arr3=[]
            $(row).find("td").each((idx,data)=>{
                if(idx%13===0 ){
                    a2.push($(data).text());
                    }
                else{
                   arr3.push($(data).text())
                }
                 });
             for(let i=0;i<a2.length;i++){
                obj3[a2[i].trim()]=arr3;
                }
        });
        obj3['head']=headArr3;
        //obj['cash_flow']['head']=headArr3;
        obj['cash_flow']=obj3;
       //console.log(obj);
       //table4
       //head
       const shareHead=$($("#shareholding table")[0]).find("thead tr th");
       const headArr4=[];
       cashHead.each((idx,data)=>{
           //console. log($(data).text());
           headArr4.push($(data).text());
       });
       //console.log(headArr4);
       //body
       $($("#shareholding  table")[0]).find("tbody tr").each((i,row)=>{
        var a3=[];
        var arr4=[]
        $(row).find("td").each((idx,data)=>{
            if(idx%13===0 ){
                a3.push($(data).text());
                }
            else{
               arr4.push($(data).text())
            }
             });
         for(let i=0;i<a3.length;i++){
            obj4[a3[i].trim()]=arr4;
            }
    });
    obj4['head']=headArr4;
    //obj['shareholding']['head']=headArr4;
    obj['shareholding']=obj4;
    console.log(obj);
    
        console.log('*****');
        fs.writeFileSync('./companydata.json',JSON.stringify(obj))
    }
    
})
const client=await mongoClient.connect(dburl);
    try{
        let db=await client.db('db4');
        let user=await db.collection('user').insertOne(obj);
        //fs.writeFileSync('./companydata.json',JSON.stringify(obj))
        res.json({
            message:'data sent',
            obj
        })
    }
    catch(err){
      console.log(err);
    }
    finally{
        client.close()
    }
    
});
app.listen(3000,()=>{console.log("listening")})
