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
const b4 = new Book("Metaphysics of Pepe", "Jordan Peterson", 9030, false)
const b5 = new Book("OK BOOMER", "TikTok", 90, true)

addBookToLibrary(b1)
addBookToLibrary(b2)
addBookToLibrary(b3)
addBookToLibrary(b4)
addBookToLibrary(b5)


function displayBooks() {
  for (let i=0; i<myLibrary.length; i++) {
    let card = document.createElement("div")
    card.classList.add('card')
    // give DOM id that relates to card index

    let title = document.createElement("h2")
    title.innerText = myLibrary[i].title
    card.append(title)

    let author = document.createElement("p")
    author.innerText = myLibrary[i].author
    card.append(author)

    let pages = document.createElement("p")
    pages.innerText = myLibrary[i].pages + " pages"
    card.append(pages)

    let read = document.createElement("button")
    read.innerText = myLibrary[i].read ? "Read" : "Not Read"
    card.append(read)

    let remove = document.createElement("button")
    remove.innerText = "Remove"
    card.append(remove)
    
    cardHolder.append(card)
  }
}

displayBooks()