#### Authentication with passport

* Passport is a popular authentication middleware for Node.js applications. It is designed to be simple, flexible, and modular, allowing developers to implement authentication strategies (such as username and password, OAuth, OpenID, etc.) easily into their Node.js applications.

  It consists of two separate libraries:

  1. Passport → For session management
  2. Strategy → For authentication strategy.


###### **Authentication Strategies:**
  
* Modular components (e.g., `passport-local`, `passport-oauth`) handle authentication methods (username/password, OAuth, etc.).

  The below example is about defining the local strategy for authenticating the requested user.  The `LocalStrategy` is used to authenticate the user whenever the users tries to log in.

  ```jsx
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const User = require('./models/User'); // Replace with your User model

  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Field name for username in the request body
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user || !user.isValidPassword(password)) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  ```

###### **Session Management**

* Integrates with Express.js for persistent login sessions. Handles session serialization, deserialization, and middleware for authentication state management.

  ```jsx
  const express = require('express');
  const session = require('express-session');
  const passport = require('passport');
  const User = require('./models/User'); // Replace with your User model

  const app = express();

  // Session middleware
  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

  // Initialize Passport and session management
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize and deserialize user for session management
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Example route requiring authentication
  app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
  });

  // Middleware to check if user is authenticated
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  ```

###### **Step by Step process of Authentication and Session Management with passport in Node**

  **a. Install Necessary Libraries**

  * First, install the required libraries using npm:

    ```bash
    npm install express passport passport-local express-session
    ```

  **b. Import the Libraries**

  * Import the necessary libraries in your Node.js application:

    ```jsx
    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const User = require('./models/User'); // Replace with your User model
    ```

  **c. Initialize Express and Passport**

  * Initialize your Express application and configure session middleware and Passport:

    ```jsx
    const app = express();

    app.use(session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    ```

  **d. Define the Local Strategy**

  * Define and configure the `LocalStrategy` for username/password authentication:

    ```jsx
    passport.use(new LocalStrategy(
      { usernameField: 'email' }, // Field name for username in the request body
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user || !user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect email or password' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    ));
    ```

    - **`done(null, user)`:** Indicates successful authentication with the `user` object.
    - **`done(null, false)`:** Indicates authentication failure without specific error.
    - **`done(err)`:** Indicates an error during authentication.
    - **`done(null, false, { message: 'Custom message' })`:** Provides a custom message on authentication failure.

  **e. Use the Strategy for Authentication**

  * Set up routes to handle login requests using Passport's `authenticate` method with the 'local' strategy:

    ```jsx
    app.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true // Enable flash messages (optional)
    }));
    ```

  **f. Use Authentication for Redirection and Guarding Routes**

  * Implement route guards to protect routes that require authentication:

    ```jsx
    // Example route requiring authentication
    app.get('/dashboard', isAuthenticated, (req, res) => {
      res.render('dashboard', { user: req.user });
    });

    // Middleware to check if user is authenticated
    function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login');
    }
    ```

  **g. Add Passport Serializer and Deserializer**

  * Implement `passport.serializeUser` and `passport.deserializeUser` to manage user session state:

    ```jsx
    passport.serializeUser((user, done) => {
      done(null, user.id); // Serialize user id into the session
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id); // Deserialize user id from the session
        done(null, user);
      } catch (err) {
        done(err);
      }
    });
    ```

  **Full Code**

  * <span class="blue" style="color:blue;">Here is the full code example</span>
    ```jsx
    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const User = require('./models/User'); // Replace with your User model

    const app = express();

    // Middleware setup
    app.use(express.urlencoded({ extended: true }));

    // Session middleware
    app.use(session({
      secret: 'your_secret_key', // Replace with a long, random string (used for session encryption)
      resave: false,
      saveUninitialized: false
    }));

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Passport serialization and deserialization
    passport.serializeUser((user, done) => {
      done(null, user.id); // Serialize user id into the session
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id); // Deserialize user id from the session
        done(null, user);
      } catch (err) {
        done(err);
      }
    });

    // Passport local strategy for username/password authentication
    passport.use(new LocalStrategy(
      { usernameField: 'email' }, // Field name for username in the request body
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user || !user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect email or password' });
          }

          return done(null, user); // User authenticated, serialize user into session
        } catch (err) {
          return done(err);
        }
      }
    ));

    // Example login route
    app.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true // Optional. Enable flash messages
    }));

    // Example protected route
    app.get('/dashboard', isAuthenticated, (req, res) => {
      res.send(`Welcome to your dashboard, ${req.user.username}!`);
    });

    // Example logout route
    app.get('/logout', (req, res) => {
      req.logout(); // Clear the session and remove req.user

      // Redirect to the login page or any other page
      res.redirect('/login');
    });

    // Middleware to check if user is authenticated
    function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login');
    }

    // Example server setup
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    ```