// we are sending information to the local systems
const env= require('./environment');
const fs = require('fs');
const path= require('path');

// calls the express app
module.exports = (app) =>
{
    app.locals.assetPath =  function(filePath)
    {
        if(env.name == 'development')
        {
            return filePath;
        }
        // this is the helpers function
        return '/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }

}