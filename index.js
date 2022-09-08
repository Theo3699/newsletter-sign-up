const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
  const firstName = req.body.inputFirstName;
  const lastName = req.body.inputLastName;
  const email = req.body.inputEmail;

  const client = require("mailchimp-marketing");

  client.setConfig({
    apiKey: "31fa073ac2e103c563f8099be16483f8-us11",
    server: "us11",
  });

  const run = async () => {
    const response = await client.lists.addListMember("9df1ce5e27", {
      email_address: email,
      status: "subscribed",
    });
  };
  run().then(() => {
    res.sendFile(__dirname + "/success.html");
  })
  .catch(err => {
    res.sendFile(__dirname + "/failure.html");
    console.log(err);
  });
});

app.listen(3000 || process.env.PORT, function(req, res){
    console.log("Server running on port 3000");
})

//31fa073ac2e103c563f8099be16483f8-us11