const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        health: [
            "Ensure annual veterinary check-ups.",
            "Vaccinate your cat on schedule.",
            "Provide regular flea treatments."
        ],
        behavior: [
            "Use scratching posts to prevent furniture damage.",
            "Play with your cat daily to reduce stress.",
            "Respect your cat’s personal space."
        ],
        nutrition: [
            "Feed age-appropriate cat food.",
            "Ensure constant access to fresh water.",
            "Avoid feeding your cat chocolate, onions, or garlic."
        ]
    });
});

module.exports = router;