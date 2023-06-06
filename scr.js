
const entryForm = document.getElementById('entry-form');
const dataTable = document.getElementById('data-table');
const addBtn = document.getElementById('add-btn');

// Data will be store in array
let entries = [];


entryForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const hobbies = document.getElementById('hobbies').value;

  const entry = {
    id: entries.length + 1,
    name,
    phone,
    email,
    hobbies
  };

  entries.push(entry);
  displayTable();
  //this is very imp (reset is must)
  entryForm.reset();
});

// Function to display the table
function displayTable() {
  // Clear the table body
  dataTable.tBodies[0].innerHTML = '';

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    const row = document.createElement('tr');
    row.innerHTML = `

      <td>${entry.id}</td>
      <td>${entry.name}</td>
      <td>${entry.phone}</td>
      <td>${entry.email}</td>
      <td>${entry.hobbies}</td>
    `;

    dataTable.tBodies[0].appendChild(row);
  }
}
