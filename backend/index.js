
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const EmployeeModel = require('./models/employee');

// const app = express();

// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.error("MongoDB connection error:", err));

// app.post('/login', (req, res) => {
//     const {email, password} = req.body;
//     EmployeeModel.findOne({email: email})
//     .then(user => {
//         if(user) {
//             if(user.password === password) {
//                 res.json("success")
//             } else {
//                 res.json("the password is incorrect")
//             }
//         } else {
//             res.json("No record existed")
//         }
//     })
// })

// app.post('/register', (req, res) => {
//     EmployeeModel.create(req.body)
//         .then(employee => res.json(employee))
//         .catch(err => res.status(500).json({ error: "Failed to register employee", message: err.message }));
// });

// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const EmployeeModel = require('./models/employee'); // Votre modèle Employee
const app = express();

app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez un autre service si nécessaire
    auth: {
        user: 'votre-email@gmail.com', // Remplacez par votre adresse email
        pass: 'votre-mot-de-passe'      // Remplacez par votre mot de passe
    }
});

// Route pour l'authentification (connexion)
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record exists");
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// Route pour l'inscription
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json({ error: "Failed to register employee", message: err.message }));
});

app.post('/password', async (req, res) => {
    const { email } = req.body;

    console.log(`Request received for reset-password with email: ${email}`);
    
    try {
        const user = await EmployeeModel.findOne({ email });
        
        if (!user) {
            console.log('No user found');
            return res.status(404).json({ message: 'No record found' });
        }
        
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: 'votre-email@gmail.com',
            to: email,
            subject: 'Réinitialisation du mot de passe',
            text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Reset email sent');
        res.json({ message: 'Un email de réinitialisation a été envoyé' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error: error.message });
    }
});


// Démarrer le serveur
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
