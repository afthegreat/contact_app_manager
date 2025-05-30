const express = require("express");
const router = express.Router();  
const { getContact, addContact
    ,getContactById ,
    updateContact, 
    deleteContact 
      } = require("../controllers/contactController");  
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route('/').get(getContact).post(addContact);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;
