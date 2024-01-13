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



const  DELETE_ACCOUNT_URL =   "http://localhost:5000/auth/delete-account"

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
      setCookie("username", accessToken, 3);
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

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}





const deleteAccount = async (e: Event) => {
  e.preventDefault();
  const accessToken = getCookie("username");
  const confirmation = confirm("Are you sure you want to delete your account?");
  if (!confirmation) {
      return;
  }
  try {
      const response = await fetch('/delete-account', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Include your access token here
          },
      });

      if (response.ok) {
          const result = await response.json();
          deleteCookie(accessToken);
          alert(result.message);
          window.location.href = '../index.html';
      } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
  }
}

// Registeration
