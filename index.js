const mongoose = require('mongoose');
let express=require('express');
path=require('path');
cors=require('cors');
bodyParser=require('body-parser');
mongoDb=require('./Database/db');
const createError = require('http-errors');

//mongoose.Promise=global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/MEAN-Project',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('database connected sucessfully');
},error=>{
    console.log('error Database:'+error);
});

const bookRoute=require('./backend/routes/project.route');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors());

app.use(express.static(path.join(__dirname,'dist/Bookstore')));
console.log(path.join(__dirname,'dist/Bookstore'))
// Api root
app.use('/api',bookRoute);

const port=process.env.port ||8000;
app.listen(port,()=>{
    console.log('Listening port on:'+port);
})
//404 error handler
app.use((req,res,next)=>{
    next(createError(404));
})
//base route
app.get('/',(req,res)=>{
    res.send('envalid endpoint');

})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
    
})

app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
})








// const productSchema = new mongoose.Schema({
//     name: String,
//     price: String,
//     description: String,

// });

// const save = async () => {
//     const Product = mongoose.model('products', productSchema);
//     let data = new Product({
//         name: "S21-FE",
//         price: 200,
//         description: 'Samsung',
//     });
//     const result = await data.save();
//     console.log(result);
// }

// const update =async  () => {
//     const Product = mongoose.model('products', productSchema);
//     let data =await  Product.updateOne(
//         { name: "max 6" },
//         {
//             $set: { price: 550,name:'max pro 6' }
//         }
//     )
//     console.log(data)
// }

// const deletee = async ()=>{
//     const Product = mongoose.model('products', productSchema);
//     let data = await Product.deleteOne({name:'max 100'})
//     console.log(data);
// }
// const find = async ()=>{
//     const Product = mongoose.model('products', productSchema);
//     let data = await Product.find({name:'max 5'})
//     console.log(data);
// }
// save();
// find();

