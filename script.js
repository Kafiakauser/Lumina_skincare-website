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
// ===== Function to Update Cart Count =====
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}
// ===== Add to Cart in Shop Page =====
document.querySelectorAll(".product-card button").forEach(btn => {
    btn.addEventListener("click", () => {
        const productCard = btn.closest(".product-card");
        const name = productCard.querySelector("h3").textContent;
        const price = productCard.querySelector("p").textContent.replace("Rs.", "").trim();

        // Get existing cart or start new
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count immediately
        updateCartCount();

        // Feedback to user
        alert(`${name} added to cart!`);
    });
});

// Run count update on page load
updateCartCount();
