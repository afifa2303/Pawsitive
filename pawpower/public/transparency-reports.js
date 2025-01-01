// Fetch and display transparency reports
async function fetchTransparencyReports() {
    try {
        const response = await fetch('/api/donations/categories'); // Fetch data from backend
        const reports = await response.json(); // Parse JSON response

        const listContainer = document.getElementById('transparency-list');
        listContainer.innerHTML = ''; // Clear existing content

        // Dynamically add each category and its total
        reports.forEach(report => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${report._id}</span>
                <span>${report.totalAmount} TK</span>
            `;
            listContainer.appendChild(listItem); // Add each report to the list
        });
    } catch (error) {
        console.error('Error fetching transparency reports:', error);
    }
}

// Load reports on page load
window.onload = fetchTransparencyReports;