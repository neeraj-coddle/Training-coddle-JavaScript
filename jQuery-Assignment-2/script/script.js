$(document).ready(function () {
  $("#signup-form").on("submit", function (e) {
    e.preventDefault();

    $(".error").text("");

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let dob = $("#dob").val();
    let password = $("#password").val();
    let confirm-password = $("#confirm-password").val();
    let description = $("#description").val().trim();

    let isValid = true;

    if (name == "") {
      $(".name-error").text("Name is required");
      isValid = false;
    }

    let emailPattern = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (email == "") {
      $(".email-error").text("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $(".email-error").text("Enter valid email");
      isValid = false;
    }

    if (phone == "") {
      $(".phone-error").text("Phone is required");
      isValid = false;
    } else if (phone.length !== 10) {
      $(".phone-error").text("Phone must be 10 digits");
      isValid = false;
    } else if (isNaN(phone)) {
      $(".phone-error").text("only number is allowed");
      isValid = false;
    }

    if (dob == "") {
      $(".dob-error").text("Date of birth is required");
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
        $(".dob-error").text("You must be at least 18 years old");
        isValid = false;
      }
    }

    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password == "") {
      $(".password-error").text("Password is required");
      isValid = false;
    } else if (!passPattern.test(password)) {
      $(".password-error").text(
        "Password must contain at least 8 characters, uppercase letter, lowercase letter, and one number",
      );
      isValid = false;
    }

    if (confirm-password == "") {
      $(".confirm-password-error").text("Confirm password is required");
      isValid = false;
    } else if (confirm-password !== password) {
      $(".confirm-password-error").text("Passwords do not match");
      isValid = false;
    }

    if (description == "") {
      $(".description-error").text("Description is required");
      isValid = false;
    } else if (description.length < 20) {
      $(".description-error").text("Description must be at least 20 characters");
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
