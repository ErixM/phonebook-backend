const mongoose = require("mongoose");
require("dotenv").config();

const contactName = process.argv[2];
const contactNumber = process.argv[3];

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 2) {
  console.log("phonebook:");
  Contact.find({}).then((result) => {
    result.forEach((contact) =>
      console.log(contact.name + ":", contact.number)
    );
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  });

  contact.save().then((result) => {
    console.log(`added ${contactName} number ${contactNumber} to phonebook`);
    mongoose.connection.close();
  });
}
