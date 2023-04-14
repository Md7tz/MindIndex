import styles from './Flashcard.module.css';

export default function Flashcard() {
  return (
    <div className={styles['flashcard-container']}>
      <div className={styles.flashcard}>
        <div className={styles.question}>
          <div className={styles.content}>
            What is the official birthday of the USAF?
          </div>
        </div>
        <div className={styles.answer}>
          <div className={styles.content}>
            September 18, 1947
          </div>
        </div>
      </div>
    </div>
  );
}
