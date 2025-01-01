document.getElementById('donation-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const donorName = document.getElementById('donor-name').value;
    const amount = parseFloat(document.getElementById('donation-amount').value);
    const category = document.getElementById('category').value; // Category
    const message = document.getElementById('donation-message').value;

    if (!donorName || isNaN(amount) || amount <= 0 || !category) {
        alert('Please fill in all required fields.');
        return;
    }

    const donationData = { donorName, amount, category, message };

    try {
        const response = await fetch('/api/donations', { // Ensure the endpoint matches
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