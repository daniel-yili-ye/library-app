const modal = document.getElementById("modal")
const span = document.querySelector("span[class='close']")
const submit = document.getElementById("submit")
const cardHolder = document.querySelector("div[class='card-holder']")
const titleBox = document.querySelector("input[id='title']")
const newNavButton = document.querySelector("button[class='headerBtn']")

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
    saveToStorage()
  }

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
    saveToStorage()
  }

  isBookInBooks(title) {
    return this.books.some((book) => book.title === title)
  }
}

const library = new Library()
// library.addBook("Bible", "God", 1000, true)
// library.addBook("The Hobbit", "Tolkien", 965, true)
// library.addBook("Heat Shock Proteins", "Joe Rogan", 203, false)
// library.addBook("Metaphysics of Pepe", "Jordan Peterson", 9030, false)
// library.addBook("OK BOOMER", "TikTok", 90, true)

function displayBooks() {
  checkStorage()
  resetBooks()
  for (let book of library.books) {
    createCard(book)
  }
}

function resetBooks() {
  cardHolder.innerHTML = ""
  const card = document.createElement("button")
  card.innerHTML = "+ New"
  // card.classList.add('card')
  card.setAttribute('id','newBook')
  cardHolder.append(card)
  const newBook = document.getElementById("newBook")
  // popup to add another book
  newBook.onclick = () => modal.style.display = "block"
}

function createCard(book) {
  const card = document.createElement("div")
  const title = document.createElement("h2")
  const author = document.createElement("p")
  const pages = document.createElement("p")
  const isRead = document.createElement("button")
  const remove = document.createElement("button")
  
  card.classList.add('card')
  book.isRead ? isRead.classList.add('read') : isRead.classList.add('not-read')
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
  if (event.target.innerText === "Read") {
    event.target.classList.remove("read")
    event.target.classList.add("not-read")
    event.target.innerText = "Not Read"
  }
  else {
    event.target.classList.remove("not-read")
    event.target.classList.add("read")
    event.target.innerText = "Read"
  }
  
  const title = event.target.parentNode.firstChild.innerText
  const book = library.getBook(title)
  book.isRead = !book.isRead
  saveToStorage()
}

function removeCard(event) {
  const title = event.target.parentNode.firstChild.innerText
  library.removeBook(title)
  event.target.parentNode.remove()
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => modal.style.display = "none"

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

submit.onclick = () => {
  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const status = document.getElementById("isRead")
  const isRead = (status.options[status.selectedIndex].innerText === "Read") ? true : false

  if (library.isBookInBooks(title)) {
    const titleDiv = document.querySelector("div[class='inline']")
    const errorMessage = document.createElement("p")
    errorMessage.innerText = "Please provide a unique title."
    errorMessage.classList.add("errorMessage")
    titleDiv.parentNode.insertBefore(errorMessage, titleDiv.nextSibling)
    titleBox.classList.add("titleStyle")
  }
  else {
    library.addBook(title, author, pages, isRead)
    displayBooks()
    span.click()
    // store data
  }
  
  // clear data from fields
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("pages").value = ""
  status.options[status.selectedIndex].innerText = "Read"
}

titleBox.onclick = () => {
  try {
    // remove errorMessage element
    document.querySelector("p[class='errorMessage']").remove()
    // remove titleStyle class on title textbox
    document.querySelector("input[id='title']").classList.remove("titleStyle")
  }
  catch {
    return
  }
}

newNavButton.onclick = () => modal.style.display = "block"

function saveToStorage() {
  for (let i=0; i<library.books.length; i++) {
    localStorage.setItem(library.books[i].title, `{${library.books[i].author}, ${library.books[i].pages}, ${library.books[i].isRead}}`)
  }
}

function checkStorage() {
  for (let i=0; i<sessionStorage.length; i++) {
    let a = sessionStorage.key(i)
    let b = sessionStorage.getItem(a)
    console.log(b)
  }
  localStorage.getItem()
}

displayBooks()