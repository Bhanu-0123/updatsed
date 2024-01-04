const firebaseConfig = {
  apiKey: "AIzaSyBrLXKYzPwOzH30NIf71kK4NLHPK8g8l8E",
  authDomain: "create-26237.firebaseapp.com",
  databaseURL: "https://create-26237-default-rtdb.firebaseio.com",
  projectId: "create-26237",
  storageBucket: "create-26237.appspot.com",
  messagingSenderId: "872545373808",
  appId: "1:872545373808:web:f1823d3d3dcfab537f2eb5"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
