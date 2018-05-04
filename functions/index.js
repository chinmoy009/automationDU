
//Saklain Zaman

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');

//****Observer Pattern*****
admin.initializeApp();

const APP_NAME = 'DU AUTOMATION';
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


exports.handleMemberRequests = functions.database.ref('/memberRequests/{dept}/{req}')
    .onWrite((snap,context) => {
      
      const original = snap.before.key;
      //var v = snap.before.ref.parent.parent.key;
      var p = snap.after.val().type;
      //console.log("v= "+v);
      //console.log("p= "+p);
      console.log("original="+original);

	if(p==="approved")
  {		
	      admin.database().ref('/members/'+original).once("value").then(function(snapshot) {
	      var mail = snapshot.val().email;
	      console.log(mail);
        var t2 = 'Your member request has been approved.';
	      sendEmail(mail,t2);
	    });
	}
  if(p==="decline")
  {   
        admin.database().ref('/members/'+original).once("value").then(function(snapshot) {
        var mail = snapshot.val().email;
        console.log(mail);
        var t2 = 'Sorry! We can not accept your member request right Now!';
        sendEmail(mail,t2);
      });
  }
  return true;
});


/*exports.cancelMemberRequest = functions.database.ref('/memberRequests/{dept}/{req}')
    .onDelete((snap,context) => {
      
      const original = snap.before.key;
      //var v = snap.before.ref.parent.parent.key;
      //var p = snap.after.val().type;
      //console.log("v= "+v);
      //console.log("p= "+p);
      console.log("original="+original);
  
        admin.database().ref('/members/'+original).once("value").then(function(snapshot) {
        var mail = snapshot.val().email;
        console.log(mail);
        var t2 = 'Sorry! We can not accept your member request right Now!' ;
        sendEmail(mail,t2);
      });
});*/

exports.bookField = functions.database.ref('/schedule/{dept}/{tour}')
    .onWrite((snap,context) => {
      
      var original = snap.before.val().bookedBy;
      //var v = snap.before.ref.parent.parent.key;
      var p = snap.after.val().type;
      //console.log("v= "+v);
      //console.log("p= "+p);
      console.log("original="+original);

  if(p==="approved"){   
        admin.database().ref('/members/'+original).once("value").then(function(snapshot) {
        var mail = snapshot.val().email;
        console.log(mail);
        var t2 = 'The booking of field is confirmed.';
        sendEmail(mail,t2);
      });
  }
  return true;
});


exports.httpfunc = functions.https.onRequest((req, res) => {
    console.log("req ="+req.query.key);
    //console.log("req2 ="+req.body.name);
    //console.log("res ="+res.query);
    var pass = req.query.key;
    if(pass === "6c1a502ebdcb1f7926b9c4bd758eff05f68e9d2d")
    {
        res.status(200).send('Done! Done! Done!');
    }
    else
    {
        res.status(403).send('Forbidden!');
    }
});


function sendEmail(email,t2) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  var t1=`Hey ! Welcome to ${APP_NAME}. `;
  mailOptions.text= t1+t2;
  //mailOptions.text = `Hey ! Welcome to ${APP_NAME}. Your request has been approved.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Mail is sent', email);
  });
}  


/*function sendEmail2(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ! Welcome to ${APP_NAME}.The booking of field is confirmed`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Your request has been approved', email);
  });
}*/    










