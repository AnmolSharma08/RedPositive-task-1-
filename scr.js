const entryForm = document.getElementById('entry-form');
const dataTable = document.getElementById('data-table');

// Data will be stored in an array
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
  // Reset the form
  entryForm.reset();
});


// Function to display the table
function displayTable() {
  // Clear the table body
  dataTable.tBodies[0].innerHTML = '';

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // Skip deleted entries
    if (entry.deleted) continue;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${entry.id}</td>
      <td>${entry.name}</td>
      <td>${entry.phone}</td>
      <td>${entry.email}</td>
      <td>${entry.hobbies}</td>
    `;

    dataTable.tBodies[0].appendChild(row);
  }
  attachButtonListeners();
}

// Attach event listeners to the update and delete buttons
function attachButtonListeners() {
  const updateBtn = document.getElementById('update-btn');
  const deleteBtn = document.getElementById('delete-btn');
  const checkboxes = document.querySelectorAll('#data-table tbody input[type="checkbox"]');

  updateBtn.addEventListener('click', () => {
    const selectedRows = getSelectedRows();
    // Prompt for update for each selected row individually
    selectedRows.forEach(row => {
      const updatedEntry = prompt(`Enter updated details for ID ${row.id}:`, `${row.name},${row.phone},${row.email},${row.hobbies}`);
      if (updatedEntry) {
        const [name, phone, email, hobbies] = updatedEntry.split(',');
        row.name = name;
        row.phone = phone;
        row.email = email;
        row.hobbies = hobbies;
        row.rowElement.cells[2].textContent = name;
        row.rowElement.cells[3].textContent = phone;
        row.rowElement.cells[4].textContent = email;
        row.rowElement.cells[5].textContent = hobbies;
      }
    });
  });

  deleteBtn.addEventListener('click', () => {
    const selectedRows = getSelectedRows();
    // Perform delete operation on selected rows
    selectedRows.forEach(row => {
      row.rowElement.remove();
      const index = entries.findIndex(entry => entry.id === row.id);
      if (index !== -1) {
        entries[index].deleted = true; // Mark the entry as deleted
      }
    });
  });

function getSelectedRows() {
  const selectedRows = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const row = checkbox.closest('tr');
      // Exclude deleted rows from being selected
      if (!row.classList.contains('deleted')) {
        const id = Number(row.cells[1].textContent);
        const selectedRow = entries.find((entry) => entry.id === id);
        if (selectedRow) {
          selectedRows.push({
            id: selectedRow.id,
            name: selectedRow.name,
            phone: selectedRow.phone,
            email: selectedRow.email,
            hobbies: selectedRow.hobbies,
            rowElement: row
          });
        }
      }
    }
  });
  return selectedRows;
}

}
// Initial table display
displayTable();
