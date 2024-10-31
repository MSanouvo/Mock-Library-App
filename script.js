const bookShelf = document.querySelector('.shelfspace')
let myLibrary = [];

function Book(name, author, page_count) {
    this.name = name;
    this.author = author
    this.page_count = page_count
    this.read = false
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

//example objects
const harryP = new Book('Harry Potter', "J.k Rowling", 600)
const dune = new Book('Dune', 'Dune Author')

addBookToLibrary(harryP)
addBookToLibrary(dune)



function displayLibrary(){
    const libSize = myLibrary.length
    console.log('Here is your current library:')
    for(let i=0; i<libSize; i++){
        currentBook = myLibrary[i]
        //parent-book
        const book = document.createElement('div')
        //child-book details
        const bookName = document.createElement('span')
        bookName.textContent = currentBook.name
        const bookAuthor = document.createElement('span')
        bookAuthor.textContent = currentBook.author
        const bookPageCount = document.createElement('span')
        bookPageCount.textContent = currentBook.page_count
        
        appendChildern(book, bookName, bookAuthor, bookPageCount)
        appendIsReadButton(book)
        book.setAttribute("class", "book")
        bookShelf.appendChild(book)
        //Works but vulnerable to HTML injection
        // book.innerHTML = ('<span>'+currentBook.name+'</span>'
        //     +'<span>'+currentBook.author+'</span>'
        //     +'<span>'+currentBook.page_count+'</span>'
        //)
        
    }
}
function appendChildern(parent, child1, child2, child3){
    parent.appendChild(child1)
    parent.appendChild(child2)
    parent.appendChild(child3)
}

function appendIsReadButton(parent){
    const isReadForm = document.createElement('form')
    
    const isReadButton = document.createElement('input')
    isReadButton.setAttribute("type", "checkbox")
    isReadButton.setAttribute("id", "isRead")
    
    const buttonLabel = document.createElement('label')
    buttonLabel.setAttribute("for", "isRead")
    buttonLabel.textContent = "Read: "

    isReadForm.appendChild(buttonLabel)
    isReadForm.appendChild(isReadButton)
    
    parent.appendChild(isReadForm)
}


function removeBook(book){
    myLibrary = myLibrary.filter((n) => n.name != book.name)
    console.log(myLibrary)
}

//Prototype example
Book.prototype.sayName = function(){
    console.log(this.name)
}
Book.prototype.isRead = function(){
    this.read = true
}



displayLibrary()
//removeBook(dune)
//Event Listeners
const dialog = document.querySelector('dialog')
const showDialog = document.querySelector('#open')
const closeDialog = document.querySelector('#close')

showDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () =>{
    dialog.close();
})


