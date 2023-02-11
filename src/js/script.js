// TASK #1
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
};
const templates = {
  books: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

function renderInList() {
  for (const book of selected) {
    /* generate HTML based on template (генерувати HTML на основі шаблона)*/
    const generatedHTML = templates.books(book);

    /* create element using utils.createElementFromHTML(створити  елемент за допомогою utils.createElementFromHTML)*/
    const generatedDOMElement = utils.createDOMFromHTML(generatedHTML);

    /* find menu container (знайти контейнер )*/
    const bookContainer = document.querySelector(select.containerOf.container);

    /* add element to menu (додати елемент до меню)*/
    bookContainer.appendChild(generatedDOMElement);
  }
}
renderInList();

const favoriteBooks = [];
console.log('favoriteBooks', favoriteBooks);
/*додавання нової порожньої favoriteBooks*/

function initActions() {
  /*Додайте функцію initActions*/
  const listBooksAndImages = document.querySelectorAll(
    select.image.imageWrapper
  ); //Підготуйте референціі на список усіх елементів .book__image у .booksList.
  console.log('listBooksAndImages', listBooksAndImages);

  for (const listBookAndImage of listBooksAndImages) {
    //Підготуйте референціі на список усіх елементів .book__image у .booksList.
    listBookAndImage.addEventListener('dblclick', (e) => {
      e.preventDefault();
      listBookAndImage.classList.toggle('favorite'); //adds favourite heart when clicked
      //Для кожного з них додайте прослуховувач, який, коли буде виявлений, запустить функцію, яка ...
      // зупинить поведінку браузера за замовчуванням (preventDefault),

      /*Task 3 перевіря, чи книга вже є у «вибраних». Якщо це не так, то функція повинна працювати, як і раніше, 
      тому додайте favorite і збережіть id книги favoriteBooks. Однак, якщо це так, сценарій повинен видалити 
      id книги з масиву favoriteBooks та видалити клас favorite*/

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
  const filters = [];
  console.log('filters', filters);

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

  //Task 4
  function filterBooks() {
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
initActions();
