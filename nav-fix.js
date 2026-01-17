const navbarHTML = `
<nav class="navbar">
  <div class="navbar-brand">
    <div class="logo-img">
      <img src="assests/SITE Official Logo.JPG" alt="SITE Association of Industry">
    </div>
    <div class="logo-text">HYDERABAD SITE ASSOCIATION <br> OF TRADE AND INDUSTRY</div>
  </div>
  <button class="nav-toggle" aria-label="Open navigation">
    <span class="icon">☰</span>
  </button>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    
    <li class="dropdown">
     <a href="about.html">About Us</a>
      <div class="dropdown-content">
        <a href="about.html">About Us</a>
        <a href="messages.html">Our Vision</a>
      </div>
    </li>
    <li class="dropdown">
      <a href="members.html">Committee Members</a>
      <div class="dropdown-content">
        <a href="members.html">Executive Committee</a>
        <a href="pastExecutivecommittee.html">Executive Committee Members</a>
        <a href="allmembers.html">All Members</a>
      </div>
    </li>
    <li><a href="events.html">Events</a></li>
    <li><a href="clean-green.html">Social Responsibility</a></li>
    <li class="dropdown">
      <a href="#downloads">Downloads</a>
      <div class="dropdown-content">
        <a href="membershipForm.html">Membership Form</a>
      </div>
    </li>
    
    <li class ="dropdown">
        <a href="circulars.html" >Circulars</a>
            <div class="dropdown-content">
        <a href="circulars.html">Circulars</a>
        <a href="pressrelease.html">Press Release</a>
        <a href="letters.html">Letters</a>
            </div>
    </li>
    
    <li><a href="maps.html">Infrastructure</a></li>
    <li><a href="circulars.html#contact-section">Contact Us</a></li>
  </ul>
</nav>
`;

(function () {
  function activateCurrentLink() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      try {
        if (a.getAttribute('href') === current || a.href === location.href) {
          a.classList.add('active');
        }
      } catch (e) {}
    });
  }

  function setupToggleHandlers() {
    document.addEventListener('click', function (e) {
      const toggle = e.target.closest('.nav-toggle');
      if (toggle) {
        document.querySelectorAll('.nav-links').forEach(n => n.classList.toggle('open'));
        document.querySelectorAll('.nav-toggle').forEach(b => b.classList.toggle('open'));
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.navbar')) {
        document.querySelectorAll('.nav-links.open').forEach(n => n.classList.remove('open'));
        document.querySelectorAll('.nav-toggle.open').forEach(b => b.classList.remove('open'));
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-links.open').forEach(n => n.classList.remove('open'));
        document.querySelectorAll('.nav-toggle.open').forEach(b => b.classList.remove('open'));
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mount = document.getElementById('site-navbar');
    if (mount) {
      mount.innerHTML = navbarHTML;
      activateCurrentLink();
      setupToggleHandlers();
      return;
    }

    // If no mount point found, try to attach handlers to an existing navbar
    const existingNavbar = document.querySelector('.navbar');
    if (existingNavbar) {
      // Ensure handlers and active link are set for the existing markup
      activateCurrentLink();
      setupToggleHandlers();
      return;
    }

    // If there is no existing navbar and no #site-navbar mount point,
    // inject the canonical navbar at the top of <body> so pages without
    // header markup still get the responsive menu.
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    activateCurrentLink();
    setupToggleHandlers();
  });
})();
