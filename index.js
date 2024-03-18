// Function to add 'active' class to the current page link
function setActiveLink() {
  let links = document.querySelectorAll('.mar-a');

  // Getting the current page URL
  let currentUrl = window.location.href;

  // Iterating through each link and check if it matches the current page URL
  links.forEach(link => {
      if (link.href === currentUrl) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
}

// Call the function on page load
window.addEventListener('load', setActiveLink);



// function responsive top nav 
function myFunction() {
  let topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}



/* heading and carousel section */
let slideIndex = 0
showSlides()

function showSlides() {
  let i
  let slides = document.getElementsByClassName("mySlides1 ")
  let dots = document.getElementsByClassName("dot")
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"  
  }
  slideIndex++
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "")
  }
  slides[slideIndex-1].style.display = "block" 
  dots[slideIndex-1].className += " active"
  setTimeout(showSlides, 8000); // Change image every 8 seconds
}

/* heading and carousel section2 */
let slideIndexB = 0
showSlidesB()

function showSlidesB() {
  let i
  let slidesB = document.getElementsByClassName("mySlides2")
  let dotsB = document.getElementsByClassName("dot2")
  for (i = 0; i < slidesB.length; i++) {
    slidesB[i].style.display = "none"  
  }
  slideIndexB++
  if (slideIndexB > slidesB.length) {slideIndexB = 1}    
  for (i = 0; i < dotsB.length; i++) {
    dotsB[i].className = dotsB[i].className.replace(" active2", "")
  }
  slidesB[slideIndexB-1].style.display = "block" 
  dotsB[slideIndexB-1].className += " active2"
  setTimeout(showSlidesB, 8000); // Change image every 8 seconds
}




/* for customers quote */

let slideQuote = 1;
viewSlides(slideQuote);

function addSlides(n) {
  viewSlides(slideQuote += n);
}

function customerSlide(n) {
  viewSlides(slideQuote = n);
}

function viewSlides(n) {
  let i;
  let slide = document.getElementsByClassName("mySlides");
  let dotCustomer = document.getElementsByClassName("dot-c");
  if (n > slide.length) {
    slideQuote = 1;
  }
  if (n < 1) {
    slideQuote = slide.length;
  }
  for (i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
    slide[i].style.flexDirection = "column";
  }
  for (i = 0; i < dotCustomer.length; i++) {
    dotCustomer[i].className = dotCustomer[i].className.replace(" active", "");
  }
  slide[slideQuote - 1].style.display = "flex";
  dotCustomer[slideQuote - 1].className += " active";
  setTimeout(viewSlides, 8000, slideQuote += 1);
}







