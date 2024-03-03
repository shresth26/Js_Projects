document.addEventListener('DOMContentLoaded', function() {
    const toDoInput = document.querySelector('.todo-input');
    const toDoButton = document.querySelector('.todo-button');
    const toDoList = document.querySelector('.todo-list');

    toDoButton.addEventListener("click", addToDo);
    toDoList.addEventListener("click", deleteToDo);

    function addToDo(event){
        event.preventDefault();

        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('todo');

        const newToDo = document.createElement('li');
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('completed-btn');
        toDoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        toDoDiv.appendChild(trashButton);
        
        toDoList.append(toDoDiv);
        toDoInput.value = "";
    }

    function deleteToDo(e){
        // item where the user has clicked
        const item = e.target;

        if(item.classList[0] === "trash-btn"){
            const todo = item.parentElement;
            todo.classList.add("fall");
            // wait for the transitition to end or else it removes it instantly without the transition
            todo.addEventListener("transitionend", () => {
                todo.remove();
            })
        }

        if(item.classList[0] === "completed-btn"){
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
    }
});