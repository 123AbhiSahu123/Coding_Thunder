const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const homeData = require('../data/home');

// GET Checkout Page
router.get('/checkout/:id', (req, res) => {
    const courseId = req.params.id;

    const rawPrice = req.query.price || "0";
    const basePrice = parseInt(rawPrice.replace(/,/g, '')) || 0;

    const gst = Math.floor(basePrice * 0.18); // 18% GST
    const total = basePrice + gst;

    const course = homeData.courses.find(c => c.id === courseId);
    const originalTitle = course ? course.title : "Course";

    // 8 characters ka random password generate karna
    // const randomPass = crypto.randomBytes(4).toString('hex').toUpperCase();
    const randomPass = require('crypto').randomBytes(4).toString('hex').toUpperCase();


    // Render hamesha router.get ke ANDAR hona chahiye
    res.render('checkout', {
        originalTitle,
        basePrice,
        gst, // Sirf GST amount bhej rahe hain
        total,
        randomPass,
        isCheckout: true
    });
});

module.exports = router;