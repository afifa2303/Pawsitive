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
        alert('Failed to load cats. Please try again later.');
    }
}

// Display cats
function displayCats(cats) {
    const catList = document.getElementById('cat-list');
    catList.innerHTML = ''; 

    if (cats.length === 0) {
        catList.innerHTML = '<p>No cats found matching the criteria.</p>';
        return;
    }

    cats.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.classList.add('cat-card');

        catCard.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" style="width:150px; height:150px; object-fit:cover;">
            <h3>${cat.name}</h3>
            <p>Breed: ${cat.breed}</p>
            <p>Age: ${cat.age} years</p>
            <p>${cat.description}</p>
            <div class="button-container">
                <button onclick="selectCat('${cat.name}')">Adopt Me</button>
                <button onclick="toggleFavorite('${cat._id}', this)">
                    ${cat.favorited ? 'Unfavorite' : 'Favorite'}
                </button>
            </div>
        `;

        catList.appendChild(catCard);
    });
}

// Toggle favorite status
async function toggleFavorite(id, button) {
    try {
        const response = await fetch(`/api/cats/${id}/favorite`, { method: 'PUT' });
        const updatedCat = await response.json();

        button.innerText = updatedCat.favorited ? 'Unfavorite' : 'Favorite';
        alert(`${updatedCat.name} is now ${updatedCat.favorited ? 'favorited' : 'unfavorited'}!`);
    } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Failed to update favorite status. Please try again later.');
    }
}

// Fetch and display favorited cats in the modal
async function fetchFavorites() {
    try {
        const response = await fetch('/api/cats/favorites');
        const favorites = await response.json();

        const favoritesList = document.getElementById('favoritesList');
        favoritesList.innerHTML = ''; 

        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p>No favorite cats found.</p>';
        } else {
            favorites.forEach(cat => {
                const catCard = document.createElement('div');
                catCard.classList.add('cat-card');
                catCard.innerHTML = `
                    <img src="${cat.image}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p>Breed: ${cat.breed}</p>
                    <p>Age: ${cat.age} years</p>
                `;
                favoritesList.appendChild(catCard);
            });
        }

        openFavoritesModal(); 
    } catch (error) {
        console.error('Error fetching favorites:', error);
        alert('Failed to load favorite cats. Please try again later.');
    }
}

// Open the modal
function openFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    modal.style.display = 'block';
}

// Close the modal
function closeFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    modal.style.display = 'none';
}

// Select a cat for adoption
function selectCat(catName) {
    const selectedCatInput = document.getElementById('selected-cat');
    selectedCatInput.value = catName;

    const allCatCards = document.querySelectorAll('.cat-card');
    allCatCards.forEach(card => card.classList.remove('selected'));

    const catCard = Array.from(allCatCards).find(card => 
        card.querySelector('h3').textContent === catName
    );
    if (catCard) {
        catCard.classList.add('selected');
    }
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

    const application = {
        name: applicantName,
        email: applicantEmail,
        selectedCat
    };

    try {
        const response = await fetch('/api/adoptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(application)
        });

        if (response.ok) {
            alert(`Application for ${selectedCat} submitted successfully!`);
            e.target.reset();
        } else {
            alert('Failed to submit application.');
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        alert('An error occurred. Please try again later.');
    }
});


window.onload = fetchCats;