import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [todo, setTodo] = useState([]);
  const [inputData, setInputData] = useState('')

  useEffect(()=>{
    let checkTodo = localStorage.getItem('todo')
    if(checkTodo){
      let todo = JSON.parse(localStorage.getItem('todo'));
      setTodo(todo);
    }
    console.log(todo)
  },[])
  const handleInput = (e)=>{
    setInputData(e.target.value);
  }
  const onHandleClick = ()=>{
    if(inputData.length <=3) return;
    setTodo([...todo, {'id':uuidv4(), inputData, isCompleted: false}]);
    setInputData("");
    saveTodoLocal()
  }
  const saveTodoLocal = ()=>{
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  const handleCheckBox= (e)=>{
    let id = e.target.name
    let index = todo.findIndex(item=>{
      return item.id === id;
    });
    let newTodo = [...todo];
    newTodo[index].isCompleted = !newTodo[index].isCompleted
    setTodo(newTodo);
    saveTodoLocal()
  }
  const handleDelete = (e, id)=>{
    if(confirm("Are you sure you want to delete this todo?")){

      let newTodo = todo.filter(item=>{
        return item.id !== id;
      });
      setTodo(newTodo);
      saveTodoLocal()
    }
  }
  const handleEdit = (e, id)=>{
    let data = todo.filter(item=>item.id === id)
    setInputData(data[0].inputData);

    let newTodo = todo.filter(item=>{
      return item.id !== id;
    });
    setTodo(newTodo);
    saveTodoLocal()
  }

  return (
    <>
    <div className="bg-gray-800 text-white min-h-[100vh] w-[100%] ">
      <div className="container py-20 w-1/2 text-center mx-auto">
        <div className="heading">
          <h2 className='text-3xl font-semibold'>Add your Todo</h2>
        </div>
          <div className="input-box flex justify-center align-middle">
            <input type="text" className='p-2 border-none outline-none text-gray-700' value={inputData} onChange={handleInput} /> &nbsp;
            <button className='px-5 py-2 bg-slate-400 font-semibold' onClick={onHandleClick} disabled={inputData.length<=2}>Save </button>
          </div>
          <div className="todo mt-5 border border-slate-100 px-10 py-5">
            <h3 className="text-xl font-bold">Your Todos</h3>
            {todo.length ===0 && (<div>Add some todo</div>)}
            {todo && todo.map(item=>{
              return(
                <div key={item.id} className="w-full flex align-baseline">
                  <div className="selected w-1/12 self-center">
                    <input type="checkbox" className="text-2xl p-" name={item.id} checked={item.isCompleted} onChange={handleCheckBox} />
                  </div>
                  <div className="flex justify-between align-middle py-1 w-11/12" >
                    <div className="todo-text">
                      <h4 className={item.isCompleted ? " line-through text-green-500" : ""} >{item.inputData}</h4>
                    </div>
                    <div className="todo-action">
                      <button className='bg-green-700 px-3 py-1 rounded font-semibold' onClick={(e)=>{handleEdit(e, item.id)}}>Edit</button> &nbsp;
                      <button className='bg-red-700 px-3 py-1 rounded font-semibold' onClick={(e)=>{handleDelete(e, item.id)}}>Delete</button>
                    </div>
                  </div>
                </div> 
            )})} 
          </div>
        </div>
      </div>
    </>
  )
}

export default App
