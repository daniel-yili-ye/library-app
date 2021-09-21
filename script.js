const newBook = document.getElementById("newBook")
const modal = document.getElementById("modal")
const span = document.querySelector("span[class='close']")
const submit = document.getElementById("submit")
const cardHolder = document.querySelector("div[class='card-holder']")

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

class Library {
  constructor() {
    this.books = []
  }
  
  addBook(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead)
    this.books.push(book)
  }

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
  }

  isBookInBooks(title) {
    return this.books.some((book) => book.title === title)
  }
}

const library = new Library()
library.addBook("Bible", "God", 1000, true)
library.addBook("The Hobbit", "Tolkien", 965, true)
library.addBook("Heat Shock Proteins", "Joe Rogan", 203, false)
library.addBook("Metaphysics of Pepe", "Jordan Peterson", 9030, false)
library.addBook("OK BOOMER", "TikTok", 90, true)

function displayBooks() {
  resetBooks()
  for (let book of library.books) {
    createCard(book)
  }
}

function resetBooks() {
  cardHolder.innerHTML = ""
}

function createCard(book) {
  const card = document.createElement("div")
  const title = document.createElement("h2")
  const author = document.createElement("p")
  const pages = document.createElement("p")
  const isRead = document.createElement("button")
  const remove = document.createElement("button")
  
  card.classList.add('card')
  isRead.classList.add('read')
  remove.classList.add('remove')
  
  title.innerText = book.title
  author.innerText = book.author
  pages.innerText = book.pages + " pages"
  isRead.innerText = book.isRead ? "Read" : "Not Read"
  remove.innerText = "Remove"

  isRead.onclick = toggleIsRead
  remove.onclick = removeCard
  
  card.append(title)
  card.append(author)
  card.append(pages)
  card.append(isRead)
  card.append(remove)
  cardHolder.append(card)
}

function toggleIsRead(event) {
  event.target.innerText = (event.target.innerText === "Read") ? "Not Read" : "Read"
  const title = event.target.parentNode.firstChild.innerText
  const book = library.getBook(title)
  book.isRead = !book.isRead
}

function removeCard(event) {
  const title = event.target.parentNode.firstChild.innerText
  library.removeBook(title)
  event.target.parentNode.remove()
}

// popup to add another book
newBook.onclick = () => modal.style.display = "block"

// When the user clicks on <span> (x), close the modal
span.onclick = () => modal.style.display = "none"

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

submit.onclick = (event) => {
  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const status = document.getElementById("isRead")
  const isRead = (status.options[status.selectedIndex].innerText === "Read") ? true : false
  
  console.log(title)
  console.log(author)
  console.log(pages)
  console.log(status)
  console.log(isRead)

  if (library.isBookInBooks(title)) {
    // return error message
  }
  else {
    library.addBook(title, author, pages, isRead)
  }
  
  displayBooks()
  span.click()
  // clear data from fields
  // store data
}

displayBooks()