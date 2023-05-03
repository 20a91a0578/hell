const express=require('express')
const server=express();
const cors=require('cors');
const monk=require('monk');
server.use(cors());
server.use(express.json())
//To connect the database.
const db=monk('mongodb+srv://20a91a0578:mongodb1818@cluster0.matux8t.mongodb.net/Resource');
db.then(()=>{
    console.log('db connected ......');
})
server.use(cors());

//To get the data from database to the server page
server.get('/login',(req,res)=>{
const collection=db.get('Logins');   
collection.find({}).then((docs)=>{
res.send(docs);
});   
})

//To post the data into database from the server.
server.post('/signup',(req,res)=>{
const collection=db.get('Logins');
collection.insert({username:(req.body.fname+'_'+req.body.lname),password:req.body.password,email:req.body.email,roll:'user'}).then(()=>{
console.log('data inserted.........')
})
})

//to post repair request..
server.post('/repairp',(req,res)=>{
    const collection=db.get('data');
    
    collection.insert({urepair:req.body.urepairs,username:req.body.username,roll:req.body.roll,userid:req.body.userid,machineid:req.body.machineid,college:req.body.college,location:req.body.location,typeofwork:req.body.typeofwork,typeofmaterial:req.body.typeofmaterial,machinereading:req.body.machinereading,amount:req.body.amount,remarks:req.body.remarks,date:req.body.date});
    console.log('data inserted...')
})

//to get repairs data
server.get('/repairsg/:id',(req,res)=>{
    console.log(req.params.id)
    const collection=db.get('data');
    collection.find({username:req.params.id,urepair:'yes'}).then((docs)=>{
        res.send(docs);
        console.log(docs)
    })

})

//to post bundles data
server.post('/bundlesp',(req,res)=>{
const collection=db.get('data');
collection.insert({ubundles:req.body.ubundles,username:req.body.username,roll:req.body.roll,userid:req.body.userid,college:req.body.college,location:req.body.location,bundlescount:req.body.bundlescount,bundlesrecieved:req.body.bundlesrecieved,remarks:req.body.remarks})
.then((doc)=>{console.log(doc)}).catch((Err)=>{console.log(Err)})
})

//tp get bundles data
server.get('/bundlesg/:id',(req,res)=>{
    const collection=db.get('data');
    collection.find({username:req.params.id,ubundles:'yes'}).then((result)=>{
        res.send(result);
    })
})
server.post('/usersp',(req,res)=>
    {
        const collection=db.get('data')
        collection.insert({username:req.body.username,roll:req.body.roll,
            date:new Date(req.body.date),
            machineid:req.body.machineid,
            college:req.body.college,
            noofbun:req.body.noofbun,
            nopop:req.body.nopop,
            noofcop:req.body.noofcop,
            oneside:req.body.oneside,
            twoside:req.body.twoside,
            noofprin:req.body.noofprin,
            remain:req.body.remain,
        ureports:'yes'})
    })

    server.get('/querys/:id',(req,res)=>{
        console.log(req.params.id);
        const collection=db.get('data');
        collection.find({username:req.params.id,isquery:'yes'}).then((result)=>{
            res.send(result);
        })
    })
   server.post('/query',(req,res)=>{
    const collection=db.get('data');
collection.insert({username:req.body.username,query:req.body.query,isquery:'yes',status:'pending'}).then(()=>{
    console.log('query inserted.....')
})
   })
// to get the userReports Data from the Data Base
server.get('/usersg/:id',(req,res)=>
{
    const collection=db.get('data')
    collection.find({username:req.params.id,ureports:'yes'}).then((result)=>
    {
        res.send(result);
        

    })
})

server.get('/bundles',(req,res)=>{
    const collection=db.get('data');
    collection.find({roll:'user',ubundles:'yes'}).then((result)=>{
        res.send(result);
    })
})
server.get('/repairs',(req,res)=>{
    const collection=db.get('data');
    collection.find({roll:'user',urepair:'yes'}).then((result)=>{
        res.send(result);
    })
})
server.get('/user',(req,res)=>{
    const collection=db.get('data');
    collection.find({roll:'user',ureports:'yes'}).then((result)=>{
        res.send(result);
    })
})
server.get('/udash/:id',(req,res)=>{
    const collection=db.get('data');
    collection.find({username:req.params.id,ureports:'yes'}).then((result)=>{
        res.send(result)
    })
})
server.get('/udashb/:id/:from/:to',(req,res)=>{
    const collection=db.get('data');
    const startDate = new Date(req.params.from);
const endDate = new Date(req.params.to);
   
    collection.find({username:req.params.id,ureports:'yes',date:{$gte:startDate,$lte:endDate}},{sort:{date:1}}).then((result)=>{
        res.send(result);
        console.log(result)
    })
})
server.get('/dashu/:from/:to',(req,res)=>{
    const collection=db.get('data');
    const startDate = new Date(req.params.from);
const endDate = new Date(req.params.to);
   
    collection.find({ureports:'yes',date:{$gte:startDate,$lte:endDate}},{sort:{date:1}}).then((result)=>{
        res.send(result);
       
    })
})

server.get('/searchres/:id',(req,res)=>{
    const collection=db.get('data');
    collection.find({urepair:'yes',userid:req.params.id}).then((result)=>{
        res.send(result);
    })
})
server.get('/dashup',(req,res)=>{
    const collection=db.get('data');
    collection.find({ureports:'yes'}).then((result)=>{
        res.send(result);
    })
})
server.get('/queryss',(req,res)=>{
    const collection=db.get('data');
    collection.find({isquery:'yes'}).then((result)=>{
        res.send(result)
    })
})
server.get('/users',(req,res)=>{
    let collection=db.get('Logins');
    collection.find({roll:'user'}).then((result)=>{
        res.send(result);
    })
})
server.listen(8009,()=>{
    console.log('server running on port....');
})