import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react"
import styles from './List.module.css'
import { Task } from "./Task";

import { PlusCircle } from "phosphor-react"
import EmptyIcon from '../assets/clipboard.svg'

export interface TaskFormat {
	content: string;
	done: boolean;
}

function List() {
	const [tasks, setTasks] = useState<TaskFormat[]>([])
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

	const tasksAmount = tasks.length
	const taskDoneAmount = tasks.filter(task => task.done).length

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
			<section className={styles.reportSection}>
				<p className={styles.blueText}>
					Total de tarefas criadas
					<span className={styles.chipCounter}>{tasksAmount}</span>
				</p>
				<p className={styles.purpleText}>
					Concluidas
					<span className={styles.chipCounter}>{taskDoneAmount}</span>
				</p>
			</section>

			<ul>
				{tasks.length ? tasks.map(task => (
					<Task key={task.content} deleteTask={deleteTask} content={task.content} done={task.done} toggleTask={toggleTask}  />
				)) : (
					<div className={styles.emptySection}>
						<img src={EmptyIcon} />
						<p>
							<b>Você ainda não tem tarefas cadastradas</b>
						</p>
						<p>Crie tarefas e organize seus itens a fazer</p>
					</div>
				)}
			</ul>
		</main>
	)
}


export { List }