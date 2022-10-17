const express = require("express")
const router = express.Router()
const validURL = require("valid-url")
const shortID = require("shortid")
const Url = require("../models/url")

// @route   POST /api/url/shorten
// @desc    Create short URL

router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body
    const baseUrl = process.env.BASE_URL

    //Check base URL
    if (!validURL.isUri(baseUrl)){
        return res.status(401).json("Invalid base URL")
    }

    //Create URL code
    const urlCode = shortID.generate()

    //Check longURL
    if (validURL.isUri(longUrl)){
        try{
            let url = await Url.findOne({ longUrl })

            if(url){
                res.json(url)
            }else{
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()

                res.json(url)
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json("Server Error")
        }
    }else{
        res.status(400).json("Invalid long URL")
    }
})

module.exports = router