// Dynamic homepage management cards
// This script will fetch members and render 5 cards for specific designations

document.addEventListener('DOMContentLoaded', async () => {
  const topRow = document.getElementById('management-row-top');
  const bottomRow = document.getElementById('management-row-bottom');
  if (!topRow || !bottomRow) return;

  // Designations to show in order
  const requiredDesignations = [
    'Chairman',
    'Senior Vice Chairman',
    'Vice Chairman',
    'General Secretary',
    'Finance Secretary'
  ];

  try {
    const res = await fetch('https://siteareahyderabadbackend.onrender.com/getmembers');
    const { members } = await res.json();
    if (!Array.isArray(members)) return;

    // Filter and order members by required designations
    const cards = requiredDesignations.map(designation => {
      console.log("designation match check ",members.find(m => m.designation && m.designation.toLowerCase() === designation.toLowerCase()))
      return members.find(m => m.designation && m.designation.toLowerCase() === designation.toLowerCase());
    });

    topRow.innerHTML = '';
    bottomRow.innerHTML = '';
    cards.forEach((member, idx) => {
      const designation = requiredDesignations[idx];
      if (!member){
        console.log("member details", member, designation);
        return;
      }
      console.log("member details ",member);
      const imageSrc = member.image_url ? member.image_url : `assests/person${idx+1}.png`;
      const name = member.name || designation;
      const email = member.email || '';
      const phone = member.phone || '';
      const messageLink = idx === 0 ? 'messages.html#chairman-messages-section'
        : idx === 1 ? 'messages.html#senior-vice-chairman-messages-section'
        : idx === 2 ? 'messages.html#vice-chairman-messages-section'
        : '';
      const card = document.createElement('div');
  card.className = 'management-col person-card col-md-4';
      card.innerHTML = `
        <h3>${designation}</h3>
        <img src="${imageSrc}" alt="${designation}" class="person-img">
        <h4 class="person-name">${name}</h4>
        <div class="divider"></div>
        <p><svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:4px;"><path d="M2 4h20v16H2z" fill="none" stroke="#358232" stroke-width="2"/><polyline points="2,4 12,13 22,4" fill="none" stroke="#358232" stroke-width="2"/></svg>${email}</p>
        <p><svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:4px;" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11z" fill="none" stroke="#358232" stroke-width="2"/></svg>${phone}</p>
        <span class="message-text"><strong>Message:</strong> Message from ${designation} of SITE Association of industry</span>
        ${messageLink ? `<a href="${messageLink}" class="see-more">see more</a>` : ''}
      `;
      if (idx < 3) {
        topRow.appendChild(card); // First 3 cards uper
      } else {
        bottomRow.appendChild(card); // Last 2 cards neeche
      }
    });
  } catch (err) {
    console.error('Failed to load management cards:', err);
  }
});
