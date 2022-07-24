import { PlusCircle } from "phosphor-react"
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react"
import styles from './List.module.css'


interface TaskFormat {
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
		console.log(" oi")
	}

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
				<button type="submit">
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
					<p>oi</p>
				))}
			</ul>
		</main>
	)
}


export { List }