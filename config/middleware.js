module.exports.setFlash=function(req,res,next)
{
res.locals.flash={
    'success':req.flash('success'),
    'error':req.flash('error'),
}
next();
// passes to the next middleware
}


// we are using connect flash because it ia a session cookie and transfers it