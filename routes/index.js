const express=require ('express');
const router=express.Router();
// requiring the cookie parser



 const homeController = require('../controllers/home_controller');
 console.log('router loaded');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));


// requiring router of api
router.use('/api',require('./api'));
module.exports=router;