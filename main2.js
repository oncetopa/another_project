const boardTableBody = document.querySelector('#board-body');

const contentsContainer = document.querySelector('.contents__container');

const editorForm = document.querySelector('#editor-form');
const titleInput = document.querySelector('#editor-title-input');
const contentInput = document.querySelector('#editor-content-input');

const BOARDLIST_LS = 'boardLists';
const boardListsObj = [];
let nums = 0;
let author = 'David';
let date = new Date();
let views = Math.floor(Math.random() * 99) + 1;

function onTitleClick(e) {
contentsContainer.textContent = '';
const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
const index = e.target.parentNode.id.replace(/[a-z|-]/gi, '');

const contentsTitles = document.createElement('div');
contentsTitles.classList.add('contents__titles');

const contentsColumnFirst = document.createElement('div');
contentsColumnFirst.classList.add('contents__column');

const contentsTitle = document.createElement('div');
contentsTitle.classList.add('contents__title');
contentsTitle.textContent = lists[index].title;

// contents__titles > column >author, date, views
const contentsColumnSecond = document.createElement('div');
contentsColumnSecond.classList.add('contents__column');

const contentsAuthor = document.createElement('div');
contentsAuthor.classList.add('contents__author');
contentsAuthor.textContent = lists[index].author;

const contentsDate = document.createElement('div');
contentsDate.classList.add('contents__date');
contentsDate.textContent = lists[index].date;

const contentsViews = document.createElement('div');
contentsViews.classList.add('contents__views');
contentsViews.textContent = lists[index].views;

const contentsContent = document.createElement('div');
contentsContent.classList.add('contents__content');
contentsContent.textContent = lists[index].content;

contentsColumnFirst.appendChild(contentsTitle);

contentsColumnSecond.appendChild(contentsAuthor);
contentsColumnSecond.appendChild(contentsDate);
contentsColumnSecond.appendChild(contentsViews);

contentsTitles.appendChild(contentsColumnFirst);
contentsTitles.appendChild(contentsColumnSecond);

contentsContainer.appendChild(contentsTitles);
contentsContainer.appendChild(contentsContent);
}

function assignIndex() {
const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
if (!lists) {
nums = 0;
} else {
nums = parseInt(lists[lists.length - 1].num) + 1;
}
}

function onEditorFormSubmit(e) {
e.preventDefault();

const title = titleInput.value;
const content = contentInput.value;

const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
if (!lists) {
const objArr = [];
objArr.push({
num: `${nums++}`,
title: `${title}`,
author: `${author}`,
date: `${date.getFullYear()}.${date.getMonth() +
1}.${date.getDate()}.`,
views: `${views++}`,
content: `${content}`
});

localStorage.setItem(BOARDLIST_LS, JSON.stringify(objArr));
} else {
lists.push({
num: `${nums++}`,
title: `${title}`,
author: `${author}`,
date: `${date.getFullYear()}.${date.getMonth() +
1}.${date.getDate()}.`,
views: `${views++}`,
content: `${content}`
});

localStorage.setItem(BOARDLIST_LS, JSON.stringify(lists));
}

titleInput.value = '';
contentInput.value = '';
titleInput.focus();
window.location.reload();
}

function showBoardLists() {
const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));

lists.forEach((list, index) => {
if (index < 5) {
const tr = document.createElement('tr');
tr.classList.add('board__content');

const tdNum = document.createElement('td');
tdNum.classList.add('board__content-column');
tdNum.textContent = list.num;

const aTitle = document.createElement('a');
aTitle.href = '#';
aTitle.id = `link-to-content${index}`;

const tdTitle = document.createElement('td');
tdTitle.classList.add('board__content-column');
tdTitle.textContent = list.title;

aTitle.appendChild(tdTitle);

const tdAuthor = document.createElement('td');
tdAuthor.classList.add('board__content-column');
tdAuthor.textContent = list.author;

const tdDate = document.createElement('td');
tdDate.classList.add('board__content-column');
tdDate.textContent = list.date;

const tdViews = document.createElement('td');
tdViews.classList.add('board__content-column');
tdViews.textContent = list.views;

tr.appendChild(tdNum);
tr.appendChild(aTitle);
tr.appendChild(tdAuthor);
tr.appendChild(tdDate);
tr.appendChild(tdViews);

boardTableBody.appendChild(tr);
const linkToContent = document.querySelector(
`#link-to-content${index}`
);
linkToContent.addEventListener('click', onTitleClick);
} else if (index === 5) {
const boardIndexMax = Math.ceil(lists.length / 5);
for (let i = 0; i < boardIndexMax; i++) {
const indexContainer = document.querySelector('#index-container');

const aIndex = document.createElement('a');
aIndex.classList.add('board__index-link');

const spanIndexText = document.createElement('span');
spanIndexText.classList.add('board__index');
spanIndexText.textContent = i + 1;

aIndex.appendChild(spanIndexText);
indexContainer.appendChild(aIndex);

aIndex.addEventListener('click', () => {
showBoardListsNewPage(i);
});
}
}
});
}

function showBoardListsNewPage(pageIndex) {
boardTableBody.textContent = '';
const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
const limitPage = pageIndex * 5;

lists.forEach((list, index) => {
if (index >= limitPage && index < limitPage + 5) {
const tr = document.createElement('tr');
tr.classList.add('board__content');

const tdNum = document.createElement('td');
tdNum.classList.add('board__content-column');
tdNum.textContent = list.num;

const aTitle = document.createElement('a');
aTitle.href = '#';
aTitle.id = `link-to-content${index}`;

const tdTitle = document.createElement('td');
tdTitle.classList.add('board__content-column');
tdTitle.textContent = list.title;

aTitle.appendChild(tdTitle);

const tdAuthor = document.createElement('td');
tdAuthor.classList.add('board__content-column');
tdAuthor.textContent = list.author;

const tdDate = document.createElement('td');
tdDate.classList.add('board__content-column');
tdDate.textContent = list.date;

const tdViews = document.createElement('td');
tdViews.classList.add('board__content-column');
tdViews.textContent = list.views;

tr.appendChild(tdNum);
tr.appendChild(aTitle);
tr.appendChild(tdAuthor);
tr.appendChild(tdDate);
tr.appendChild(tdViews);

boardTableBody.appendChild(tr);
const linkToContent = document.querySelector(
`#link-to-content${index}`
);
linkToContent.addEventListener('click', onTitleClick);
}
});
}

editorForm.addEventListener('submit', onEditorFormSubmit);

if (boardTableBody) {
assignIndex();
showBoardLists();
}
