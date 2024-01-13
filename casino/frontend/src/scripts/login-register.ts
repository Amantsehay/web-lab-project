// form validation

//FORMS
const loginForm: HTMLElement | null = document.getElementById("login-form");
const registerForm: HTMLElement | null =
  document.getElementById("register-form");

//calling functions

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = (<HTMLInputElement>document.getElementById("login-userName"))
    .value;
  const password = (<HTMLInputElement>document.getElementById("login-password"))
    .value;

  console.log("login form submitted");

  //call login function
  loginUser(username, password);
});

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

const DELETE_ACCOUNT_URL = "http://localhost:5000/auth/delete-account";

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
      setCookie(username, accessToken, 3);
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

// calling register function

registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = (<HTMLInputElement>(
    document.getElementById("register-userName")
  )).value;
  const email = (<HTMLInputElement>document.getElementById("email")).value;
  const password = (<HTMLInputElement>(
    document.getElementById("register-password")
  )).value;

  console.log(
    JSON.stringify({
      username,
      email,
      password,
    })
  );

  console.log("register form submitted");

  //call register function
  registerUser(username, email, password);
});

// Registeration

async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registeration successful:", data);
    } else {
      const error = await response.json();
      console.log("Registeration failed", error);
    }
  } catch (error) {
    console.log("Registeration failed:", error);
  }
}
