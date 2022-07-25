import { PlusCircle } from "phosphor-react"
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react"
import styles from './List.module.css'
import { Task } from "./Task";


export interface TaskFormat {
	content: string;
	done: boolean;
}

function List() {
	const [tasks, setTasks] = useState<TaskFormat[]>([
		{
			content: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
			done: false
		}
	])
	const [newTaskText, setNewTaskText] = useState("")

	function handleChangeNewTaskText(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('')
		setNewTaskText(event.target.value)
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

	function handleCreateTask(event: FormEvent) {
		event.preventDefault()
		setTasks(tasks => [...tasks, { done: false, content: newTaskText }])
		setNewTaskText('')
	}

	function toggleTask(taskToChange: TaskFormat) {
		setTasks(tasks => {
			return tasks.map(task => {
				if(task.content === taskToChange.content) {
					return {...task, done: !task.done}
				}
				return task
			})
		})
	}

	function deleteTask(taskToDelete: TaskFormat) {
		setTasks(tasks => tasks.filter(task => task.content !== taskToDelete.content))
	}

	const isNewTaskEmpty = !newTaskText

	return (
		<main className={styles.container}>
			<form onSubmit={handleCreateTask}>
				<input 
					placeholder="Adicione uma nova tarefa" 
					type="text"
					value={newTaskText}
					onChange={handleChangeNewTaskText}
					onInvalid={handleNewCommentInvalid}
					required
				/>
				<button type="submit" disabled={isNewTaskEmpty}>
					Criar
					<PlusCircle size={16}/>
				</button>
			</form>
			<div>
				<p>Total de tarefas criadas</p>
				<p>Concluidas</p>
			</div>

			<ul>
				{tasks.map(task => (
					<Task key={task.content} deleteTask={deleteTask} content={task.content} done={task.done} toggleTask={toggleTask}  />
				))}
			</ul>
		</main>
	)
}


export { List }