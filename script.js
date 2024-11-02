const dialog = document.querySelector('#form-dialog')
const showDialog = document.querySelector('#open')
const closeDialog = document.querySelector('#close')
const getName = document.querySelector('#name')
const getAuthor = document.querySelector('#author')
const getPageCount = document.querySelector('#page_count')
const form = document.querySelector('#book-form')
const removeConfirmation = document.querySelector('dialog#confirmation')
const yesButton = document.querySelector('#yes')
const noButton = document.querySelector('#no')
const confirmation = document.querySelector('.confirm-modal')
const confirmationMessage = document.createElement('span')
const confirmationButtons = document.querySelector('.confirmation-buttons')
const bookShelf = document.querySelector('.shelfspace')

let myLibrary = [];
let currentIndex = null 

function Book(name, author, page_count) {
    this.name = name;
    this.author = author
    this.page_count = page_count
    this.read = false
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

function displayLibrary(){
    const libSize = myLibrary.length
    console.log('Here is your current library:')
    bookShelf.innerHTML ="" //Replace this with preloading backend if implemented
    
    for(let i=0; i<libSize; i++){
        currentBook = myLibrary[i]
        //parent-book
        const book = document.createElement('div')
        book.setAttribute("class", "book")
        book.setAttribute("data-index-number", i)
        //child-book details
        const bookName = document.createElement('span')
        bookName.textContent = currentBook.name
        const bookAuthor = document.createElement('span')
        bookAuthor.textContent = currentBook.author
        const bookPageCount = document.createElement('span')
        bookPageCount.textContent = currentBook.page_count
        
        //remove button
        const remove = document.createElement('button')
        remove.textContent = 'Remove Book'
        remove.setAttribute("type", "button")
        remove.setAttribute("id", "remove")
        
        //isread
        const isReadForm = document.createElement('form')
        isReadForm.classList.add('isRead')
        const isReadButton = document.createElement('input')
        isReadButton.setAttribute("type", "checkbox")
        isReadButton.setAttribute("id", "isRead")
        if(currentBook.read === true){
            isReadButton.checked = true
        }else{
            isReadButton.checked = false
        }
        const buttonLabel = document.createElement('label')
        buttonLabel.setAttribute("for", "isRead")
        buttonLabel.textContent = "Read: "
        isReadForm.appendChild(buttonLabel)
        isReadForm.appendChild(isReadButton)
        
        //create and append book
        appendChildern(book, bookName, bookAuthor, bookPageCount)
        book.appendChild(isReadForm)
        bookShelf.appendChild(book)
        book.appendChild(remove)

        remove.addEventListener('click', () =>{  
            currentIndex = book.dataset.indexNumber  
            console.log(currentIndex)
            removeBookName = myLibrary[currentIndex].name
            console.log(removeBookName)
            confirmationMessage.classList.add('message')
            confirmationMessage.textContent = 'Are you sure you want to remove '+removeBookName+' ?'
            confirmation.insertBefore(confirmationMessage, confirmationButtons)    
            removeConfirmation.showModal()
        })
        
        isReadForm.addEventListener('click', () => {
            currentIndex = book.dataset.indexNumber
            let checkbox = isReadButton.checked
            //logic looks backwards cause default state is unchecked
            if(checkbox === true){
                checkbox = false
                myLibrary[currentIndex].isRead()
            } else{
                checkbox = true
                myLibrary[currentIndex].notRead()
            } 
        })

        }
    }


    function appendChildern(parent, child1, child2, child3){
        parent.appendChild(child1)
        parent.appendChild(child2)
        parent.appendChild(child3)
    }

    function appendIsReadButton(parent){
        const isReadForm = document.createElement('form')
        isReadForm.classList.add('isRead')
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

Book.prototype.isRead = function(){
    this.read = true
}
Book.prototype.notRead = function(){
    this.read = false
}



displayLibrary()
//Event Listeners
showDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () =>{
    dialog.close();
})

form.addEventListener('submit', () =>{
    let newBook = new Book(getName.value, getAuthor.value, getPageCount.value)
    addBookToLibrary(newBook)
    displayLibrary()
    form.reset()
    dialog.close()
})

confirmation.addEventListener('click', (event) => {
    let target = event.target
    switch(target.id){
        case 'yes':
            myLibrary.splice(currentIndex, 1)
            removeConfirmation.close()
            displayLibrary()
            break
        case 'no':
            removeConfirmation.close()
            break
        }
})

