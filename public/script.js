console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";
const COMPLETD_TO_DO="COMPLETD_TO_DO";
const DELETE_TODO='DELETE_TODO';

// AJAX - xmlhttprequest object
// make requests to the server
// 1. without reloading the webpage
// 2. asynchronously
window.onload = getTodosAJAX();
function add_todo_elements(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML="";

    if(parent)
    {
        Object.keys(todos).forEach(function(key){
            if(todos[key].status=='ACTIVE'){

                var  todo_element=createTodoElement(key,todos[key]);
                parent.appendChild(todo_element);
                console.log(parent);
            }
        })
    }
    //parent.innerText = todos_data_json;
}
function add_todo_elements_complete(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML="";
    console.log(todos);
    if(parent)
    {
        Object.keys(todos).forEach(function(key){
            if(todos[key].status=='COMPLETE'){
                console.log('Hello');
                var  todo_element=createTodoElement(key,todos[key]);
                parent.appendChild(todo_element);
                add_todo_elements(TODOS_LIST_ID,todos_data_json);
            }

        })
    }
    //parent.innerText = todos_data_json;
}
function add_todo_elements_delete(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML="";
    console.log(todos);
    if(parent)
    {
        Object.keys(todos).forEach(function(key){
            if(todos[key].status=='DELETED'){

                var  todo_element=createTodoElement(key,todos[key]);
                parent.appendChild(todo_element);
                add_todo_elements(TODOS_LIST_ID,todos_data_json);
                add_todo_elements_complete(COMPLETD_TO_DO,todos_data_json);
            }

        })
    }
    //parent.innerText = todos_data_json;
}


// Repo URL - https://github.com/malikankit/todo-august-28
function createTodoElement(id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute("class", "todoStatus" + todo_object.status);

//    return todo_element;

    if (todo_object.status == "ACTIVE") {

        var complete_button = document.createElement("input");
        complete_button.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
        complete_button.setAttribute('type','checkbox');
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    if (todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE") {
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete";
        delete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }

    if (todo_object.status == "COMPLETE") {
        var complete = document.createElement("input");
        complete.setAttribute('type','checkbox');
        complete.setAttribute("checked","checked");
        complete.setAttribute("onclick", "completetoactive("+id+")");
        todo_element.appendChild(complete);
    }
    return todo_element;
}

function completetoactive(id){
    var  xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "id=" + encodeURI(id);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK) {

                add_todo_elements(TODOS_LIST_ID, xhr.responseText);

            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function getTodosAJAX() {

    // xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    //
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {

            if (xhr.status == STATUS_OK) {
                console.log(xhr.responseText);
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
                add_todo_elements_complete(COMPLETD_TO_DO,xhr.responseText);
                add_todo_elements_delete(DELETE_TODO,xhr.responseText);
            }
        }
    };// end of callback
    xhr.send(data = null)
}
function addTodoAJAX() {
    var title =document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr  = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "todo_title="+encodeURI(title);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status== STATUS_OK)
            {
                add_todo_elements(TODOS_LIST_ID,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function deleteTodoAJAX(id){
    var  xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "id=" + encodeURI(id);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK) {
                add_todo_elements_delete(DELETE_TODO, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function completeTodoAJAX(id)
{
       var  xhr = new XMLHttpRequest();
       xhr.open("PUT","/api/todos/"+id, true);
       xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       var data = "id=" + encodeURI(id);
       xhr.onreadystatechange = function()
       {
           if(xhr.readyState == RESPONSE_DONE){
               if (xhr.status == STATUS_OK) {
                   add_todo_elements_complete(COMPLETD_TO_DO, xhr.responseText);
               }
               else {
                   console.log(xhr.responseText);
               }
           }
       }
   xhr.send(data);
   }




