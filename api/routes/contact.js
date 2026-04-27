const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Handlebars form submit hone par ye chalega
//  ✅ POST → form submit
router.post("/send-contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        
        // ✅ Success ke baad kisi doosre page par ya wapas contact par redirect karein
        // Hum ek query parameter bhejenge 'success=true'
        res.redirect("/contact?success=true"); 
    } catch (err) {
        console.error(err);
        res.redirect("/contact?error=true");
    }
});

// ✅ GET → page render
router.get("/", (req, res) => {
    res.render("contact", {
        success: req.query.success === "true",
        error: req.query.error === "true"
    });
});


module.exports = router;