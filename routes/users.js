const  express=require("express");
const router=express.Router();
const passport=require('passport');

const usersController=require ('../controllers/users_controller');
console.log("the users router loaded");


router.get('/profile',passport.checkAuthentication, usersController.profile);

// writing router for the sign in and sign up pages
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// creating the route for sign up page
router.post('/create',usersController.create);

// creating the route for the sign in page
// router.post('/create-session',usersController.createSession);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

// creating route for the sign out page
router.get('/sign-out',usersController.destroySession);

module.exports=router;