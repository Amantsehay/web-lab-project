// form validation

//FORMS
const loginForm: HTMLElement | null = document.getElementById("login-form");
const registerForm: HTMLElement | null =
  document.getElementById("register-form");

//calling functions
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = (<HTMLInputElement>(
      document.getElementById("login-userName")
    )).value;
    const password = (<HTMLInputElement>(
      document.getElementById("login-password")
    )).value;

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

async function loginUser(username: string, password: string): Promise<any> {
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
      const accessToken = data.accessToken;
      setCookie("username", username, 3);
      console.log("Login successful:", data);
    } else {
      console.log("Login failed:", response);
    }
  } catch (error) {
    console.log("Login failed:", error);
  }
}

// Function to set cookie

function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieString;
}

// Function to get cookie
function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Registeration
