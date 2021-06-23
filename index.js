const taskContainer =document.querySelector(".task_container");

const globalStore = [];

const genrateNewCard =(taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id} >
                    <div class="card ">
                        <div class="card-header d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-outline-success"><i class="fas fa-pen-square"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                        </div>
                        <img src=${taskData.imageUrl} class="card-img-top" alt="TaskImage">
                        <div class="card-body">
                          <h5 class="card-title">${taskData.taskTitle}</h5>
                          <p class="card-text"> ${taskData.taskDescription} </p>
                          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                        </div>
                        <div class="card-footer">
                            <button type="button" 
                            class="btn btn-outline-primary float-end">Open Task</button> 
                        </div>
                      </div>

                </div>
                `;



const loadInitialCardData = () => {

// localstorage to get taskmanager card  data 
    const getCardData = localStorage.getItem("taskmanager");

// convertfrom string  to normal object 
    const {cards} =JSON.parse(getCardData);

// loop over those array of task object to create html card,inject it to dom 
       cards.map( (cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend",genrateNewCard(cardObject));

        // update our global storage 
        globalStore.push(cardObject);


       }) 
    

};




const saveChanges = () => {
    const taskData= {
        id:`${Date.now()}`, //Unique  number for  id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,

     }; 
     
 
 localStorage.setItem("taskmanager", JSON.stringify({cards:globalStore}));

};