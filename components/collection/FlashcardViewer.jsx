import styles from '../styles/Studyset.module.css';
import FlashcardItem from './FlashcardItem';
import ViewerNavButtons from './ViewerNavButtons';
import { useState } from 'react';

export default function FlashcardsViewer({ cards }) {
	const [cardIndex, setCardIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [flipStyle, setFlipStyle] = useState({ transition: 'transform 0.5s' });

	const arrowHandler = async (left) => {
		if (flipped)
			await clickHandler();

		if (left) {
			if (cardIndex - 1 >= 0) {
				setCardIndex(cardIndex - 1);
			}
		} else {
			if (cardIndex + 1 < cards.length) {
				setCardIndex(cardIndex + 1);
			}
		}

	};

	const clickHandler = async () => {
		setFlipped(!flipped);
		setFlipStyle({ transition: 'transform 0.5s' });
	};

	return (
		<div className={`${styles['flashcardViewer']} ${styles.noSelect}`}>
			<div className={styles['flashcardItemWrapper']}>
				<FlashcardItem
					card={cards[cardIndex]}
					clickHandler={clickHandler}
					flipped={flipped}
					flipStyle={flipStyle}
				/>
			</div>
			<ViewerNavButtons
				arrowHandler={arrowHandler}
				cardIndex={cardIndex}
				cardLength={cards.length}
			/>
		</div>
	);
};