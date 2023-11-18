//Seleção de Elementos
const todoform = document.querySelector('#todo-form')
const todoinput = document.querySelector('#todo-input')
const todolist = document.querySelector('#todo-list')
const editform = document.querySelector('#edit-form')
const editinput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')

let todoTitleOld = "";  

//Funções-------------------------------------
const saveTodo = (Text) => {

    //cria a div com a class="todo"
    const todo = document.createElement("div")
    todo.classList.add("todo")
    //---------------------------------
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = Text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)
    
    todolist.appendChild(todo)
    // cria o HTML que vai adicionar a tarefa na tag todoList
    todoinput.value = ""
    todoinput.focus()
}

const toggleforms = () => {    
    //pega o elemento #edit-form e adiciona a class=hide para invisible e se já tem a hide ele retira e visible, pelo toggle.
    editform.classList.toggle("hide")
    //mesmo faz para o elemento de adicionar todo.
    todoform.classList.toggle("hide")
    //mesmo faz com o elemento que contem as tarefas.
    todolist.classList.toggle("hide") 
}

const updateTodo = (text) => {
    
    //pega de todo o documento a class=todo -> ".todo"
    const todos = document.querySelectorAll(".todo");    
    console.log("updateTodo")
    console.log(todos)

    todos.forEach((todo) => {
        //aqui não precisa de um "." pq é uma taga não uma class.
        let todoTitle = todo.querySelector("h3");
        console.log(todoTitle)

        if(todoTitle.innerText === todoTitleOld){
            todoTitle.innerText = text
        }
    }) 
}
//Funções-------------------------------------
//Eventos------------------------------------------
todoform.addEventListener("submit", (e) => {
    //preventDefault não envia o form para o back-end - permanece no front para trabalhar 
    e.preventDefault();    
    const inputValue = todoinput.value
    
    if (inputValue){
        //console.log(inputValue)
        saveTodo(inputValue)
    }   
})

document.addEventListener("click", (e) => {

    const targetElem = e.target;
    //console.log(targetElem)  
    //pegar o elemento pai mais próximo do click
    const parentEl = targetElem.closest("div");
    //pegar o titulo do que está sendo clicado, como os elementos todo não tem id, nos referenciamos pelo título 
    let todoTitle;

    //parentEl - se tem elemento PAI 
    //parentEl.querySelector("h3") - se tem elemento h3 que é o título 
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText        
    }

    if(targetElem.classList.contains("finish-todo")) {
        //console.log("clicou finish-todo") 
        //classList -> adiciona a class no elemento / toggle -> se tiver a class (done - marca o elemento como feito - css) no elemento ele retira, se não tiver ele coloca no elemento.
        parentEl.classList.toggle("done")
    }
    else if (targetElem.classList.contains("edit-todo")){
        //console.log("clicou edit-todo") 
        toggleforms()        

        if(todoTitle){         
            todoTitleOld = todoTitle
            editinput.value = todoTitle        
            editinput.focus()
        }
    }
    else if (targetElem.classList.contains("remove-todo")){                
        //console.log("clicou remove-todo") 
        parentEl.remove()
    }
})
//evento do botão cancelar
cancelEditBtn.addEventListener("click", (e) => {
    //preventDefault não envia o form para o back-end - permanece no front para trabalhar
    e.preventDefault();    
    //chama function para retornar os elementos que estão invisible.
    toggleforms()

})
//evento do botão editar - SUBMIT
 editform.addEventListener("submit", (e) => {   

    e.preventDefault();

    const editInput = editinput.value;   
    //preventDefault não envia o form para o back-end - permanece no front para trabalhar
    //console.log("SUBMIT UPDATE")
    
    if(editInput){
        console.log(editInput)
        updateTodo(editInput);
    }
    //chama function para retornar os elementos que estão invisible <-> visible.
    toggleforms()
})
// //Eventos----------------------------------------------------------------------




