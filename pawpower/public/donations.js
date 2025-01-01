// Handle donation form submission
document.getElementById('donation-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const donorName = document.getElementById('donor-name').value;
    const amount = parseFloat(document.getElementById('donation-amount').value);
    const category = document.getElementById('category').value; // Get selected category
    const message = document.getElementById('donation-message').value;

    if (!donorName || isNaN(amount) || amount <= 0 || !category) {
        alert('Please fill in all required fields.');
        return;
    }

    const donationData = { donorName, amount, category, message };

    try {
        const response = await fetch('/api/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donationData),
        });

        if (response.ok) {
            alert('Thank you for your donation!');
            document.getElementById('donation-form').reset();
        } else {
            alert('Failed to submit donation.');
        }
    } catch (error) {
        console.error('Error submitting donation:', error);
    }
});

// Fetch and display donation progress
async function fetchDonationProgress() {
    const viewFilter = document.getElementById('view-filter').value;

    try {
        const response = await fetch(`/api/donations/progress?view=${viewFilter}`);
        const progressData = await response.json();

        const progressContainer = document.getElementById('progress-data');
        progressContainer.innerHTML = `<p>Total Donations (${viewFilter}): ${progressData.total} TK</p>`;
    } catch (error) {
        console.error('Error fetching donation progress:', error);
    }
}

// Listen for view filter changes
document.getElementById('view-filter').addEventListener('change', fetchDonationProgress);

// Load progress data on page load
window.onload = fetchDonationProgress;