const firebaseConfig = {
    apiKey: "AIzaSyCiEsAhVvTV8gzaRHnxL7JlP9W9fFqhaU0",
    authDomain: "pphub-e0d77.firebaseapp.com",
    projectId: "pphub-e0d77",
    storageBucket: "pphub-e0d77.appspot.com",
    messagingSenderId: "486653274414",
    appId: "1:486653274414:web:6736de74c6be1baf8332bf",
    measurementId: "G-1348T315VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = analytics(app);

const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    user_name = document.getElementById('name').value

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password! Password must be at least 6 characters long.');
        return;
    }
   
    //registration
    auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
        // Declare user variable
        var user = auth.currentUser

        // Add this user to Firebase Database
        var database_ref = database.ref()

        // Create User data
        var user_data = {
            email: email,
            user_name: user_name,

        }

        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)

        // DOne
        alert('User Created!!')
        window.location.href = '/home/ubuntu2204/vscode23/pastpapershub/upload.html';
    })
    .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })
// Proceed with login
auth.signInWithEmailAndPassword(email, password)
    .then(function () {
        // Get current user
        const user = auth.currentUser;

        // Update last login time in Firebase Database
        const database_ref = database.ref();
        const user_data = {
            last_login: Date.now()
        };

        database_ref.child('users/' + user.uid).update(user_data);

        // Success
        alert('User logged in successfully!');
    })
    .catch(function (error) {
        // Firebase error handling
        const error_code = error.code;
        const error_message = error.message;

        alert(`Login failed. Error: ${error_message}`);
    });


// Validation functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field && field.length > 0;
}
function validate_password_length(password) {
    return password.length >= 6;
}}