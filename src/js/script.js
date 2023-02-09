('use strict');

const selectedBooks = dataSource.books;
console.log('select', selectedBooks);

const templateSourceBooks = document.querySelector('#template-book').innerHTML;
console.log('templateSourceBooks', templateSourceBooks);

const templateBooks = Handlebars.compile(templateSourceBooks);

const booksContainer = document.querySelector('.books-list');
console.log('booksContainer', booksContainer);

function renderInBooks() {
  for (const selectedBook of selectedBooks) {
    const generatedHTML = templateBooks(selectedBook);

    const bookHTML = utils.createDOMFromHTML(generatedHTML);
    booksContainer.appendChild(bookHTML);
  }
}
renderInBooks();

