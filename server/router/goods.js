const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData} = require('../tools')




//获取所有商品

router.get("/all",async(req,res)=>{
    let result = await find('goods',{})
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

//根据keyword获取商品
// router.get('/query',(req,res)=>{


//     res.send(123)
// })



module.exports = router