
import styles from '../styles/Studyset.module.css';
import { useState } from 'react';

export default function FlashcardItem({ cardIndex, card, clickHandler, setFlipped, setFlipStyle, flipped, flipStyle }) {
    const rotation = flipped ? 180 : 0;
    const frontStyle = { ...flipStyle, transform: `rotateY(${rotation}deg)` };
    const backStyle = { ...flipStyle, transform: `rotateY(${180 + rotation}deg)` };

    return (
        <div className={styles['flashcardItem']} onClick={clickHandler}>
            <div className={styles['flashcardItemInner']} style={frontStyle}>
                <div className={styles['flashcardItemHelper']}>front</div>
                {card.question}
            </div>
            <div className={styles['flashcardItemInner']} style={backStyle}>
                <div className={styles['flashcardItemHelper']}>back</div>
                {card.answer}
            </div>
        </div>
    );
};
