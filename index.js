const taskContainer = document.querySelector(".task_container");

let globalStore = [];

const newCard = (taskData) => ` 
<div class="col-md-6 col-lg-4"  >
                    <div class="cards">
                        <div class="card-header d-flex justify-content-end gap-2">

                            <button type="button" class="btn btn-outline-success" 
                            id=${taskData.id} onClick="editCard.apply(this,arguments)">
                            <i class="fas fa-pen-square" id=${taskData.id} onClick="editCard.apply(this,arguments)"></i></button>

                            <button type="button" class="btn btn-outline-danger" 
                            id=${taskData.id} onClick="deleteCard.apply(this,arguments)">
                             <i class="fas fa-trash"  id=${taskData.id} onClick="deleteCard.apply(this,arguments)"></i></button>
                        </div>

                        <img src=${taskData.imageUrl} class="card-img-top" alt="TaskImage">
                        <div class="card-body">
                          <h5 class="card-title">${taskData.taskTitle}</h5>
                          <p class="card-text"> ${taskData.taskDescription} </p>
                          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                        </div>

                        <div class="card-footer">
                            <button type="button" id=${taskData.id}
                            class="btn btn-outline-primary float-end">Open Task</button> 
                        </div>
                      </div>
                </div>
                `;


  
 
const loadInitialCardData = () => {
    console.log("AAAAAAAAAAa")
    // localstorage to get taskmanager card  data 
    const getCardData = localStorage.getItem("tasky");


    // convertfrom string  to normal object 
    const {cards} = JSON.parse(getCardData);
    console.log(cards); 

    // loop over those array of task object to create html card,inject it to dom 
    cards.map((cardObject) => {
    const createNewCard=newCard(cardObject)
    taskContainer.insertAdjacentHTML("beforeend", createNewCard(cardObject));

    // update our global storage 
    globalStore.push(cardObject);
   
    })


};
//  loadInitialCardData();

const updateLocalStorage=() => 
{
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
}


const saveChanges = () => {
    const taskData = {
        id:`${Date.now()}`, //Unique  number for  id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    const createNewCard=newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(taskData);
    updateLocalStorage();    

};
   
const deleteCard = (event) => {
    //id 
    event = window.event;

    const targetID = event.target.id;
    const tagname = event.target.tagname;

    //match the id of element with id inside the globalstore 

    //if match forund remove
    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    updateLocalStorage();   
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

     


    //contacct parent 
    // taskContainer.removeChild(document.getElementById(targetID))    
    if (tagname === "BUTTON") {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode);
    }    
    
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
        );
    


};

const editCard = (event) => {

    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagname;

    
    let parentElement;

    if(tagname==="BUTTON")
    {
       parentElement = event.target.parentNode.parentNode; 
    }
    else 
    {
        parentElement = event.target.parentNode.parentNode.parentNode;
    }


    let taskTitle=parentElement.childNodes[5].childNodes[1];
    let taskDescription=parentElement.childNodes[5].childNodes[3];
    let taskType=parentElement.childNodes[5].childNodes[5];
    let submitButton=parentElement.childNodes[7].childNodes[1];
    
    //setAttributes
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");

    submitButton.setAttribute(
    "onClick",
    "saveEditchange.apply(this,arguments)"
    );
    submitButton.innerHTML="Save changes";


};

const saveEditchange = (event) => {

event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagname;
    let parentElement;
    if(tagname==="BUTTON")
    {
       parentElement = event.target.parentNode.parentNode; 
    }
    else 
    {
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle=parentElement.childNodes[5].childNodes[1];
    let taskDescription=parentElement.childNodes[5].childNodes[3];
    let taskType=parentElement.childNodes[5].childNodes[5];
    let submitButton=parentElement.childNodes[7].childNodes[1];

    const updatedData={
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType :taskType.innerHTML,
    };
    
    globalStore=globalStore.map((task) => {
        if(task.id===targetID)
        {
            return{
                id:task.id,
                imageUrl: task.imageUrl,
                taskTitle:updatedData.taskTitle ,
                taskType:updatedData.taskType,
                taskDescription:updatedData.taskDescription ,

            };
        }
        return task;  //Important 
    });
    updateLocalStorage();
};