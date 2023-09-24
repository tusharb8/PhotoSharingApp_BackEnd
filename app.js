const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userData = require("./modals/user-modal");
const userImageData = require("./modals/post-img-data-modal");
const userController = require("./user")
const imageDataURI = require("image-data-uri");
const cors = require("cors");
const fs = require("fs");
require('dotenv').config()

// setup view engine
app.set("view engine", "ejs");
// mongoose.connect("mongodb://localhost/assignment_4").then(() => {
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("connected to mongoDB")
}).then(() => {
    userImageData.find().then((Imagesfound) => {
        if (Imagesfound.length) {
            Imagesfound.forEach(userImage => {
                if (fs.existsSync(`${__dirname}/Post_Images/${userImage.name}`)) {
                    // Do something
                }
                else {
                    imageDataURI.outputFile(userImage.imagedata, `${__dirname}/Post_Images/${userImage.name}`).then((result) => {
                        console.log(result)
                    }).catch((err) => { console.log(result) });
                }
            });
        }
    })
}).then(() => {
    const port = process.env.PORT || 3001;
    //create and start express server
    app.listen(port, (err) => {
        if (!err) {
            console.log(`server is running`);
        }
    })
}).catch((err) => {
    console.log(err);
});



//Body parser to support JSON and form encoding
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(express.static("./Post_Images/"));




app.get("/", (req, res) => {
    userData.find().then((userInfo) => {
        // console.log(userInfo[0]._id)
        res.render("landingPage", { user: userInfo });
    })
});
// app.get("/form", (req, res) => {

//     res.render("form",{message: isExist});
// })

//middleware
app.use("/user", userController);

