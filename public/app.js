// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase, ref, push, set,onValue,update,remove } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCJg-27CoVgVlj_AadxrxFZ8F3hCiS0igw",
   authDomain: "new-todo-4817b.firebaseapp.com",
   projectId: "new-todo-4817b",
   storageBucket: "new-todo-4817b.appspot.com",
   messagingSenderId: "607016209059",
   appId: "1:607016209059:web:8d3dd0b984af1733038d16",
   measurementId: "G-S5G65VL8F3"
 };


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

window.add= function(){
    var obj={
        todo: document.getElementById("inpTOdO").value
    }
    var toDo_ref = push(ref(db,"ToDo")) 
   obj.key = toDo_ref.key; 
    set(toDo_ref,obj)

}


window.get = function(){
    var toDos = document.getElementById("toDo")
    onValue(ref(db,"ToDo"),function(data){
        // console.log(data.val());
        // var TodoList=Object.values(data.val())
        // for(var j =0;j<TodoList;i++){
        //     console.log(TodoList[j])
        // }
        // console.log(TodoList)
        
        toDos.innerHTML=''
        data.forEach(function(Todos){
            console.log(Todos.val())
            var TodoLi =Todos.val().todo
            var TodoKey =Todos.val().key
            if(TodoLi){
                toDos.innerHTML+=`TODO : ${TodoLi}   
                <button onclick="edit('${TodoKey}')">Edit</button>
                <button onclick="DeleteTodo('${TodoKey}')">Delete</button>
                 <br/>`
                
            }
        else{
            toDos.innerHTML='NO TODOS'
        }
        });

    })
    
}
window.edit = function(id){
var NewTodo = prompt(`EDIT TODO`)
console.log(id)
update(ref(db,`ToDo/${id}`),{
    todo:NewTodo
})


}

window.DeleteTodo=function(id){
    remove(ref(db,`ToDo/${id}`))
}