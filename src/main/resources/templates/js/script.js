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


$(document).ready(function() {
  // Import students button click
  $('#importBtn').click(function() {
    $.getJSON('students.json', function(data) {
      $.each(data, function(index, student) {
        // Append new row to table
        $('tbody').append('<tr><td>' + (index + 1) + '</td><td>' + student.name + '</td><td>' + student.email + '</td><td>' + student.phone + '</td><td><button class="btn btn-info">Edit</button> <button class="btn btn-danger">Delete</button></td></tr>');
      });
    });
  });
});


// Event listener for form submit
$("#addStudentForm").submit(function(event) {
  event.preventDefault();

  // Get the values from the form
  var studentId = $("#studentId").val();
  var studentName = $("#studentName").val();
  var studentEmail = $("#studentEmail").val();
  var studentPhone = $("#studentPhone").val();

  // Add the student to the table
  addStudentToTable(studentId, studentName, studentEmail, studentPhone);

  // Clear the form
  $("#addStudentForm")[0].reset();
});

// Event listener for file input change
$("#fileInput").change(function(event) {
  var file = event.target.files[0];

  // Read the file contents
  var reader = new FileReader();
  reader.onload = function() {
    var data = JSON.parse(reader.result);

    // Loop through the data and add each student to the table
    for (var i = 0; i < data.length; i++) {
      var student = data[i];
      addStudentToTable(student.id, student.name, student.email, student.phone);
    }
  };
  reader.readAsText(file);
});

// Function to add a student to the table
function addStudentToTable(id, name, email, phone) {
  var tableRow = $("<tr></tr>");
  tableRow.append("<td>" + id + "</td>");
  tableRow.append("<td>" + name + "</td>");
  tableRow.append("<td>" + email + "</td>");
  tableRow.append("<td>" + phone + "</td>");
  $("#studentTable tbody").append(tableRow);
}

const studentCreateForm = document.querySelector('#student-form');
const studentUpdateForm = document.querySelector('#student-update-form')
const deleteForm = document.querySelector('#student-form-delete');
const studentFormContainer = document.querySelector('#student-form-container');
const createBtn = document.querySelector('#create-btn');
const getBtn = document.querySelector('#get-btn');
const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const studentTable = document.querySelector('#student-table tbody');
const studentIdInput = document.querySelector("#student-id");
const studentIdLabel = document.querySelector("#student-id-label");
 // retrieve the stored username and password from the localStorage
   const storedUsername = localStorage.getItem('username');
   const storedPassword = localStorage.getItem('password');

createBtn.addEventListener('click', () => {
    studentCreateForm.style.display = 'block';
    studentTable.parentElement.style.display = 'none';
    studentUpdateForm.style.display = 'none';
    deleteForm.style.display = 'none';
});
studentCreateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const studentName = document.querySelector('#student-name').value;
  const studentEmail = document.querySelector('#student-email').value;

  fetch('http://localhost:8080/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,
    'Authorization': 'Basic ' + btoa(storedUsername + ":" + storedPassword)},
    body: JSON.stringify({
      name: studentName,
      email: studentEmail
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Student added successfully');
      studentCreateForm.reset();
    } else {
      alert('An error occurred while adding the student');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
});