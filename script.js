let myLibrary = [];
let cardHolder = document.querySelector("div[class='card-holder']")

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(b) {
  myLibrary.push(b)
}

const b1 = new Book("Bible", "God", 1000, true)
const b2 = new Book("The Hobbit", "Tolkien", 965, true)
const b3 = new Book("Heat Shock Proteins", "Joe Rogan", 203, false)
addBookToLibrary(b1)
addBookToLibrary(b2)
addBookToLibrary(b3)

function displayBooks() {
  for (let i=0; i<myLibrary.length; i++) {
    let card = document.createElement("div")
    card.classList.add('card')

    let title = document.createElement("h2")
    title.innerText = myLibrary[i].title
    card.append(title)

    let author = document.createElement("p")
    author.innerText = myLibrary[i].author
    card.append(author)

    let pages = document.createElement("p")
    pages.innerText = myLibrary[i].pages
    card.append(pages)

    let read = document.createElement("p")
    read.innerText = myLibrary[i].read ? "Read" : "Not Read"
    card.append(read)
    
    cardHolder.append(card)
  }
}

displayBooks()