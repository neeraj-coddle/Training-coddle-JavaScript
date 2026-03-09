var currentIndex = 0;
console.log("index",currentIndex);

displaySlides(currentIndex);

function setSlides(num) {
  if (num == 1) {
    currentIndex += 1; 
  }
  if (num == -1) {
    currentIndex -= 1; 
  }
  //update user input
  displaySlides(currentIndex);
  console.log("index",currentIndex);
}

function displaySlides(num) {
  
  var slides = document.getElementsByClassName("imageSlides");
  
  
  if (num >= slides.length) { currentIndex = 0 }
  // changed the conditional operator because it was also checking the value beyond the maximum index value
  console.log("index",currentIndex);
  
  if (num < 0) { currentIndex = slides.length-1 }
  // changed the condition value to 0 or else it will not get to the 0th index
  console.log("index",currentIndex); 
  
  
  for (let x = 0; x <= slides.length-1; x++) {
    // added -1 or because it was going beyond the maximum index value 
    slides[x].style.display = "none";
  }

  console.log(currentIndex);
  slides[currentIndex].style.display = "block"; 
  console.log(slides[currentIndex]);
  
  // should change the display value after changing the display to none or else it will be changed 
  // back to none and wont get displayed
  
}
