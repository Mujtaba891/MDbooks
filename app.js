document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
  setupSearch();
});

let currentPdf = null;
let pdfDoc = null, pageNum = 1, pageCount = 0;

async function loadBooks() {
  const response = await fetch("books.json");
  const books = await response.json();
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = books.map(book => `
    <div class="book" >
      <img src="${book.cover}" alt="${book.title}" {
        constructor() {
          this.prop = ""
        }
      }>
      <h3>${book.title}</h3>
      <p1>Author: ${book.author}</p1>
      <p>Category: ${book.category}</p>
      <button onclick="downloadFile('${book.pdf}')">Download</button>
    </div>
  `).join("");
}

function setupSearch() {
  document.getElementById("searchBar").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const books = document.querySelectorAll(".book");
    books.forEach(book => {
      const title = book.querySelector("h3").innerText.toLowerCase();
      book.style.display = title.includes(term) ? "block" : "none";
    });
  });
}

function downloadFile(url) {
  window.open(url, "_blank");
}

function showRequestPage() {
  switchPage("requestPage");
}

function sendRequest(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  console.log("Sending email with data:", data);
  alert("Request sent successfully!");
  switchPage("homePage");
}

document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
  setupSearch();
  loadCategories();
});

async function loadBooks(category = null) {
  const response = await fetch("books.json");
  const books = await response.json();
  const bookList = document.getElementById("bookList");

  // Filter books by category if a category is selected
  const filteredBooks = category && category !== "All" ? books.filter(book => book.category === category) : books;

  bookList.innerHTML = filteredBooks.map(book => `
    <div class="book">
      <img src="${book.cover}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Category: ${book.category}</p>
      <button onclick="openBook(${book.id}, '${book.pdf}')">View</button>
      <button onclick="downloadFile('${book.pdf}')">Download</button>
    </div>
  `).join("");
}

async function loadCategories() {
  const response = await fetch("books.json");
  const books = await response.json();

  // Extract unique categories from the books and prepend "All" to the list
  const categories = ["All", ...new Set(books.map(book => book.category))];

  // Render category buttons in the category container
  const categoryContainer = document.getElementById("categoryContainer");
  categoryContainer.innerHTML = categories.map(category => `
    <div class="category" onclick="filterBooksByCategory('${category}')">${category}</div>
  `).join("");
}

function filterBooksByCategory(category) {
  loadBooks(category);
}