const API_URL = '/api/cats';

// Fetch and display cats
async function fetchCats() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const breedFilter = document.getElementById('filter-breed').value;
    const ageFilter = document.getElementById('filter-age').value;

    try {
        const response = await fetch(API_URL);
        const cats = await response.json();

        // Apply search and filter logic
        const filteredCats = cats.filter(cat => {
            const matchesSearch = cat.name.toLowerCase().includes(searchValue) || cat.breed.toLowerCase().includes(searchValue);
            const matchesBreed = !breedFilter || cat.breed === breedFilter;
            const matchesAge = !ageFilter || (
                (ageFilter === 'young' && cat.age < 2) ||
                (ageFilter === 'adult' && cat.age >= 2 && cat.age <= 5) ||
                (ageFilter === 'senior' && cat.age > 5)
            );

            return matchesSearch && matchesBreed && matchesAge;
        });

        displayCats(filteredCats);
    } catch (error) {
        console.error('Error fetching cats:', error);
    }
}

// Display cats
function displayCats(cats) {
    const catList = document.getElementById('cat-list');
    catList.innerHTML = ''; // Clear previous content

    if (cats.length === 0) {
        catList.innerHTML = '<p>No cats found.</p>';
        return;
    }

    cats.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.classList.add('cat-card');
        catCard.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" style="width:150px;">
            <h3>${cat.name}</h3>
            <p>Breed: ${cat.breed}</p>
            <p>Age: ${cat.age} years</p>
            <p>${cat.description}</p>
            <button onclick="selectCat('${cat.name}')">Adopt Me</button>
            <button onclick="toggleFavorite('${cat._id}', this)">
                ${cat.favorited ? 'Unfavorite' : 'Favorite'}
            </button>
        `;
        catList.appendChild(catCard);
    });
}

// Toggle favorite status
async function toggleFavorite(id, button) {
    try {
        await fetch(`${API_URL}/${id}/favorite`, { method: 'PUT' });
        button.innerText = button.innerText === 'Favorite' ? 'Unfavorite' : 'Favorite';
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Select a cat for adoption
function selectCat(catName) {
    document.getElementById('selected-cat').value = catName;
}

// Handle adoption form submission
document.getElementById('adoption-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const applicantName = document.getElementById('applicant-name').value;
    const applicantEmail = document.getElementById('applicant-email').value;
    const selectedCat = document.getElementById('selected-cat').value;

    if (!selectedCat) {
        alert('Please select a cat first.');
        return;
    }

    console.log('Adoption Application Submitted:', {
        applicantName,
        applicantEmail,
        selectedCat
    });

    alert(`Application submitted for ${selectedCat}. Thank you, ${applicantName}!`);
    e.target.reset();
});

// Load cats on page load
window.onload = fetchCats;