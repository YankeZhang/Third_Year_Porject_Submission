const express = require('express');
const router = express.Router();
const axios = require('axios');
const postsAPI = 'https://jsonplaceholder.typicode.com';


router.get('/', (req, res)=>{
    axios.get(postsAPI+'/posts').then(post=>{
        res.status(200).json(post.data);
    }).catch(error =>{
        res.status(500).send(error);
    })
});

module.exports = router;