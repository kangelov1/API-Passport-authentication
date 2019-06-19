const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config');
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

//Local strategy
passport.use(new LocalStrategy({
    usernameField:'email'
},async(email,password,done)=>{
    try{
         //find user by email
    const user = await User.findOne({email})
    
    if(!user){return done(null,false)}
    //check if password is correct
    const isMatch = await user.isValidPassword(password)
    
    if(!isMatch){return done(null,false)}
    //return user
    return done(null,user)
    }
    catch(err){return done(err,false)}
}))