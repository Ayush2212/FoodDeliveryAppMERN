const express = require('express')
const router = express.Router();

router.post('/foodData', async(req,res)=>{
    try {
        
        //console.log("data is send")
        res.send([global.food_items, global.food_Category])
    } catch (error) {
        console.log(error);
        res.send( "server error")
    }
});

module.exports = router;