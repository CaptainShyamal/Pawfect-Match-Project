document.addEventListener("DOMContentLoaded", () => {
  const sellerBtn = document.getElementById("sellerBtn");
  const buyerBtn = document.getElementById("buyerBtn");

  // Redirect to the seller page
  sellerBtn.addEventListener("click", () => {
      window.location.href = "../seller/seller.html"; // Ensure this path is correct
  });

  // Redirect to the buyer page
  buyerBtn.addEventListener("click", () => {
      window.location.href = "../buyer/buyer.html"; // Ensure this path is correct
  });
});
