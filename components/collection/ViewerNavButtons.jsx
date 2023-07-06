import styles from '../styles/Studyset.module.css';

export default function ViewerNavButtons ({ arrowHandler, cardIndex, cardLength }) {
	const leftStyle = cardIndex - 1 < 0 ? { opacity: 0.5 } : {};
	const rightStyle = cardIndex + 1 >= cardLength ? { opacity: 0.5 } : {};

	return (
		<div className={styles['navButtonsWrapper']}>
			<div
				className={styles['navArrowBtn']}
				style={leftStyle}
				onClick={() => arrowHandler(true)}
			>
				&larr;
			</div>
			{`${cardIndex + 1}/${cardLength}`}
			<div
				className={styles['navArrowBtn']}
				style={rightStyle}
				onClick={() => arrowHandler(false)}
			>
				&rarr;
			</div>
		</div>
	);
};