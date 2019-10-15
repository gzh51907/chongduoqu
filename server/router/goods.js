const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData} = require('../tools')
//爬取并修写入改图片路径所需模块
const fs = require('fs');
const path = require('path');
const request = require('request');




//获取所有商品

router.get("/all",async(req,res)=>{
    let {collection} = req.query
    let result = await find(collection,{})
    res.send(formatData({data:result}))
})
//增加商品
router.post("/",async(req,res)=>{
    let {name,price,sellCount} = req.body
    let result = await create('goods',[{name:name,price:price,sellCount:sellCount}])


    res.send(formatData({data:result}))
})

//根据关键字keyword获取商品
router.get('/keyword',async(req,res)=>{
    let {keyword} = req.query

    let result = await find('goods',{name:new RegExp(keyword,'g')})/*正则--名字包含keyword */
    res.send(formatData({data:result}))
})

//根据价格范围price获取商品 -- 一般用于价格筛选
router.get('/price',async(req,res)=>{
    let {min,max} = req.query
 
    let result = await find('goods',{price:{$gt:min,$lt:max}})
    res.send(formatData({data:result}))
})

//根据条件对商品进行排序
router.get('/sort',async(req,res)=>{
    let {sort} = req.query
    let result = await find("goods",{},{sort:sort,asc:1})
    res.send(result)
})


//根据id获取单个商品
router.get('/:id',async(req,res)=>{
    let {id} = req.params
    let result = await find('goods',{id:id})
    res.send(formatData({data:result}))
})

//获取商品并且把图片经过处理
router.get("/all/img",async(req,res)=>{
    let result = await find('test',{})
    result.forEach((item,i)=>{
    
    //提取图片文件名
    let filename =  path.basename(item.default_photo.thumb);

    // 将图片写入本地
    request(item.default_photo.thumb).pipe(fs.createWriteStream('../webapp/src/assets/img/'+ filename));

    //改变数据区图片路径
    item.default_photo.thumb = 'img/'+filename;
    

    })
    res.send(result)
})

//根据keyword获取商品
// router.get('/query',(req,res)=>{


//     res.send(123)
// })



module.exports = router