// Bckend API endpoints

const API_URL = "http://localhost:5000/auth/";

const USER_API = 'http://localhost:5000/auth/user';
// const sdfsdf= "http://localhost:5000/auth/index.html"

const USER_API_URL_AMOUNT = 'http://localhost:5000/auth/user-amount';
const LOGIN_URL = "http://localhost:5000/auth/login";
const REGISTER_URL = "http://localhost:5000/auth/signup";
const DELETE_ACCOUNT_URL = "http://localhost:5000/auth/delete-account";
const BLOCK_USER_URL = "http://localhost:5000/auth/block";
const UNBLOCK_USER_URL = "http://localhost:5000/auth/unblock";

const UPDATE_PASSWORD_URL = "http://localhost:5000/auth/update-password";
const UPDATE_USERNAME_URL = "http://localhost:5000/auth/update-username";
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
      // setCookie(username, accessToken, 3);
      setCookie("access-token", accessToken, 3);

      
      // console.log("Cookie set");
      // console.log("and the access token from the  cookie is :");
      // console.log(getCookie(username));
      // console.log("Login successful:", data);
      // (<HTMLInputElement>document.getElementById("login-userName")).value = "";
      // (<HTMLInputElement>document.getElementById("login-password")).value = "";


      const currentBalanceDiv: HTMLElement = document.getElementById('current-bet-amount');


      const currentUser = await fetch(`${USER_API}?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      });

      let currentAmount: number; 
      let role: string;
      if (currentUser.ok) {
        const data = await currentUser.json();
         currentAmount= data.currentBalance;
         role = data.roles;
         console.log(data.username)
         console.log(data, 'this is the current user ')
      }

      console.log(role);
      console.log("this is the redirect ")
      if (role ==='admin'){
        window.location.href = '../src/dashboard.html'
      }
      else

        window.location.href = '../src/login_games.html'

      

      console.log(role, currentAmount)

      
        // const currentAmount = await fetch(`${USER_API_URL_AMOUNT}?username=${username}`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${accessToken}`,
        //   }
        // });

      // if (currentUser.ok) {
      //   const data = await currentUser.json();
      //   console.log("The current amount is:", data);
      //   currentBalanceDiv.innerText = data.amount;
      // } else {
      //   const error = await currentUser.json();
      //   console.log("Get current amount failed", error);
      // }
      // console.log("the current amount is" + currentUser.json());

      
      // console.log("the current amount is" + currentAmount);
     
    } else {
      console.log("Login failed:", response.json());
      alert("Username or password is incorrect");
    } 
  } catch (error) {
    console.log("Login failed:", error);
  }
}


const  setCookie = (name: string, value: string, days: number)=> {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieString;
  localStorage.setItem(name, value);
}

const  getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  const localStorageValue = localStorage.getItem(name);
  return localStorageValue !== null ? localStorageValue : null;
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
      // (<HTMLInputElement>document.getElementById("register-userName")).value =
      //   "";
      // (<HTMLInputElement>document.getElementById("email")).value = "";
      // (<HTMLInputElement>document.getElementById("register-password")).value =
      //   "";
      // (<HTMLInputElement>document.getElementById("confirmPassword")).value = "";

      // window.location.href = '../src/login_games.html'

      loginUser(username, password);
    } else {
      const error = await response.json();
      console.log("Registeration failed", error);
    }
  } catch (error) {
    console.log("Registeration failed:", error);
  }
}

function deleteCookie() {
  localStorage.removeItem('access_token');
}
const deleteAccount = async (event: Event) => {
  event.preventDefault();
  console.log(document.cookie);
  const accessToken = getCookie("access-token");
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
      window.location.href = './index.html'
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.log("Deletion Failed failed:", error);
  }
};


async function blockUser(event: Event) {
  
  event.preventDefault();
  console.log("this method is being called")
  const usernameToBlock = (<HTMLInputElement>document.getElementById("username-to-block")).value;

  console.log(usernameToBlock, 'this is the username to be blocked')
  try {
    const accessToken = getCookie('access-token');
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
      alert(data.message);
    } else {
      console.log("Block user failed:", response);
    }
  } catch (error) {
    console.error("Block user failed: ", error);
    alert('the user doesnt  exist')
  }
}

// const blockUserForm = document.getElementById("block-user-form");

// blockUserForm?.addEventListener("submit", (e: Event)=>{
//   e.preventDefault();
//   blockUser();

// });



const updatePassword = async (event: Event) => {
  event.preventDefault();
  const accessToken = getCookie("access-token");
  console.log(accessToken, "this is the access token")
  const newPassword = (<HTMLInputElement>document.getElementById("new-password")).value;
  const confirmPassword = (<HTMLInputElement>document.getElementById("old-password")).value;
  const confirmation = confirm("Are you sure you want to update your password?");
  if (!confirmation) {
    return;
  }

  try {
    const response = await fetch(UPDATE_PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newPassword}),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.log("Update Password Failed:", error);
  }
};



// const updatePasswordBtn = document.querySelector("#update-password-btn");
// updatePasswordBtn?.addEventListener("click", (e:Event)=>{
//   e.preventDefault();
//   updatePassword();
// });

const updateUsername = async (e: Event) => {
  e.preventDefault();
  const accessToken = getCookie("access-token");
  const newUsername = (<HTMLInputElement>document.getElementById("new-username")).value;
  const confirmPassword = (<HTMLInputElement>document.getElementById("password-for-change-username")).value;
  const confirmation = confirm("Are you sure you want to update your username?");
  if (!confirmation) {
    return;
  }

  try {
    const response = await fetch(UPDATE_USERNAME_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newUsername, confirmPassword }),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.log("Update Username Failed:", error);
  }
};

const deleteGame = async (gameUrl: string, accessToken: string) => {
  try {
    const response = await fetch('/game', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({gameUrl: gameUrl} ),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete game. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Deleted game:', result);
  } catch (error) {
    console.error('Error deleting game:', error.message);
  }
};

const deleteGames = async (event: Event) =>{
  event.preventDefault();
  const specificImageUrl = prompt("Enter the game url you want to delete ")

  const gameCards = document.querySelectorAll('.games-content');
  gameCards.forEach(card => {
  const cardImage = card.querySelector('img');

  if (cardImage.src === specificImageUrl) {
    const accessToken: string = getCookie('access-token');
    
    deleteGame(specificImageUrl, accessToken);

    card.remove();

    
    console.log('Removed game card:', card);
  }


});



}


const addGame = async (gameUrl: string) => {

  const accessToken = getCookie('access-token')
  try {
    const accessToken = getCookie('access-token');

    const response = await fetch('/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({gameUrl: gameUrl}),
    });   

    if (!response.ok) {
      throw new Error(`Failed to add game. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Added game:', result);
  } catch (error) {
    console.error('Error adding game:', error.message);
  }
};









