// Bckend API endpoints
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var API_URL = "http://localhost:5000/auth/";
var USER_API = 'http://localhost:5000/auth/user';
// const sdfsdf= "http://localhost:5000/auth/index.html"
var USER_API_URL_AMOUNT = 'http://localhost:5000/auth/user-amount';
var LOGIN_URL = "http://localhost:5000/auth/login";
var REGISTER_URL = "http://localhost:5000/auth/signup";
var DELETE_ACCOUNT_URL = "http://localhost:5000/auth/delete-account";
var BLOCK_USER_URL = "http://localhost:5000/auth/block";
var UNBLOCK_USER_URL = "http://localhost:5000/auth/unblock";
var UPDATE_PASSWORD_URL = "http://localhost:5000/auth/update-password";
var UPDATE_USERNAME_URL = "http://localhost:5000/auth/update-username";
// form validation validation for registration
function validateRegisterForm() {
    var userName = (document.getElementById("register-userName")).value.trim();
    var email = (document.getElementById("email")).value.trim();
    var password = (document.getElementById("register-password")).value.trim();
    var confirmPassword = (document.getElementById("confirmPassword")).value.trim();
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
        displayRegistrationErrorMessage("User Name must be at least 3 characters long.");
        return;
    }
    if (!email) {
        displayRegistrationErrorMessage("Email is required.");
        return;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayRegistrationErrorMessage("Invalid email format.");
        return;
    }
    if (!password) {
        displayRegistrationErrorMessage("Password is required.");
        return;
    }
    if (password.length < 8) {
        displayRegistrationErrorMessage("Password must be at least 8 characters long.");
        return;
    }
    if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        displayRegistrationErrorMessage("Password must contain at least one number and one symbol.");
        return;
    }
    if (password !== confirmPassword) {
        displayRegistrationErrorMessage("Passwords do not match. Please try again.");
        return;
    }
    // displayRegistrationSuccessMessage("Registration successful!");
}
function resetRegistrationErrorMessages() {
    var errorMessagesElement = document.getElementById("errorMessages");
    errorMessagesElement.textContent = "";
    errorMessagesElement.style.color = "";
}
function displayRegistrationErrorMessage(message) {
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
    var userName = (document.getElementById("login-userName")).value.trim();
    var password = (document.getElementById("login-password")).value.trim();
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
function displayErrorMessage(message) {
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
var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");
//calling functions
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateLoginForm();
    var username = document.getElementById("login-userName")
        .value;
    var password = document.getElementById("login-password")
        .value;
    console.log("login form submitted");
    //call login function
    loginUser(username, password);
});
// Login
function loginUser(username, password) {
    return __awaiter(this, void 0, Promise, function () {
        var response, data, accessToken, currentBalanceDiv, currentUser, currentAmount, role, data_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, fetch(LOGIN_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ username: username, password: password })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 7];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, data.accessToken];
                case 3:
                    accessToken = _a.sent();
                    console.log("The access token for this user is:", accessToken);
                    // setCookie(username, accessToken, 3);
                    setCookie("access-token", accessToken, 3);
                    currentBalanceDiv = document.getElementById('current-bet-amount');
                    return [4 /*yield*/, fetch(USER_API + "?username=" + username, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + accessToken
                            }
                        })];
                case 4:
                    currentUser = _a.sent();
                    currentAmount = void 0;
                    role = void 0;
                    if (!currentUser.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, currentUser.json()];
                case 5:
                    data_1 = _a.sent();
                    currentAmount = data_1.currentBalance;
                    role = data_1.roles;
                    console.log(data_1.username);
                    console.log(data_1, 'this is the current user ');
                    _a.label = 6;
                case 6:
                    console.log(role);
                    console.log("this is the redirect ");
                    if (role === 'admin') {
                        window.location.href = '../src/dashboard.html';
                    }
                    else
                        window.location.href = '../src/login_games.html';
                    console.log(role, currentAmount);
                    return [3 /*break*/, 8];
                case 7:
                    console.log("Login failed:", response.json());
                    alert("Username or password is incorrect");
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.log("Login failed:", error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
var setCookie = function (name, value, days) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    var cookieString = name + "=" + encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = cookieString;
    localStorage.setItem(name, value);
};
var getCookie = function (name) {
    var cookies = document.cookie.split(";");
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.trim().split("="), cookieName = _a[0], cookieValue = _a[1];
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    var localStorageValue = localStorage.getItem(name);
    return localStorageValue !== null ? localStorageValue : null;
};
// calling register function
registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateRegisterForm();
    var username = (document.getElementById("register-userName")).value;
    var email = document.getElementById("email").value;
    var password = (document.getElementById("register-password")).value;
    console.log(JSON.stringify({
        username: username,
        email: email,
        password: password
    }));
    console.log("register form submitted");
    //call register function
    registerUser(username, email, password);
});
// Registeration
function registerUser(username, email, password) {
    return __awaiter(this, void 0, Promise, function () {
        var response, data, error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fetch(REGISTER_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ username: username, email: email, password: password })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("Registeration successful:", data);
                    // (<HTMLInputElement>document.getElementById("register-userName")).value =
                    //   "";
                    // (<HTMLInputElement>document.getElementById("email")).value = "";
                    // (<HTMLInputElement>document.getElementById("register-password")).value =
                    //   "";
                    // (<HTMLInputElement>document.getElementById("confirmPassword")).value = "";
                    // window.location.href = '../src/login_games.html'
                    loginUser(username, password);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    error = _a.sent();
                    console.log("Registeration failed", error);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.log("Registeration failed:", error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
var deleteAccount = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var accessToken, confirmation, response, result, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                console.log(document.cookie);
                accessToken = getCookie("access-token");
                console.log(accessToken);
                confirmation = confirm("Are you sure you want to delete your account?");
                if (!confirmation) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, fetch(DELETE_ACCOUNT_URL, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + accessToken
                        }
                    })];
            case 2:
                response = _a.sent();
                console.log("the response is ok");
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                result = _a.sent();
                deleteCookie(accessToken);
                alert(result.message);
                window.location.href = './index.html';
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                error = _a.sent();
                alert("Error: " + error.message);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                console.log("Deletion Failed failed:", error_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
function blockUser(event) {
    return __awaiter(this, void 0, void 0, function () {
        var usernameToBlock, accessToken, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log("this method is being called");
                    usernameToBlock = document.getElementById("username-to-block").value;
                    console.log(usernameToBlock, 'this is the username to be blocked');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    accessToken = getCookie('access-token');
                    if (!accessToken) {
                        console.error("Access token not found. Please log in.");
                        alert("Access token not found. Please log in.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch(BLOCK_USER_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + accessToken
                            },
                            body: JSON.stringify({ username: usernameToBlock })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log(data.message);
                    alert(data.message);
                    return [3 /*break*/, 5];
                case 4:
                    console.log("Block user failed:", response);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error("Block user failed: ", error_4);
                    alert('the user doesnt  exist');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// const blockUserForm = document.getElementById("block-user-form");
// blockUserForm?.addEventListener("submit", (e: Event)=>{
//   e.preventDefault();
//   blockUser();
// });
var updatePassword = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var accessToken, newPassword, confirmPassword, confirmation, response, result, error, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                accessToken = getCookie("access-token");
                console.log(accessToken, "this is the access token");
                newPassword = document.getElementById("new-password").value;
                confirmPassword = document.getElementById("old-password").value;
                confirmation = confirm("Are you sure you want to update your password?");
                if (!confirmation) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, fetch(UPDATE_PASSWORD_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + accessToken
                        },
                        body: JSON.stringify({ newPassword: newPassword })
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                result = _a.sent();
                alert(result.message);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                error = _a.sent();
                alert("Error: " + error.message);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                console.log("Update Password Failed:", error_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
// const updatePasswordBtn = document.querySelector("#update-password-btn");
// updatePasswordBtn?.addEventListener("click", (e:Event)=>{
//   e.preventDefault();
//   updatePassword();
// });
var updateUsername = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var accessToken, newUsername, confirmPassword, confirmation, response, result, error, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                accessToken = getCookie("access-token");
                newUsername = document.getElementById("new-username").value;
                confirmPassword = document.getElementById("password-for-change-username").value;
                confirmation = confirm("Are you sure you want to update your username?");
                if (!confirmation) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, fetch(UPDATE_USERNAME_URL, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + accessToken
                        },
                        body: JSON.stringify({ newUsername: newUsername, confirmPassword: confirmPassword })
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                result = _a.sent();
                alert(result.message);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                error = _a.sent();
                alert("Error: " + error.message);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_6 = _a.sent();
                console.log("Update Username Failed:", error_6);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
var deleteGame = function (gameUrl, accessToken) { return __awaiter(_this, void 0, void 0, function () {
    var response, result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('/game', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ gameUrl: gameUrl })
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to delete game. Status: " + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 2:
                result = _a.sent();
                console.log('Deleted game:', result);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error('Error deleting game:', error_7.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteGames = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var specificImageUrl, gameCards;
    return __generator(this, function (_a) {
        event.preventDefault();
        specificImageUrl = prompt("Enter the game url you want to delete ");
        gameCards = document.querySelectorAll('.games-content');
        gameCards.forEach(function (card) {
            var cardImage = card.querySelector('img');
            if (cardImage.src === specificImageUrl) {
                var accessToken = getCookie('access-token');
                deleteGame(specificImageUrl, accessToken);
                card.remove();
                console.log('Removed game card:', card);
            }
        });
        return [2 /*return*/];
    });
}); };
var addGame = function (gameUrl) { return __awaiter(_this, void 0, void 0, function () {
    var accessToken, accessToken_1, response, result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessToken = getCookie('access-token');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                accessToken_1 = getCookie('access-token');
                return [4 /*yield*/, fetch('/game', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + accessToken_1
                        },
                        body: JSON.stringify({ gameUrl: gameUrl })
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to add game. Status: " + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 3:
                result = _a.sent();
                console.log('Added game:', result);
                return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                console.error('Error adding game:', error_8.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
