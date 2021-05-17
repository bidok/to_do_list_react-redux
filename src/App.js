import {createStore} from "redux";
import './App.css';

function tasks(state = [], action){
    if(action.type === "newTask"){
        return [...state, action.payload];
    }
    return state;
}

const store = createStore(tasks);

store.subscribe(() => {

    const checkList = document.getElementById("checkList");
    const task = store.getState().splice(-1).pop();
    console.log("task ", task);
        const li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click",el => {
            document.getElementById("checkedList").appendChild(el.target).addEventListener("click", el => move(el));
        })
        checkList.appendChild(li);
})

function addTask(){
    const inputTask = document.getElementById("inputTask").value;
    store.dispatch({type: "newTask", payload: inputTask});
}

function move(item){
    const list = document.getElementById("checkedList");
    const li = item.target;
    for (let i = 0; i < list.getElementsByTagName("li").length; i++) {
        if(list.getElementsByTagName("li")[i].outerHTML === li.outerHTML){
            list.removeChild(list.childNodes[i]);
            break;
        }
    }
    store.dispatch({type: "newTask", payload: li.outerHTML.replace("<li>", "").replace("</li>", "")});
}


function App() {
  return(
      <div className="body">
          <div>
              <input type="text" id="inputTask"/>
              <button onClick={() => addTask()}>Add task</button>
          </div>


             <label>Check list</label>
             <ul id="checkList"></ul>
              <label>Checked list</label>
              <ul id="checkedList" className="checkedList"></ul>

      </div>

  );
}

export default App;
