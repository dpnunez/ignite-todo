import rocketLogo from '../assets/rocket-logo.svg'
import styles from './Header.module.css'


function Header() {
	return (
		<header className={styles.container}>
			<img src={rocketLogo} alt="Logo rocket" />
			<h1 className={styles.title}>
				to
				<span>
					do
				</span>
			</h1>
		</header>
	)
}

export { Header }