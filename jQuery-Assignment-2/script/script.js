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

    let emailPattern = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

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
      console.log("ageLog1",age);
      
      let monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0) {
        age--;
        console.log("ageLog2",age);
      } else if (monthDifference === 0 && today.getDate() < birthDate.getDate()) {
        age--;
        console.log("ageLog3",age);
      }

      if (age < 18) {
        $(".dobError").text("You must be at least 18 years old");
        isValid = false;
      }
    }

    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password == "") {
      $(".passwordError").text("Password is required");
      isValid = false;
    } else if (!passPattern.test(password)) {
      $(".passwordError").text(
        "Password must contain at least 8 characters, uppercase letter, lowercase letter, and one number",
      );
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
