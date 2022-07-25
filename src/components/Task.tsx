import { Check, Trash } from "phosphor-react";
import styles from './Task.module.css'
import { TaskFormat } from './List'
import { MouseEventHandler } from "react";

interface TaskProps extends TaskFormat {
	toggleTask: ({content, done}: TaskFormat) => void
	deleteTask: ({ content, done }: TaskFormat) => void
}

function Task({ content, done, toggleTask, deleteTask }: TaskProps) {

	function handleChangeTask() {
		toggleTask({ content, done })
	}

	const handleDeleteTask: MouseEventHandler<SVGSVGElement>= (event) => {
		event.stopPropagation()
		deleteTask({ content, done })
	}

	return (
		<li onClick={handleChangeTask} className={styles.container}>
			<span className={`${styles.checkmark} ${done && styles['checked-checked']}`}>
				<Check size={12} />
			</span>
			<p className={done ? styles.doneParagraph: ''}>
				{content}
			</p>
			<Trash onClick={handleDeleteTask} size={24} />
		</li>
	)
}


export { Task }