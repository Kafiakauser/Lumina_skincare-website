document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for contacting Lumina! We’ll get back to you soon.");
});

document.querySelectorAll(".product-card button").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Item added to cart! (Visual only)");
    });
});
// === Customer Reviews Feature ===
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

// Load existing reviews from localStorage
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
displayReviews();

reviewForm?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value.trim();

    if (!name || !rating || !comment) return;

    const newReview = { name, rating, comment };
    reviews.push(newReview);

    // Save to localStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Reset form
    reviewForm.reset();

    // Update display
    displayReviews();
});

function displayReviews() {
    reviewsList.innerHTML = "";

    if (reviews.length === 0) {
        reviewsList.innerHTML = "<p>No reviews yet. Be the first to share your experience!</p>";
        return;
    }

    reviews.forEach(r => {
        const div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = `
            <strong>${r.name}</strong> - ${"⭐".repeat(r.rating)}<br>
            <p>${r.comment}</p>
        `;
        reviewsList.appendChild(div);
    });
}
