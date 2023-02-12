import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
	const [AllTodos, setAllTodos] = useState([]);
	const NameRef = useRef(null);
	const ImpRef = useRef(null);

	const AddTodo = (e) => {
		let ID = uuidv4();
		e.preventDefault();

		if (ImpRef.current.checked) {
			setAllTodos([
				{
					ID: ID,
					Name: NameRef.current.value,
					Important: ImpRef.current.checked,
				},
				...AllTodos,
			]);
		} else {
			setAllTodos([
				...AllTodos,
				{
					ID: ID,
					Name: NameRef.current.value,
					Important: ImpRef.current.checked,
				},
			]);
		}
	};

	const DeleteTodo = (ToDoID) => {
		const NewList = AllTodos.filter((Todo) => Todo.ID != ToDoID);
		setAllTodos(NewList);
	};

	const InputComponent = () => {
		return (
			<div className="InputContainer">
				<form className="InputForm" onSubmit={AddTodo}>
					<input
						placeholder="Add a Todo"
						className="Input"
						type="text"
						ref={NameRef}
					/>
					<span className="ImportantContainer">
						<p>Important</p>
						<input className="ImportantButton" type="checkbox" ref={ImpRef} />
					</span>
					<button className="AddButton">Add</button>
				</form>
			</div>
		);
	};

	const TodoList = () => {
		return (
			<div className="ToDoListContainer">
				{AllTodos.map((TodoItem) => {
					return <IndividualTodo Todo={TodoItem} key={TodoItem.ID} />;
				})}
			</div>
		);
	};

	const IndividualTodo = (TodoItem) => {
		const ToDo = TodoItem.Todo;

		return (
			<div
				className={
					ToDo.Important
						? 'IndividualTodoContainer Important'
						: 'IndividualTodoContainer'
				}
			>
				<p className="TodoTitle">{ToDo.Name}</p>
				<button
					className="DeleteTodoButton"
					onClick={() => DeleteTodo(ToDo.ID)}
				>
					X
				</button>
			</div>
		);
	};

	return (
		<div className="App">
			<InputComponent />
			<TodoList />
		</div>
	);
}

export default App;
