
const parent_main = document.querySelector("#main");
const addCardBtn = document.querySelector("#addCard");

let theElementRaised = null;



const addTask = (event) => {
    event.preventDefault();

   
    const currentForm = event.target;
    const myInput = currentForm.elements[0]; 
    let inputValue = currentForm.elements[0].value; 
    const parentElement = currentForm.parentElement; 

    if (!inputValue) {
        myInput.className = "addTask1";
    } else {
        myInput.className = "addTask"; 
        const paragraph_Element = createElementParagraph(inputValue); 

        parentElement.insertBefore(paragraph_Element, currentForm); 

        currentForm.reset(); 

        const h5Value = parentElement.children[0].innerText; 

        if (!Array.isArray(UserSaveTasks[h5Value])) {
            UserSaveTasks[h5Value] = []; 
        }

        UserSaveTasks[h5Value].push(inputValue);
        localStorage.setItem("savedTasks", JSON.stringify(UserSaveTasks)); 
    }
}



const createCard = (cardsTitle) => {


    const myDiv = document.createElement("div")
    myDiv.setAttribute("class", "column");
   

    const h6 = document.createElement("h6");
    h6.setAttribute("class", "columnTitle");
    const h6Text = document.createTextNode(cardsTitle);

    const XMarkIcon = document.createElement("i");
    XMarkIcon.classList.add("fa-solid");
    XMarkIcon.classList.add("fa-xmark");
    XMarkIcon.classList.add("removeCard")

    const myForm = document.createElement("form");

    const myInput = document.createElement("input");
    myInput.setAttribute("type", "text");
    myInput.setAttribute("placeholder", "add task");
    myInput.setAttribute("class", "addTask");

    const myPara = document.createElement("p");

    h6.appendChild(h6Text);
    h6.appendChild(XMarkIcon);
    myDiv.appendChild(h6);
    myForm.appendChild(myInput);
    myDiv.appendChild(myForm);

    myForm.addEventListener("submit", addTask);

    myDiv.addEventListener("dragleave", (event) => event.preventDefault());

    myDiv.addEventListener("dragover", (event) => event.preventDefault());

    myDiv.addEventListener("drop", (event) => {
        let DropTicketInColumn = event.target; 

        const condition1 = DropTicketInColumn.className.includes("column");
        const condition2 = DropTicketInColumn.className.includes("columnTitle");
        const condition3 = DropTicketInColumn.className.includes("taskTicket");
        const condition4 = DropTicketInColumn.className.includes("addTask");

        if (condition1) {
            DropTicketInColumn.insertBefore(theElementRaised, myForm);
            console.log('column', DropTicketInColumn);
        }
        if (condition2) {
            DropTicketInColumn.insertBefore(theElementRaised, myForm);
        }
        if (condition3) {
            DropTicketInColumn.parentElement.insertBefore(theElementRaised, myForm);
        }
        if (condition4) {
            DropTicketInColumn.parentElement.parentElement.insertBefore(theElementRaised, DropTicketInColumn.lastElementChild);
            console.log('condition4', condition4);
        }
    })

    return myDiv;

}

const createElementParagraph = (inputValue) => {
    const paragraph_Element = document.createElement("p");
    paragraph_Element.setAttribute("class", "taskTicket")
    const paragraph_Text = document.createTextNode(inputValue);
    paragraph_Element.appendChild(paragraph_Text);
    paragraph_Element.setAttribute("draggable", "true")

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid');
    trashIcon.classList.add("fa-trash");
    trashIcon.classList.add('remove_Element');
    paragraph_Element.appendChild(trashIcon);

    paragraph_Element.addEventListener("mousedown", (event) => {
        theElementRaised = event.target; 
        console.log('theElementRaised', theElementRaised);
        
    })

    return paragraph_Element;
}



let UserSaveTasks = JSON.parse(localStorage.getItem("savedTasks")); 

if (!UserSaveTasks) {
    UserSaveTasks = {}; 
}


for (const myKey in UserSaveTasks) { 

    const card_div = createCard(myKey); 
    const arrayOfTask = UserSaveTasks[myKey]; 

    for (let i = 0; i < arrayOfTask.length; i++) {
        const p = createElementParagraph(arrayOfTask[i]); 
        card_div.insertBefore(p, card_div.lastElementChild) 
    }

    main.insertBefore(card_div, addCardBtn); 
}

addCardBtn.addEventListener("click", () => {  
    const cardTitle = prompt("Enter Your Card Name"); 
    if (!cardTitle) return; 
    const yourDiv = createCard(cardTitle); 

    main.insertBefore(yourDiv, addCardBtn) 
})


const RemoveCard = document.querySelectorAll(".removeCard");
RemoveCard.forEach((cardRemove) => {
    cardRemove.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();
      
    })
})



const removeTask = document.querySelectorAll(".remove_Element");
removeTask.forEach((i) => {
    i.addEventListener("click", (event) => {
        event.target.parentElement.remove();
       
    })
})



