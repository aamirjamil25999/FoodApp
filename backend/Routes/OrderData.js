const express = require('express')
const router = express.Router()
const Order = require('../model/Order')

router.post('/orderData',async()=>{
    let data = req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})

    // if email not existing
    let eId = await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId===null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success:true})
            })
        }catch (error) {
            console.log(error.message)
            res.send("Server error",error.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{
                    res.json({suceess: true})
                })
                
        } catch(error){
            res.send("Server error", error.message)
        }
    }
})


module.exports = router;