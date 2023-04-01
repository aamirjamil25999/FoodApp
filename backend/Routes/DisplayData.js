const express = require('express')
const router = express.Router()

router.post('/foodData', (req, res) => {
    try {
        console.log(global.some_data)
        res.send([global.some_data,global.foodCatogery])
    } catch (error) {
        console.error(error.message)
        res.send("some error") 
    }

})

module.exports = router;