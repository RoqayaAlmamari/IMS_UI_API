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

-------add students
$(document).ready(function() {
    // Add event listener for the "Add Student" button
    $("#addStudentBtn").click(function() {
        // Get the input values from the form
        var name = $("#studentName").val();
        var email = $("#studentEmail").val();
        var phone = $("#studentPhone").val();

        // Create an object with the student data
        var studentData = {
            "name": name,
            "email": email,
            "phone": phone
        };

        // Send a POST request to the backend API
        $.ajax({
            url: "/api/students",
            type: "POST",
            headers: {
                "Authorization": "Basic " + btoa("admin:admin")
            },
            data: JSON.stringify(studentData),
            contentType: "application/json",
            success: function(data) {
                // Append the new student row to the table
                var newRow = $("<tr>")
                    .append($("<td>").text(data.id))
                    .append($("<td>").text(data.name))
                    .append($("<td>").text(data.email))
                    .append($("<td>").text(data.phone))
                    .append($("<td>")
                        .append($("<button>")
                            .addClass("btn btn-sm btn-info mr-2")
                            .attr("data-toggle", "modal")
                            .attr("data-target", "#editStudentModal")
                            .text("Edit")
                        )
                        .append($("<button>")
                            .addClass("btn btn-sm btn-danger")
                            .attr("data-toggle", "modal")
                            .attr("data-target", "#deleteStudentModal")
                            .text("Delete")
                        )
                    );
                $("table tbody").append(newRow);

                // Reset the form inputs
                $("#studentName").val("");
                $("#studentEmail").val("");
                $("#studentPhone").val("");

                // Hide the modal
                $("#addStudentModal").modal("hide");
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
            }
        });
    });
});

---edit

$(document).ready(function() {
    // Set up event listener for save changes button
    $("#saveChangesBtn").click(function() {
        // Get the form data
        var studentData = {
            id: $("#editStudentId").val(),
            name: $("#editStudentName").val(),
            email: $("#editStudentEmail").val(),
            phone: $("#editStudentPhone").val()
        };
        // Send the AJAX request
        $.ajax({
            url: "/api/students",
            type: "POST",
            headers: {
                "Authorization": "Basic " + btoa("admin:admin")
            },
            contentType: "application/json",
            data: JSON.stringify(studentData),
            success: function(response) {
                // Update the table row with the new data
                $("#studentRow-" + studentData.id).find(".name").text(studentData.name);
                $("#studentRow-" + studentData.id).find(".email").text(studentData.email);
                $("#studentRow-" + studentData.id).find(".phone").text(studentData.phone);
                // Hide the modal
                $("#editStudentModal").modal("hide");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error updating student: " + errorThrown);
            }
        });
    });
});

---del--

// Set up the basic authentication credentials
var username = 'admin';
var password = 'admin';

// Set up the data to send in the POST request
 var name = $("#studentName").val();
        var email = $("#studentEmail").val();
        var phone = $("#studentPhone").val();

        // Create an object with the student data
        var studentData = {
            "name": name,
            "email": email,
            "phone": phone
        };

// Send the POST request with jQuery
$.ajax({
  url: '/api/students',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + btoa(username + ':' + password)
  },
  data: JSON.stringify(data),
  contentType: 'application/json',
  success: function(response) {
    // The API successfully added the data
    console.log('Data added successfully');
  },
  error: function(xhr, status, error) {
    // There was an error adding the data
    console.log('Error adding data: ' + error);
  }
});

--import--
// get the import button
const importBtn = document.getElementById('importBtn');

// add a click event listener to the import button
importBtn.addEventListener('click', () => {
  // send a POST request to your Spring Boot API using fetch API
  fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin') // replace with your own username and password
    },
    body: JSON.stringify({
      // add any data you want to send with the request
    })
  })
  .then(response => {
    if (response.ok) {
      // if the request is successful, update the table
      updateTable();
    } else {
      // handle the error
      console.error('Error importing students:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error importing students:', error);
  });
});

function updateTable() {
  // update the table using JavaScript DOM manipulation
}


