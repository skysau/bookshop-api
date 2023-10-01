const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    name: {type:String},
    price:  {type:String},
    description:  {type:String},

},
{
    collection:'products',
});
 module.exports=mongoose.model('productSchema',productSchema);