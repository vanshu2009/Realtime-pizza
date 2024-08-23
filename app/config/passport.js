const LocalStrategy=require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User=require('../models/user')

function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
       const user= await User.findOne({email:email})
       if(!user){
        return done(null,false,{message:"no user with this"})
       }
       bcrypt.compare(password,user.password).then(match=>{
        if(match){
            return done(null,user,{message:"logged in succesfully"})
        }
        return done(null,false,{message:"wrong user name or password"})
       }).catch(err=>{
        return done(null,false,{message:"Something went wrong"})
       })
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}
module.exports=init