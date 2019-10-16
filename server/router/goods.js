const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData} = require('../tools')
//爬取并修写入改图片路径所需模块
const fs = require('fs');
const path = require('path');
const request = require('request');
 

//插入"库存"属性(随机数插入)
router.post('/update',async(req,res)=>{
    let data = await find('goodslist_all',{})
    data.forEach((item,i)=>{
        var randomNum = (Math.random()*1000).toFixed(0)
        item.kucun = randomNum
        update('goodslist_all',{_id:item._id},{kucun:item.kucun })
    })
     
    // let result = await update('goodslist_all',{},{kucun:randomNum})
    res.send(formatData({data:data}))
})

//修改商品信息
router.post('/change',async(req,res)=>{
    // let data = await find('goodslist_all',{})
    let {name,price,info,currentprice,majorimg,kucun} = req.body
    let result = update('test',{name:new RegExp(name,'g')},{price:price,name:name,current_price:currentprice,goods_brief:info,kucun:kucun,default_photo:majorimg})
    // let result = await update('goodslist_all',{},{kucun:randomNum})
    res.send(formatData({data:result}))
})





//获取所有商品

router.get("/all",async(req,res)=>{
    let {collection} = req.query
    let result = await find(collection,{})
    res.send(formatData({data:result}))
})

//分页获取商品
router.get('/page',async(req,res)=>{
    let {collection,limit} = req.query
    limit = Number(limit)
    let result = await find(collection,{},{limit:limit})
    res.send(formatData({data:result}))
})

//分页获取商品
router.get('/pages',async(req,res)=>{
    let {collection,limit,skip} = req.query
    limit = Number(limit)
    skip = Number(skip)
    let result = await find(collection,{},{limit:limit,skip:skip})
    res.send(formatData({data:result}))
})


//增加商品
router.post("/addproduct",async(req,res)=>{
    let {name,price,currentprice,majorimg,kucun,info,sellcount,id,brand,category} = req.body
    let result = await create('test',[{name:name,price:price,sales_count:sellcount,currentprice:currentprice,default_photo:majorimg,kucun:kucun,info:info,id:id,brand:brand,category:category}])


    res.send(formatData({data:result}))
})



//根据关键字keyword获取商品
router.get('/keyword',async(req,res)=>{
    let {keyword} = req.query

    let result = await find('goodslist_all',{name:new RegExp(keyword,'g')})/*正则--名字包含keyword */
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
router.get('/weer',(req,res)=>{
    // let {id} = req.params
    // let result = await find('goods',{id:id})
    // res.send(formatData({data:result}))

    res.send("111")
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