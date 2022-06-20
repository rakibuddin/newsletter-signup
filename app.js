const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/6afe89ad30";
  const options = {
    method: "POST",
    auth: "rakib:91fff6a1ac5ab7be773512eaf2693d3f-us12"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      JSON.parse(data);
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/success", function(req, res){
  res.redirect("/");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});



// API Key: 91fff6a1ac5ab7be773512eaf2693d3f-us12
// Audience ID: 6afe89ad30
