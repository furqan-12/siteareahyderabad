// adminpanel/admin-roles.js
// Fetch /my-roles and conditionally hide .btn-delete for users with role 'admin' only.
(async function () {
  function getAuthToken() {
    try {
      const session = localStorage.getItem('adminSession');
      if (!session) return null;
      const s = JSON.parse(session);
      // Try common token locations: s.session.access_token (from Supabase), s.user.access_token, or top-level keys
      return s.session?.access_token || s.user?.access_token || s.access_token || s.token || null;
    } catch (err) {
      return null;
    }
  }

  async function fetchRoles(token) {
    if (!token) return null;
    try {
      const res = await fetch('/my-roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error('Error fetching /my-roles', err);
      return null;
    }
  }

  function hideDeleteButtons() {
    document.querySelectorAll('.btn-delete').forEach(btn => {
      // Prefer to remove the element to avoid accidental deletion by DOM events
      btn.style.display = 'none';
      // Also disable pointer events if needed
      btn.disabled = true;
      btn.setAttribute('aria-hidden', 'true');
    });
  }

  // run after DOM ready
  document.addEventListener('DOMContentLoaded', async () => {
    const token = getAuthToken();
    if (!token) return; // no token -> can't decide access

    const rolesResp = await fetchRoles(token);
    // rolesResp expected shape: { roles: ['admin', 'superadmin'] } or similar
    const roles = rolesResp?.roles || rolesResp?.data?.roles || [];

    // if the user only has 'admin' (and not 'superadmin' or 'owner'), hide delete buttons
    if (Array.isArray(roles) && roles.length > 0) {
      const isOnlyAdmin = roles.length === 1 && roles.includes('admin');
      if (isOnlyAdmin) hideDeleteButtons();
    }
  });
})();
