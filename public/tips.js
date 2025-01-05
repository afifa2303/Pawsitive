// Function to filter tips by category
function filterTips() {
    const filter = document.getElementById("filterSelect").value;
    const healthSection = document.getElementById("healthTipsSection");
    const behavioralSection = document.getElementById("behavioralTipsSection");
    const nutritionalSection = document.getElementById("nutritionalTipsSection");

    // Show/Hide sections based on filter
    healthSection.style.display = filter === "all" || filter === "health" ? "block" : "none";
    behavioralSection.style.display = filter === "all" || filter === "behavioral" ? "block" : "none";
    nutritionalSection.style.display = filter === "all" || filter === "nutritional" ? "block" : "none";
}

// Function to search tips by keyword
function searchTips() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const tipsContainer = document.getElementById("tipsContainer");
    const sections = tipsContainer.querySelectorAll(".tips-section");

    // Loop through each section and tip to filter
    sections.forEach(section => {
        const tips = section.querySelectorAll("li");
        let matchFound = false;

        tips.forEach(tip => {
            if (tip.textContent.toLowerCase().includes(query)) {
                tip.style.display = "list-item";
                matchFound = true;
            } else {
                tip.style.display = "none";
            }
        });

        // Hide section if no tips match
        section.style.display = matchFound ? "block" : "none";
    });
}
