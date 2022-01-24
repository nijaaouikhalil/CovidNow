const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/registerModel')

function initialize(passport){
    
    passport.use(new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
        User.findOne({ email: username }, async (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: 'Incorrect information.' });
            
            try{
                if (await bcrypt.compare(password, user.password)){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Incorrect information.'})
                }
            }catch(e){
                return done(e)
            }
        });
    }));
  
    passport.serializeUser((user, done) =>  done(null, user.id) )
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = initialize