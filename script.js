// ===== MOBILE MENU =====
var menuBtn = document.getElementById('menuBtn');
var navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// Close the menu after clicking a link
var links = document.querySelectorAll('#navLinks a');
links.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ===== ACTIVE NAV LINK + BACK TO TOP BUTTON =====
var sections = document.querySelectorAll('section[id]');
var topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', function () {
  var current = 'home';
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  links.forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
  topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

topBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL REVEAL =====
var revealItems = document.querySelectorAll('.reveal');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealItems.forEach(function (item) { observer.observe(item); });

// ===== PROFILE PHOTO =====
// If photo.jpg is missing, hide the broken image and show the placeholder text
var photo = document.getElementById('photo');
var placeholder = document.getElementById('photoPlaceholder');
photo.addEventListener('error', function () { photo.style.display = 'none'; });
photo.addEventListener('load', function () { placeholder.style.display = 'none'; });

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== CONTACT FORM VALIDATION =====
var form = document.getElementById('contactForm');

function showError(id, message) {
  document.getElementById(id + 'Error').textContent = message;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var name = form.name.value.trim();
  var email = form.email.value.trim();
  var subject = form.subject.value.trim();
  var message = form.message.value.trim();
  var valid = true;

  // Clear old errors
  ['name', 'email', 'subject', 'message'].forEach(function (id) { showError(id, ''); });
  document.getElementById('formStatus').textContent = '';

  if (name.length < 2) { showError('name', 'Please enter your name.'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Please enter a valid email address.'); valid = false; }
  if (subject.length < 3) { showError('subject', 'Please enter a subject.'); valid = false; }
  if (message.length < 10) { showError('message', 'Message should be at least 10 characters.'); valid = false; }

  if (valid) {
    // Opens the visitor's email app with the message filled in
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
    window.location.href = 'mailto:lharishini2005@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('formStatus').textContent = 'Opening your email app...';
    form.reset();
  }
});

// ===== TYPING EFFECT (uses your areas of interest from the resume) =====
var words = ['Software Development', 'Front-End Development', 'Web Design', 'Artificial Intelligence'];
var wordIndex = 0;
var charIndex = 0;
var deleting = false;
var typedEl = document.getElementById('typed');

function typeLoop() {
  var word = words[wordIndex];
  charIndex = deleting ? charIndex - 1 : charIndex + 1;
  typedEl.textContent = word.substring(0, charIndex);
  var delay = deleting ? 40 : 90;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
  else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ===== MOUSE GLOW (soft light follows the cursor) =====
var glow = document.getElementById('glow');
document.addEventListener('mousemove', function (e) {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
