
// animate only once

// document.addEventListener('DOMContentLoaded', () => {
//   const cards = document.querySelectorAll('.service-card');

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry, index) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => {
//             entry.target.classList.add('in-view');
//           }, index * 150); // Add staggered animation with delay
//         }
//       });
//     },
//     { threshold: 0.2 } // Trigger when 20% of the element is in view
//   );

//   cards.forEach((card) => observer.observe(card));
// });




// animate every times it is in view

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add `in-view` class when the card is visible
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, index * 150); // Staggered effect
        } else {
          // Remove `in-view` class when the card is out of view
          entry.target.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the element is in view
  );

  cards.forEach((card) => observer.observe(card));
});





// navbar

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.remove('transparent');
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
      navbar.classList.add('transparent');
    }
  };

  // Initial state
  handleScroll();

  // Listen to scroll events
  window.addEventListener('scroll', handleScroll);
});


//signin
document.getElementById('signin').addEventListener('click', function(){
  window.location.href = 'signin.html';
});





