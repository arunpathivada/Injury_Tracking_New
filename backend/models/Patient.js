import mongoose from "mongoose";
const patientSchema=new mongoose.Schema({
    patientName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    injurySpot:{
        type:String,
        required:true
    },
    reasonDesc:{
        type:String
    },
    dateOfJoin:{
        type:String,
        required:true
    },
    x:{
        type:Number
    },
    y:{
        type:Number
    }
},{timestamps:true})
const Patient= mongoose.model("Patient",patientSchema)
export default Patient;