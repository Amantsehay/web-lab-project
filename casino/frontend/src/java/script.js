var menuIcon = document.querySelector('.menu-icon');
var navBar = document.querySelector('.nav-bar');

menuIcon.addEventListener('click', function() {
    navBar.classList.toggle('show');
});
function displayRegistrationForm() {
        var registrationForm = document.getElementById("registrationForm");
        registrationForm.style.display = "block";
    }

    function closeRegistrationForm() {
        var registrationForm = document.getElementById("registrationForm");
        registrationForm.style.display = "none";
    }
function displayLoginForm() {
        var loginForm = document.getElementById("loginForm");
        loginForm.style.display = "block";
    }

function closeLoginForm() {
        var loginForm = document.getElementById("loginForm");
        loginForm.style.display = "none";
    }