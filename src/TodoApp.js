import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo !== '') {
      setTodos((prevTodos) => [...prevTodos, { text: newTodo, completed: false}]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos.slice(0, index), ...prevTodos.slice(index + 1)];
      return updatedTodos;
    });
  };
  
  const handleDeleteAllTasks = () => {
     setTodos([]);
  };

  const handleDeleteDoneTasks = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  const handleEditTodo = (index, newText) => {
    const updatedTodos = todos.map((todo, i) => 
    i === index ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleToggleCompleted = (index) => {
    const updatedTodos = todos.map((todo, i) => 
    i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };


  return (
    <div class="todo-app">
        
        <div class="todo-input">
      <h1>Todo Input</h1>
      <input 
      type="text"
      value={newTodo}
      onChange= {handleInputChange}
      placeholder="Enter a new Todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <div class="todo-list">
        <h1>Todo List</h1>
      <ul class="no-bullet">
        {todos.map((todo, index) => (
          <li key={index}>
            <input 
            type= "checkbox"
            checked= {todo.completed}
            onChange= {() => handleToggleCompleted(index)}
            />
            {todo.completed ? <del>{todo.text}</del> : todo.text}
            <button onClick= {() => handleEditTodo(index, prompt('Edit Todo', todo.text))}>
                Edit
            </button>
            <button onClick={()=> handleToggleCompleted(index)}>
                {todo.completed ? 'Uncompleted': 'Completed'}
            </button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
          
        ))}
      </ul>
      </div>

      <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
      <button onClick={handleDeleteDoneTasks}>Delete Done Tasks</button>
    </div>
  );
};

export default TodoApp;




