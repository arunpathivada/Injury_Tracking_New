import { Router } from "express";
const router = Router();
import Patient from "../models/Patient.js";


//create a patient
router.post("/",async (req,res)=>{
    const newPatient= new Patient(req.body);
    console.log(req.body);
    try{
        const savedpatient= await newPatient.save();
        res.status(200).json(savedpatient);
    }catch(err){
        res.status(500).json(err);
    }
})

//delete a patient
router.delete("/:id", async (req, res) => {
    const patientId = req.params.id;
    console.log(patientId);
    try {
      const deletedPatient = await Patient.findByIdAndDelete(patientId);
      if (!deletedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all injuries

router.get("/",async(req,res)=>{
    try{
        const patients= await Patient.find();
        res.status(200).json(patients)
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;