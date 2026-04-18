const form = document.getElementById("leadForm");
const tableBody = document.getElementById("tableBody");

// Fetch leads on load
window.onload = async () => {
  const res = await fetch("http://localhost:5000/leads");
  const data = await res.json();
  displayLeads(data);
};

// Display leads in table
function displayLeads(leads) {
  tableBody.innerHTML = "";

  leads.forEach((lead) => {
    const row = `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.source}</td>
        <td>${lead.date}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const source = document.getElementById("source").value;

  // Validation
  if (!name || !email || !phone || !source) {
    alert("All fields are required");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Invalid email");
    return;
  }

  if (phone.length !== 10) {
    alert("Phone must be 10 digits");
    return;
  }

  const newLead = {
    name,
    email,
    phone,
    source,
    date: new Date().toLocaleString(),
  };

  // Send to backend
  await fetch("http://localhost:5000/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLead),
  });

  // Refresh list
  const res = await fetch("http://localhost:5000/leads");
  const data = await res.json();
  displayLeads(data);

  form.reset();
});