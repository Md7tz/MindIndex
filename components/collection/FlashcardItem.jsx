
import styles from '../styles/Studyset.module.css';
import { useState } from 'react';

export default function FlashcardItem({ card, clickHandler, flipped, flipStyle }) {
	const rotation = flipped ? 180 : 0;
	const frontStyle = { ...flipStyle, transform: `rotateY(${rotation}deg)` };
	const backStyle = { ...flipStyle, transform: `rotateY(${180 + rotation}deg)` };

	return (
		<div className={styles['flashcardItem']} onClick={clickHandler}>
			<div className={styles['flashcardItemInner']} style={frontStyle}>
				<div className={styles['flashcardItemHelper']}>front</div>
				<span className='d-flex justify-content-center align-items-center p-2 text-center'>
					{card?.question}
				</span>
			</div>
			<div className={styles['flashcardItemInner']} style={backStyle}>
				<div className={styles['flashcardItemHelper']}>back</div>
				<span className='d-flex justify-content-center align-items-center p-2 text-center'>
					{flipped ? card?.answer : ""}
				</span>
			</div>
		</div>
	);
};
