const newBook = document.querySelector("button[id='new']")
const modal = document.getElementById("myModal")
const span = document.getElementsByClassName("close")[0]
const add = document.getElementById("add")
const cardHolder = document.querySelector("div[class='card-holder']")

addBookToLibrary("Bible", "God", 1000, true)
addBookToLibrary("The Hobbit", "Tolkien", 965, true)
addBookToLibrary("Heat Shock Proteins", "Joe Rogan", 203, false)
addBookToLibrary("Metaphysics of Pepe", "Jordan Peterson", 9030, false)
addBookToLibrary("OK BOOMER", "TikTok", 90, true)

displayBooks()
readBtnRefresh()
removeBtnRefresh()

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

class Library {
  constructor() {
    this.books = []
  }
  
  addBookToLibrary(book) {
    this.books.push(book)
  }
}

const library = new Library()

function displayBooks() {
  resetBooks()
  for (let book of library.books) {
    createCard(book)
  }
}

function createCard(book) {
  const card = document.createElement("div")
  const title = document.createElement("h2")
  const author = document.createElement("p")
  const pages = document.createElement("p")
  const read = document.createElement("button")
  const remove = document.createElement("button")
  
  card.classList.add('card')
  read.classList.add('read')
  remove.classList.add('remove')
  
  title.innerText = book.title
  author.innerText = book.author
  pages.innerText = book.pages + " pages"
  read.innerText = book.read ? "Read" : "Not Read"
  remove.innerText = "Remove"
  
  card.append(title)
  card.append(author)
  card.append(pages)
  card.append(read)
  card.append(remove)
  cardHolder.append(card)
}

// read/not read event listener
function readBtnRefresh() {
  let readBtn = document.querySelectorAll("button[class='read']")
  readBtn.forEach(b => {
    b.removeEventListener("click", )
    b.addEventListener("click", e => {
      // visual fix
      e.target.innerText = (e.target.innerText == "Read") ? "Not Read" : "Read"
      
      // update code to actually change the myLibrary array and have the displayBooks function run again
      // instead of using e.target.parentNode.id use the findIndex function
      myLibrary[e.target.parentNode.id].read = (myLibrary[e.target.parentNode.id].read == true) ? false : true
    }
  )})
}

// remove event listener
function removeBtnRefresh() {
  let removeBtn = document.querySelectorAll("button[class='remove']")
  removeBtn.forEach(b => b.addEventListener("click", e => {
    // update code to actually change the myLibrary array and have the displayBooks function run again
    myLibrary.splice(e.target.parentNode.id, 1)
    // visual fix
    e.target.parentNode.remove()
    resetIndex()
  }))
}

// popup to add another book
newBook.addEventListener("click", () => {
  // show popup w/ entry fields
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
  modal.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

// make function to find book index
function resetIndex() {
  let cards = document.querySelectorAll("div[class='card']")
  for (let i=0; i<cards.length; i++) {
    cards[i].id = i
  }
}

add.addEventListener("click", () => {
  // STICK THIS INTO A ADD BUTTON FUNCTION WITH AN EVENT LISTENER
  let t = document.getElementById("title").value
  let a = document.getElementById("author").value
  let p = document.getElementById("pages").value
  let r = (document.getElementById("read-notread").value) == "read" ? true : false

  // add book to library
  addBookToLibrary(t, a, p, r)
  // create card with id = myLibrary.length
  createCard(myLibrary.length - 1)
  // refresh the read button
  readBtnRefresh()
  // refresh the remove button
  removeBtnRefresh()
  // click out
  span.click()
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("pages").value = ""
  document.getElementById("read-notread").value = "read"
})

// TODO
// - fix remove button index bug => caused by applying multiple functions to each button
// - fix read/not read button not working sometimes