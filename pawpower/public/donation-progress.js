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