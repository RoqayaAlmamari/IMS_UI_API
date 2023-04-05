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