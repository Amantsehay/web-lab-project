// Bckend API endpoints

const API_URL = "http://localhost:5000/";
const LOGIN_URL = "http://localhost:5000/auth/login";
const REGISTER_URL = "http://localhost:5000/auth/signup";
const DELETE_ACCOUNT_URL = "http://localhost:5000/auth/delete-account";
const BLOCK_USER_URL = "http://localhost:5000/auth/block";
const UNBLOCK_USER_URL = "http://localhost:5000/auth/unblock";
// form validation validation for registration

function validateRegisterForm() {
  const userName = (<HTMLInputElement>(
    document.getElementById("register-userName")
  )).value.trim();
  const email = (<HTMLInputElement>(
    document.getElementById("email")
  )).value.trim();
  const password = (<HTMLInputElement>(
    document.getElementById("register-password")
  )).value.trim();
  const confirmPassword = (<HTMLInputElement>(
    document.getElementById("confirmPassword")
  )).value.trim();

  resetRegistrationErrorMessages();

  if (!userName) {
    displayRegistrationErrorMessage("User Name is required.");
    return;
  }

  if (/\d/.test(userName)) {
    displayRegistrationErrorMessage("User Name should not contain numbers.");
    return;
  }

  if (userName.length < 3) {
    displayRegistrationErrorMessage(
      "User Name must be at least 3 characters long."
    );
    return;
  }

  if (!email) {
    displayRegistrationErrorMessage("Email is required.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    displayRegistrationErrorMessage("Invalid email format.");
    return;
  }

  if (!password) {
    displayRegistrationErrorMessage("Password is required.");
    return;
  }

  if (password.length < 8) {
    displayRegistrationErrorMessage(
      "Password must be at least 8 characters long."
    );
    return;
  }

  if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    displayRegistrationErrorMessage(
      "Password must contain at least one number and one symbol."
    );
    return;
  }

  if (password !== confirmPassword) {
    displayRegistrationErrorMessage(
      "Passwords do not match. Please try again."
    );
    return;
  }

  // displayRegistrationSuccessMessage("Registration successful!");
}

function resetRegistrationErrorMessages() {
  var errorMessagesElement = document.getElementById("errorMessages");
  errorMessagesElement.textContent = "";
  errorMessagesElement.style.color = "";
}

function displayRegistrationErrorMessage(message: string) {
  var errorMessagesElement = document.getElementById("errorMessages");
  errorMessagesElement.textContent = message;
  errorMessagesElement.style.color = "red";
}

// function displayRegistrationSuccessMessage(message: string) {
//   var errorMessagesElement = document.getElementById("errorMessages");
//   errorMessagesElement.textContent = message;
//   errorMessagesElement.style.color = "green";
// }

function validateLoginForm() {
  const userName = (<HTMLInputElement>(
    document.getElementById("login-userName")
  )).value.trim();
  const password = (<HTMLInputElement>(
    document.getElementById("login-password")
  )).value.trim();

  resetErrorMessages();

  if (!userName) {
    displayErrorMessage("User Name is required.");
    return;
  }

  if (/\d/.test(userName)) {
    displayErrorMessage("User Name should not contain numbers.");
    return;
  }

  if (userName.length < 3) {
    displayErrorMessage("User Name must be at least 3 characters long.");
    return;
  }
  if (!password) {
    displayErrorMessage("Password is required.");
    return;
  }
  resetErrorMessages();

  // displaySuccessMessage("Login successful!");
}

function resetErrorMessages() {
  var errorMessagesElement = document.getElementById("eerrorMessages");
  errorMessagesElement.textContent = "";
  errorMessagesElement.style.color = "";
}

function displayErrorMessage(message: string) {
  var errorMessagesElement = document.getElementById("eerrorMessages");
  errorMessagesElement.textContent = message;
  errorMessagesElement.style.color = "red";
}

// function displaySuccessMessage(message: string) {
//   var errorMessagesElement = document.getElementById("eerrorMessages");
//   errorMessagesElement.textContent = message;
//   errorMessagesElement.style.color = "green";
// }

//FORMS
const loginForm: HTMLElement | null = document.getElementById("login-form");
const registerForm: HTMLElement | null =
  document.getElementById("register-form");

//calling functions

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  validateLoginForm();
  const username = (<HTMLInputElement>document.getElementById("login-userName"))
    .value;
  const password = (<HTMLInputElement>document.getElementById("login-password"))
    .value;

  console.log("login form submitted");

  //call login function
  loginUser(username, password);
});

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
      const accessToken = await data.accessToken;
      console.log("The access token for this user is:", accessToken);
      setCookie(username, accessToken, 3);
      console.log("Cookie set");
      console.log("and the access token from the  cookie is :");
      console.log(getCookie(username));
      console.log("Login successful:", data);
      (<HTMLInputElement>document.getElementById("login-userName")).value = "";
      (<HTMLInputElement>document.getElementById("login-password")).value = "";
    } else {
      console.log("Login failed:", response.json());
      alert("Username or password is incorrect");
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
  validateRegisterForm();
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
      (<HTMLInputElement>document.getElementById("register-userName")).value =
        "";
      (<HTMLInputElement>document.getElementById("email")).value = "";
      (<HTMLInputElement>document.getElementById("register-password")).value =
        "";
      (<HTMLInputElement>document.getElementById("confirmPassword")).value = "";
    } else {
      const error = await response.json();
      console.log("Registeration failed", error);
    }
  } catch (error) {
    console.log("Registeration failed:", error);
  }
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
const deleteAccount = async () => {
  // e.preventDefault();
  console.log(document.cookie);
  const accessToken = getCookie("accessToken");
  console.log(accessToken);
  const confirmation = confirm("Are you sure you want to delete your account?");
  if (!confirmation) {
    return;
  }
  try {
    const response = await fetch(DELETE_ACCOUNT_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("the response is ok");
    if (response.ok) {
      const result = await response.json();
      deleteCookie(accessToken);
      alert(result.message);
      window.location.href = "../index.html";
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.log("Deletion Failed failed:", error);
  }
};
async function blockUser(e) {
  console.log("this method is being called");
  console.log(e);
  e.preventDefault();
  const usernameToBlock = <HTMLInputElement>document.getElementById("username");
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found. Please log in.");
      alert("Access token not found. Please log in.");
      return;
    }
    const response = await fetch(BLOCK_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username: usernameToBlock }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.log("Block user failed:", response);
    }
  } catch (error) {
    console.error("Block user failed:", error);
  }
}
