document.getElementById('tips-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const breed = document.getElementById('breed').value;
    const tip = document.getElementById('tip').value;

    if (!breed || !tip) {
        alert('Please select a breed and provide your tip.');
        return;
    }

    try {
        const response = await fetch('/api/tips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ breed, tip })
        });

        if (response.ok) {
            const result = await response.json();
            alert('Thank you for your submission!');
            document.getElementById('tips-form').reset(); // Clear the form
        } else {
            alert('Failed to submit your tip. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting tip:', error);
        alert('An error occurred. Please try again.');
    }
});