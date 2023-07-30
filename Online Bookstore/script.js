const API_BASE_URL = 'https://openlibrary.org';
const SEARCH_ENDPOINT = '/search.json?q=';
const BOOKS_PER_PAGE = 10;
let currentBooks = [];
let currentPage = 1;
let totalBooks = 0;
let totalPages = 0;

// Function to search for books using the Open Library API with pagination
async function searchBooks() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();

  if (query === '') {
    alert('Please enter a search query!');
    return;
  }

  try {
    const response = await fetch(API_BASE_URL + SEARCH_ENDPOINT + query);
    const data = await response.json();

    currentBooks = data.docs;
    totalBooks = currentBooks.length;
    totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

    if (currentBooks.length === 0) {
      alert('No books found for the given query.');
      return;
    }

    displayBooksOnPage(currentPage);
    updatePagination();
  } catch (error) {
    console.error('Error fetching book data:', error);
    alert('An error occurred while fetching book data. Please try again later!');
  }
}

// Function to display books on the current page
function displayBooksOnPage(page) {
  const bookListDiv = document.getElementById('bookList');
  bookListDiv.innerHTML = '';

  const startIndex = (page - 1) * BOOKS_PER_PAGE;
  const endIndex = Math.min(startIndex + BOOKS_PER_PAGE, totalBooks);

  for (let i = startIndex; i < endIndex; i++) {
    const book = currentBooks[i];

    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.onclick = () => openModal(book);

    const title = document.createElement('h3');
    title.innerText = book.title;

    const authors = document.createElement('p');
    authors.innerText = `Author(s): ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;

    const description = document.createElement('p');
    description.innerText = book.subtitle || 'No description available.';

    const thumbnail = document.createElement('img');
    thumbnail.src = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    thumbnail.alt = 'Book Thumbnail';

    bookItem.appendChild(title);
    bookItem.appendChild(authors);
    bookItem.appendChild(description);
    bookItem.appendChild(thumbnail);

    bookListDiv.appendChild(bookItem);
  }
}

// Function to update pagination information
function updatePagination() {
  const currentPageSpan = document.getElementById('currentPage');
  currentPageSpan.innerText = `Page ${currentPage}`;
}

// Function to navigate to the previous page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayBooksOnPage(currentPage);
    updatePagination();
  }
}

// Function to navigate to the next page
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    displayBooksOnPage(currentPage);
    updatePagination();
  }
}

// Function to open the book detail modal
function openModal(book) {
  const modalTitle = document.getElementById('modalTitle');
  const modalAuthors = document.getElementById('modalAuthors');
  const modalDescription = document.getElementById('modalDescription');
  const modalBuyLink = document.getElementById('modalBuyLink');

  modalTitle.innerText = book.title;
  modalAuthors.innerText = `Author(s): ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
  modalDescription.innerText = book.subtitle || 'No description available.';
  modalBuyLink.href = `https://openlibrary.org/works/${book.key}`;
  modalBuyLink.textContent = 'View on Open Library';

  const modal = document.getElementById('bookDetailModal');
  modal.style.display = 'block';
}

// Function to close the book detail modal
function closeModal() {
  const modal = document.getElementById('bookDetailModal');
  modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('bookDetailModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
