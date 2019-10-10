const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData,token} = require('../tools')

//获取数据并查询数据库是否存在数据---->如果用户名已经存在  返回结果 {code:0,msg:"fail,data:查询结果（json字符串）},"
router.get('/check',async(req,res)=>{
    let {username} = req.query
    let result = await find('test',{username:username})
    
    if(result.length!=0){
        res.send(formatData({code:0,data:result}))
    }
    res.send(formatData())
})
//插入用户信息 
router.post('/reg',async(req,res)=>{
    
    let {username,password} = req.body
    let data = await find('test',{username:username})
    
    // res.send(data)
    let result
    let msg
    if(data.length !=0){
        result=[]
        msg="用户名已经存在"
    }else{
        result = await create("test",[{username:username,password:password}])
        msg="插入成功"
    }
    res.send({msg:msg,data:result})
    
})
//登录接口
// router.post('/login',async(req,res)=>{

//     let {username,password} = req.body
//     let result = await find('test',{username:username})
//     result = result[0]
//     if(result.length == 0){
//         res.send('该用户名不存在')
//     }else{
//         if(result.password === password){
//             res.send(formatData({code:1,data:result}))
//         }else if(result.password != password){
//             res.send(formatData({code:0}))
//         }
//     }
//     res.send(result)


// })

//token检验登录
router.get('/login',async (req,res)=>{
    let {username,password,mdl} = req.query;

    let result = await mongo.find('test',{username,password});

    

    if(result.length>0){
        // 如用户需要免登陆操作，则生成一个token并返回给前端
        let Authorization
        if(mdl){
            Authorization = token.create(username)
        }
        res.send(formatData({data:Authorization}));
    }else{
        res.send(formatData({code:0}))
    }
})




router.patch('/',async(req,res)=>{
    let result = await update('test',{name:"zh"},{age:"200",hobby:"sing"})
    res.send(result)
})
router.delete('/',async(req,res)=>{
    let result = await remove('test',{username:"zh"})
    res.send(result)
})

module.exports = router