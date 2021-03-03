const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user.model");
const config = require("./config/config");

// Passport strategy for logging in with email and pass
passport.use(
	"local",
	new LocalStrategy(
		{
			// Username is email
			usernameField: "email",
		},
		async (email, password, done) => {
			try {
				// Find the user
				const user = await User.findOne({
					where: { email },
				});

				if (!user) {
					return done(null, false);
				}

				// Check if the password was correct
				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch) {
					return done(null, false);
				}

				// successfully logged in
				return done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

// Passport strategy for authenticating a jwt token
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
			secretOrKey: config.JWT_SECRET,
		},
		async (payload, done) => {
			try {
				// Find and check if user exist
				const user = await User.findByPk(payload.sub);

				// If user does not exist
				if (!user) {
					return done(null, false);
				}

				// success
				done(null, user);
			} catch (error) {
				// Some kind of error
				return done(error, false);
			}
		}
	)
);
