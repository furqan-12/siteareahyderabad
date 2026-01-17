// adminpanel/admin-roles.js
// Fetch /my-roles and conditionally hide .btn-delete for users with role 'admin' only.
(async function () {
  function getAuthToken() {
    try {
      const session = localStorage.getItem('adminSession');
      if (!session) {
        console.log('No session found in localStorage');
        return null;
      }
      const s = JSON.parse(session);
      console.log('Session data:', { 
        hasSession: !!s.session,
        hasUser: !!s.user,
        sessionToken: s.session?.access_token ? '(present)' : '(missing)',
        userToken: s.user?.access_token ? '(present)' : '(missing)'
      });
      // First try the session.access_token (from Supabase login)
      const token = s.session?.access_token;
      if (token) {
        console.log('Found token in session.access_token');
        return token;
      }
      console.warn('No token found in session data');
      return null;
    } catch (err) {
      console.error('Error reading session:', err);
      return null;
    }
  }

  async function fetchRoles(token) {
    if (!token) {
      console.log('No token provided to fetchRoles');
      return null;
    }
    try {
      console.log('Fetching roles with token');
      const res = await fetch('https://siteareahyderabadbackend.onrender.com/my-roles', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Roles response status:', res.status);
      if (!res.ok) {
        console.error('Error response from /my-roles:', res.status);
        return null;
      }
      const data = await res.json();
      console.log('Roles response:', data);
      return data;
    } catch (err) {
      console.error('Error fetching /my-roles:', err);
      return null;
    }
  }

  function hideDeleteButtons() {
    const buttons = document.querySelectorAll('.btn-delete');
    console.log(`Found ${buttons.length} delete buttons to hide`);
    buttons.forEach(btn => {
      // Hide and disable the button
      btn.style.display = 'none';
      btn.disabled = true;
      btn.setAttribute('aria-hidden', 'true');
    });
  }

  // Observe for dynamically added delete buttons (pages that render table rows async)
  function observeForDeleteButtons() {
    // Always try to hide immediately
    hideDeleteButtons();

    // Persistent observer: always check for new .btn-delete
    const observer = new MutationObserver(mutations => {
      let found = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.matches && node.matches('.btn-delete')) found = true;
              // also check descendants
              if (node.querySelector && node.querySelector('.btn-delete')) found = true;
            }
          });
        }
      }
      if (found) hideDeleteButtons();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback: check for buttons every 250ms for up to 10s
    let attempts = 0;
    const maxAttempts = 40; // 40*250ms = 10s
    const iv = setInterval(() => {
      attempts += 1;
      const buttons = document.querySelectorAll('.btn-delete');
      if (buttons.length > 0) {
        hideDeleteButtons();
      }
      if (attempts > maxAttempts) {
        clearInterval(iv);
        // If still no buttons, log DOM for debugging
        if (buttons.length === 0) {
          console.warn('[admin-roles.js] No .btn-delete found after 10s. Dumping DOM for debug:');
          console.log(document.body.innerHTML);
        }
      }
    }, 250);
  }

  // Ensure a default API exists immediately so pages can call hideIfNeeded even before roles are known
  window.adminRoles = window.adminRoles || { isOnlyAdmin: false, hideIfNeeded: function () {} };

  // run after DOM ready
  document.addEventListener('DOMContentLoaded', async () => {
    console.log('admin-roles.js loaded, checking session...');
    const token = getAuthToken();
    if (!token) {
      console.warn('No auth token found - delete buttons will remain visible');
      return;
    }

    console.log('Token found, fetching roles...');
    const rolesResp = await fetchRoles(token);
    if (!rolesResp) {
      console.error('Failed to fetch roles - delete buttons will remain visible');
      return;
    }

    // Get roles array from response
    const roles = rolesResp.roles || [];
    console.log('User roles:', roles);

    // Hide delete buttons if user only has 'admin' role
    if (Array.isArray(roles) && roles.length > 0) {
      const isOnlyAdmin = roles.length === 1 && roles.includes('admin');
      const isSuperAdmin = roles.includes('superadmin');
      
      console.log('Role check:', { isOnlyAdmin, isSuperAdmin });
      
      if (isOnlyAdmin) {
        console.log('User is admin only - hiding delete buttons');
        // Use observer to catch dynamically rendered buttons as well
        observeForDeleteButtons();
      } else if (isSuperAdmin) {
        console.log('User is superadmin - delete buttons remain visible');
      }
      // Expose roles and helper to pages and dispatch event
      window.adminRoles.roles = roles;
      window.adminRoles.isOnlyAdmin = !!isOnlyAdmin;
      window.adminRoles.hideIfNeeded = function () { if (this.isOnlyAdmin) hideDeleteButtons(); };
      try { document.dispatchEvent(new CustomEvent('adminRolesLoaded', { detail: { roles } })); } catch(e) { console.warn('adminRolesLoaded dispatch failed', e); }
    } else {
      console.warn('No roles found for user');
    }
  });
})();
