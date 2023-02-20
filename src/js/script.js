('use strict');
//const selected = dataSource.books;

const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    container: '.books-list',
  },
  image: {
    imageWrapper: '.books-list .book__image',
    bookImage: '.book__image',
  },
  filter: {
    filterForm: '.filters',
  },
  rating: {
    bookRating: 'book__rating',
    bookRatingFill: 'book__rating__fill',
  },
  classNames: {
    favoriteBook: 'favorite',
    hiddenBook: 'hidden',
  },
};
const templates = {
  books: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];

    thisBooksList.initData();
    thisBooksList.renderInList();
    thisBooksList.initActions();
  }
  initData() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books; //отримуємо дані
  }
  determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
  renderInList() {
    const thisBooksList = this;

    for (const book of thisBooksList.data) {
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      const ratingWidth = (book.rating / 10) * 100;

      book.ratingBgc = ratingBgc;

      book.ratingWidth = ratingWidth;

      const generatedHTML = templates.books(book);

      /* create element using utils.createElementFromHTML(створити  елемент за допомогою utils.createElementFromHTML)*/
      const generatedDOMElement = utils.createDOMFromHTML(generatedHTML);

      /* find menu container (знайти контейнер )*/
      const bookContainer = document.querySelector(
        select.containerOf.container
      );

      /* add element to menu (додати елемент до меню)*/
      bookContainer.appendChild(generatedDOMElement);
    }
  }
  initActions() {
    document
      .querySelector(select.containerOf.container)
      .addEventListener('dblclick', (event) => {
        const bookImage = event.target.closest(select.image.bookImage);
        if (bookImage) {
          bookImage.classList.toggle(select.classNames.favoriteBook);
          const bookId = bookImage.dataset.id;
          if (!this.favoriteBooks.includes(bookId)) {
            this.favoriteBooks.push(bookId);
          } else {
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });
    document
      .querySelector(select.containerOf.container)
      .addEventListener('click', (event) => event.preventDefault());
    document
      .querySelector(select.filter.filterForm)
      .addEventListener('input', (event) => this.filterBooks(event));
  }

  filterBooks(event) {
    if (event.target.checked && !this.filters.includes(event.target.value)) {
      this.filters.push(event.target.value);
    }
    if (!event.target.checked && this.filters.includes(event.target.value)) {
      this.filters.splice(this.filters.indexOf(event.target.value), 1);
    }

    for (const book of dataSource.books) {
      const isFiltered = this.filters.every((filter) => book.details[filter]);
      const bookEl = document.querySelector(
        `${select.image.bookImage}[data-id="${book.id}"]`
      );
      if (isFiltered) {
        bookEl.classList.remove(select.classNames.hiddenBook);
      } else {
        bookEl.classList.add(select.classNames.hiddenBook);
      }
    }
  }
}

new BooksList();
