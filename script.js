let myLibrary = [];

function Book(name, author, page_count) {
    this.name = name;
    this.author = author
    this.page_count = page_count
    this.read = false
}

const harryP = new Book('Harry Potter', "J.k Rowling", 600)
const dune = new Book('Dune', 'Dune Author')

function addBookToLibrary(book){
    myLibrary.push(book)
}

function displayLibrary(){
    const libSize = myLibrary.length
    console.log('Here is your current library:')
    for(let i=0; i<libSize; i++){
        console.log(myLibrary[i])
    }
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

addBookToLibrary(harryP)
addBookToLibrary(dune)

//displayLibrary()
//removeBook(dune)

harryP.isRead()
console.log(harryP.read)
console.log(dune.read)