import mongoose from "mongoose";

mongoose.connect('mongodb+srv://genaalva851:kg15frolo34@cluster0.ra9mc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('conexion exitosa')
).catch((error)=>console.log('tenemos un error',error)
)