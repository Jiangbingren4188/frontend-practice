// app.js
const form = document.querySelector('#add-form');
const nameInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#book-author');
const ratingInput = document.querySelector('#book-rating');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = [];

const render = () => {
  list.innerHTML = '';
  if (books.length === 0) {
    const li = document.createElement('li');
    li.textContent = '暂无图书';
    list.appendChild(li);
    return;
  }
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `《${book.name}》 作者：${book.author} 评分：${book.rating}分`;
    list.appendChild(li);
  });
};

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
  tip.textContent = '';
  form.reset();
  render();
});

render();
