let contacts = [];

// Load initial data
async function loadData() {
    const response = await fetch('data/access_contacts.csv');
    const data = await response.text();
    contacts = Papa.parse(data, {header: true}).data;
    renderTable();
}

// Render table
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    contacts.sort((a, b) => {
        if (a.College === b.College) {
            return a.linkblue.localeCompare(b.linkblue);
        }
        return a.College.localeCompare(b.College);
    });

    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.linkblue.trim()}</td>
            <td>${contact['First Name']} ${contact['Last Name']}</td>
            <td>${contact.College}</td>
            <td>${contact.Department}</td>
            <td>${contact.Prefix || '-'}</td>
            <td>${contact['Contact Type']}</td>
        `;
        if (contact['Primary Contact'] === 'Yes') {
            row.classList.add('primary-contact');
        }
        tbody.appendChild(row);
    });
}

// Initial load
loadData();
