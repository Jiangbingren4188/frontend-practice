const form = document.querySelector('#add-form');
const nameInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#book-author');
const ratingInput = document.querySelector('#book-rating');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');
const filters = document.querySelector('.filters');

let books = JSON.parse(localStorage.getItem('books') || '[]');
let currentFilter = 'all';

const save = () => localStorage.setItem('books', JSON.stringify(books));

const render = () => {
  list.innerHTML = '';
  const shown = books.filter(b =>
    currentFilter === 'all' ? true :
    currentFilter === 'high' ? b.rating >= 8 : b.rating < 8
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的图书';
    list.appendChild(li);
    return;
  }
  shown.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `《${book.name}》 作者：${book.author} 评分：${book.rating}分`;
    const del = document.createElement('span');
    del.className = 'del';
    del.textContent = '删除';
    del.addEventListener('click', () => {
      books.splice(books.indexOf(book), 1);
      save();
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
};

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;
  render();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name === '') {
    tip.textContent = '书名不能为空';
    return;
  }
  books.push({
    name: name,
    author: authorInput.value.trim(),
    rating: Number(ratingInput.value)
  });
  save();
  tip.textContent = '';
  form.reset();
  render();
});

render();
