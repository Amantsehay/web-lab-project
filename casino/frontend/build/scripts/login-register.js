// form validation
//FORMS
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
//calling functions
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = (document.getElementById("login-userName")).value;
        const password = (document.getElementById("login-password")).value;
        console.log("login form submitted");
        //call login function
        loginUser(username, password);
    });
}
// if (registerForm){
//     registerForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       registerUser(username, password);
//     });
// }
// Bckend API endpoints
const API_URL = "http://localhost:5000/";
const LOGIN_URL = "http://localhost:5000/auth/login";
const REGISTER_URL = "http://localhost:5000/auth/signup";
// Login
async function loginUser(username, password) {
    try {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
            // Save token to local storage
        }
        else {
            console.log("Login failed:", response);
        }
    }
    catch (error) {
        console.log("Login failed:", error);
    }
}
// Registeration
