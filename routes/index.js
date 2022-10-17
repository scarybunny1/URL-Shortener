const express = require("express")
const router = express.Router()
const path = require("path")

const Url = require("../models/url")

// @route   GET /:code
// @desc    Redirect to long/original URL
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/../index.html'));
})

router.get("/:code", async (req, res) => {
    try{
        const url = await Url.findOne({urlCode: req.params.code})

        if(url){
            return res.redirect(url.longUrl)
        }else{
            return res.status(404).json("No URL Found")
        }
    }catch(err){
        console.error(err)
        res.status(500).json("Server Error")
    }
})

module.exports = router