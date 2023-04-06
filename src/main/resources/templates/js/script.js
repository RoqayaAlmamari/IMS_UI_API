const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Check if the username and password are correct
  if (usernameInput.value === 'admin' && passwordInput.value === 'admin') {
    window.location.href = 'index.html'; // redirect to index page
  } else {
    usernameInput.classList.add('error');
    passwordInput.classList.add('error');
    usernameError.textContent = 'Incorrect username or password';
    passwordError.textContent = 'Incorrect username or password';
  }
});

// Reset error styles and messages on input change
usernameInput.addEventListener('input', function() {
  usernameInput.classList.remove('error');
  usernameError.textContent = '';
});

passwordInput.addEventListener('input', function() {
  passwordInput.classList.remove('error');
  passwordError.textContent = '';
});

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    document.getElementById("addStudentForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        const url = "http://localhost:8080/api/students";

        const reqConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Basic " + btoa(storedUsername + ":" + storedPassword)
            },
            body: JSON.stringify({
                Studentname: name,
                Studentemail: email,
                Studentphone: phone
            })
        };

        fetch(url, reqConfig)
            .then((response) => {
                if (response.ok) {
                    alert(`Student created successfully.`);
                } else {
                    alert(`Failed to create student.`);
                }
            })
            .then((parsedResponse) => {
                console.log(parsedResponse);
                document.getElementById("addStudentForm").reset();
                $('#addStudentModal').modal('hide');
            });
    });

// Select the navbar element
const navbar = document.querySelector('.navbar-nav');

// Create a new li element for the logout button
const logoutLi = document.createElement('li');
logoutLi.classList.add('nav-item');

// Create a new a element for the logout button
const logoutLink = document.createElement('a');
logoutLink.classList.add('nav-link');
logoutLink.href = 'login.html';
logoutLink.innerText = 'Logout';

// Append the link to the li element and the li element to the navbar
logoutLi.appendChild(logoutLink);
navbar.appendChild(logoutLi);

// Add a click event listener to the logout button
logoutLink.addEventListener('click', function() {
  // Perform logout actions here
});
