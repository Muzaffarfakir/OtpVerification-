///require all modules or package s
let express = require("express");
let app = express();
let oTpGenartor=require("otp-generator");
let nodemailer = require("nodemailer");
let cors = require("cors");
let bodyParser = require("body-parser");
////cors and midlewraes
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Arrays to stores oTp and emails 
let otpstore = {};
/// Genrate Random Numbers 
let o=oTpGenartor.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
//Port Declartion 
let port = 8080;
///// nodemailer authtication
let transpo = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fakirmuzaffar771@gmail.com",
        pass: "pqio grou nvrk zhov"
    }
});

///route to take email  and send otp
app.post("/otp", (req, res) => {
    let { email, otp } = req.body;
    otpstore[email] = {
        otp: o,
        time: Date.now() + 600000
    }
    let opt = {
        from: "fakirmuzaffar771@gmail.com",
        to: "nisarfakir01@gmail.com",
        subject: "test",
        text: `Dear User The OTP is ${o}`,

    }
    transpo.sendMail(opt, (data, er) => {
        if (er) {
            throw er;

        }
        else {
            console.log("sent successfully", data);
        }
    })
})
/// route for otp verfication 
app.post("/verify", (req, res) => {
    let { email, otp } = req.body;

    if (otpstore.hasOwnProperty(email)) {
         let storedOtp=otpstore[email].otp;
         let expreiTime=otpstore[email].time
      //  let { storedOtp, expreiTime } = otpstore[email];
        console.log(storedOtp, expreiTime)
        if (storedOtp == otp ) {
            res.json({ mess: "Verifiy" })


        }
        else {
            res.json({
                mess: "Invalid !"
            })
        }


    }
    else {
        res.json({ mes: "Email Not Found" })
    }



})

///listeninng on port 8080
app.listen(port);
