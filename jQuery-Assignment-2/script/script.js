$(document).ready(function () {
  $("#signupForm").on("submit", function (e) {
    e.preventDefault();

    $(".error").text("");

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let dob = $("#dob").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    let description = $("#description").val().trim();

    let isValid = true;

    if (name == "") {
      $(".nameError").text("Name is required");
      isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == "") {
      $(".emailError").text("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $(".emailError").text("Enter valid email");
      isValid = false;
    }

    if (phone == "") {
      $(".phoneError").text("Phone is required");
      isValid = false;
    } else if (phone.length !== 10) {
      $(".phoneError").text("Phone must be 10 digits");
      isValid = false;
    } else if (isNaN(phone)) {
      $(".phoneError").text("only number is allowed");
      isValid = false;
    }

    if (dob == "") {
      $(".dobError").text("Date of birth is required");
      isValid = false;
    } else {
      let birthDate = new Date(dob);
      let today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        $(".dobError").text("You must be at least 18 years old");
        isValid = false;
      }
    }

    if (password == "") {
      $(".passwordError").text("Password is required");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      $(".passwordError").text(
        "password must contain atleast one lowercase letter",
      );
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      $(".passwordError").text(
        "password must contain atleast one uppercase letter",
      );
      isValid = false;
    } else if (!/\d/.test(password)) {
      $(".passwordError").text(
        "Try to include atleast one number in your password",
      );
      isValid = false;
    } else if (password.length < 8) {
      $(".passwordError").text("Password must contain more than 8 characters");
      isValid = false;
    }

    if (confirmPassword == "") {
      $(".confirmPasswordError").text("Confirm password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      $(".confirmPasswordError").text("Passwords do not match");
      isValid = false;
    }

    if (description == "") {
      $(".descriptionError").text("Description is required");
      isValid = false;
    } else if (description.length < 20) {
      $(".descriptionError").text("Description must be at least 20 characters");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully");

      let userdata = [];
      userdata.push({
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        password: password,
        description: description,
      });

      console.log(userdata);

      $("#signupForm")[0].reset();
    }
  });
});
