const API_URL = '/api/resources';

async function fetchResources() {
    try {
        // Show loading indicator 
        const sections = ['health-tips', 'behavior-tips', 'nutrition-tips'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.innerHTML = '<p>Loading...</p>';
        });

        const response = await fetch(API_URL);
        const data = await response.json();

        // Populate health tips
        const healthTips = document.getElementById('health-tips');
        healthTips.innerHTML = ''; 
        data.health.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            healthTips.appendChild(li);
        });

        // Populate behavior tips
        const behaviorTips = document.getElementById('behavior-tips');
        behaviorTips.innerHTML = '';
        data.behavior.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            behaviorTips.appendChild(li);
        });

        // Populate nutrition tips
        const nutritionTips = document.getElementById('nutrition-tips');
        nutritionTips.innerHTML = '';
        data.nutrition.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            nutritionTips.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);

        
        const sections = ['health-tips', 'behavior-tips', 'nutrition-tips'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.innerHTML = '<p>Error loading tips. Please try again later.</p>';
        });
    }
}

fetchResources();