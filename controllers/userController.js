const User = require('../models/userModel');
const nodeMailer = require('nodemailer');
// step 1 for sending mail npm install nodemailer and require it 
// rendering views
const loadRegister = (req, resp) => {
    try {
        resp.render('reg')
    } catch (error) {
        console.log(error.message)

    }
}
// step 2 you need to create sendverifymail fuction and pass the name,email,user_id in this function use mail methods to write a mail use
// method mail options to write a mail and use method sendmail to send mail to perticular user
//  use all methods properly by using same names for calling 
// every time for executing any function use try and catch for error handling
const sendVerifyMail = async(name,email,user_id)=>{
try {
    const transporter = nodeMailer.createTransport({
     host:'smtp.gmail.com',
     port:587 ,
     secure:false,
     requireTLS:true,
     auth:{
        user:'viveksalwan63@gmail.com',
        pass:'opxm jyvp ewmz tfha'
     }

      });

      const mailOptions = {
        from:'viveksalwan63@gmail.com',
        to :email,
        subject:'for verification mail',
        html:'<p>Hii '+name+',please click here to <a href="http://127.0.0.1:5000/verify?id='+user_id+'"> Verify </a> your mail.</p>'
      }
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log('Mail has been sent:-',info.response)
        }
      })
} catch (error) {
    console.log(error.message);
    
}
}
const insertUser = async(req,resp) => {

    try {
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            mno:req.body.mno,
            is_admin: 0
        });

        const userData = await user.save();
        if (userData) {
// if user data comes then we pass in this mail method
        sendVerifyMail(req.body.name, req.body.email, userData._id)
            resp.render('reg', { message: 'Registration has been successfull Please check your mailbox and verify your mail' });

        } else {
            resp.render('reg', { message: 'Registration failed' })
        }
    } catch (error) {
        console.log(error.message)
    }

}

const verifyMail = async(req,resp)=>{
    try {
      const updateInfo = await  User.updateOne({_id:req.query.id},{ $set:{is_verified:1}});
      console.log(updateInfo);
      resp.render('email-verified');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadRegister,
    insertUser,
    verifyMail
}
