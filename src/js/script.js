('use strict');
const selected = dataSource.books;

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

    //thisBooksList.getElements();
    thisBooksList.initData();
    thisBooksList.renderInList();
    thisBooksList.initActions();
    thisBooksList.determineRatingBgc();
  }
  initData() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
  }
  determineRatingBgc(rating) {
    const thisBooksList = this;
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
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

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
    const thisBooksList = this;
    /*Додайте функцію initActions*/
    const listBooksAndImages = document.querySelectorAll(
      select.image.imageWrapper
    ); //Підготуйте референціі на список усіх елементів .book__image у .booksList.
    console.log('listBooksAndImages', listBooksAndImages);

    for (const listBookAndImage of listBooksAndImages) {
      //Підготуйте референціі на список усіх елементів .book__image у .booksList.
      listBookAndImage.addEventListener('dblclick', (e) => {
        e.preventDefault();
        listBookAndImage.classList.toggle('favorite');
        if (!favoriteBooks.listBookAndImage) {
          favoriteBooks.push(listBookAndImage);
        }
        if (favoriteBooks.listBookAndImage) {
          favoriteBooks.remove(listBookAndImage);
        }
        //task 4
        if (e.target.offsetParent.classList.contains('.book__image')) {
          e.target.offsetParent.classList.add('favorite');
          /* якщо натиснутий елемент містить його classList клас book__image (classList.contains ('book__image'), 
        то додаємо до натиснутого елементу 'favorite' */
          //const bookId = document.getElementsByName(dataSource.books.id);
          const bookId = listBookAndImage.dataset.id;
          console.log('bookId', bookId);
          favoriteBooks.push(bookId); /* додаємо id в масив */
        }
        if (e.target.offsetParent.classList.contains('.active')) {
          /* перевіряємо, чи натиснутий елемент має клас active і якщо він є, то видаляємо з клікнутого елементу атрибут і клас favorite*/
          //const bookId = document.getElementsByName(dataSource.books.id);
          const bookId = listBookAndImage.dataset.id;
          favoriteBooks.removeAttribute(bookId);
          e.target.offsetParent.classList.remove('favorite');
        }
      });
    }

    const filtersForm = document.querySelector('.filters');
    console.log('filtersForm', filtersForm);

    filtersForm.addEventListener('click', function (event) {
      if (event.target.checked) {
        filters.push(event.target.value);
        console.log(event.target.value);
      } else {
        filters.splice(event.target.value);
      }
      filterBooks();
    });
  }

  filterBooks() {
    const thisBooksList = this;
    const books = selected;

    for (let book of books) {
      let shouldBeHidden = false;
      const filterBook = document.querySelector(
        '.book__image[data-id="' + book.id + '"]'
      );

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        filterBook.classList.add('hidden');
      } else {
        filterBook.classList.remove('hidden');
      }
    }
  }
}

new BooksList();
