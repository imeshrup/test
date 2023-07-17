const router = require("express").Router();
let Doctor = require("../models/Doctor");



router.route("/").post((req, res)=>{

    const name = req.body.name;
    const contact = Number(req.body.contact);

    const newDoctor = new Doctor({
        name,
        contact
    })

    newDoctor.save().then(()=>{
        res.json("Doctor Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req, res)=>{

    Doctor.find().then((doctors)=>{
        res.json(doctors) 
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/update/:id").put(async(req, res)=>{
    let userId = req.params.id;
    const {name, contact} = req.body;

    const updateDoctor = {
        name,
        contact
    }

    const update = await Doctor.findByIdAndUpdate(userId, updateDoctor).then(() => {
        res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })    
})



router.route("/delete/:id").delete(async (req, res)=>{
    let userId = req.param.id;

    await Doctor.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User Deleted"})
    }).catch((errr) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})


module.exports = router;