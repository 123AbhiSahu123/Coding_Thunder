

const crypto = require('crypto');

exports.getCheckout = (req, res) => {
    const courseId = req.params.id;
    const price = req.query.price;
    // 8 characters ka random password
    const randomPass = crypto.randomBytes(4).toString('hex').toUpperCase();

    res.render('checkout', { 
        courseId, 
        price, 
        randomPass, 
        isCheckout: true 
    });
};

// Signup handle karne ke liye
exports.postSignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Data save karein MongoDB mein
        // Note: Real project mein password ko bcrypt se hash zaroor karein
        const newUser = new User({ email, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.send("Error: " + err.message);
    }
};