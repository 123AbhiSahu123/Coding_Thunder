const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Handlebars form submit hone par ye chalega
router.post("/send-contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();

        // ❌ res.render("contact", { alertMessage: "..." }) mat kijiye
        
        // ✅ Success ke baad kisi doosre page par ya wapas contact par redirect karein
        // Hum ek query parameter bhejenge 'success=true'
        res.redirect("/contact?success=true"); 

    } catch (err) {
        console.error(err);
        res.redirect("/contact?error=true");
    }
});

router.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        
        // Data save hone ke baad wapas contact page par bhejein ek message ke saath
        res.render("contact", { 
            alertMessage: "We will Contact soon!" 
        });
    } catch (err) {
        res.status(500).render("contact", { 
            alertMessage: "Something Error❌" 
        });
    }
});

module.exports = router;