const asyncHandler= require("express-async-handler");
const Contact = require("../models/contactModel");


const getContact = asyncHandler(async(req, res) => {
    const contact=await Contact.find({user_id: req.user.id})
    res.status(200).json(contact );
});


const addContact = asyncHandler(async (req, res) => {
    const { name, email } = req.body; 
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

   const contact=await Contact.create({name, email, user_id:req.user.id})
   res.status(200).json(contact)

});


const getContactById=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json(contact)
})
 

const updateContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contanct not found")
    }
    if(contact.user_id !==req.user.id){
        res.status(404)
        throw new Error("unauthorized access to modify the data")
    }
 

  const updatedContact=await Contact.findByIdAndUpdate(req.params.id,
    req.body,{new:true , runValidators:true}
  )
    res.status(200).json(updatedContact);
});

   
const deleteContact = asyncHandler(async (req, res) => {
const contact= await Contact.findById(req.params.id)
if(!contact)
{
    res.status(404)
    throw new Error("contact not found")
}
if(contact.user_id !==req.user.id){
    res.status(404)
    throw new Error("unauthorized access to modify the data")
}

   await Contact.findByIdAndDelete(req.params.id)
   res.status(200).json(contact)
});



module.exports = { getContact, addContact,getContactById,updateContact,deleteContact };
