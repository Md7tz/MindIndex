import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDrag, useDrop } from 'react-dnd';
import styles from "./styles/AddSet.module.css";
import { useEffect, useState } from "react";

export default function FlashcardForm({
    flashcard,
    index,
    moveFlashcard,
    removeFlashcard,
    handleQuestionChange,
    handleAnswerChange,
    count
}) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'flashcard', id: flashcard.id, index },
        type: 'flashcard',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'flashcard',
        canDrop: () => false,
        hover: (item, monitor) => {
            if (item.id === flashcard.id) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            moveFlashcard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [removable, setRemovable] = useState(true);

    useEffect(() => {
        if (count === 2) {
            setRemovable(false);
        } else {
            setRemovable(true);
        }
    }, [count]);

    const handleRemoveFlashcard = (id) => {
        removeFlashcard(id);
    };

    return (
        <div
            ref={(node) => drag(drop(node))}
            className="card my-4"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <div className="text-muted font-monospace">
                    {index + 1}
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="mx-1">
                        <FontAwesomeIcon icon={faGripLines} />
                    </div>
                    <button
                        type="button"
                        className="mx-1 delete-button bg-transparent border-0"
                        onClick={() => handleRemoveFlashcard(flashcard.id)}
                        disabled={!removable}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className={`col ${styles.group} px-3 mb-0`}>
                        <input
                            type="text"
                            className={`${styles.inputField}`}
                            placeholder="Enter term"
                            value={flashcard.question}
                            onChange={(event) => handleQuestionChange(flashcard.id, event)}
                        />
                        <span className={styles.highlight}></span>
                        <span className={styles.bar}></span>
                        <label
                            htmlFor={`term-${flashcard.id}`}
                            className="form-label px-0 text-muted"
                        >
                            TERM
                        </label>
                    </div>
                    <div className={`col ${styles.group} px-3 mb-0`}>
                        <input
                            type="text"
                            className={`${styles.inputField}`}
                            placeholder="Enter definition"
                            value={flashcard.answer}
                            onChange={(event) => handleAnswerChange(flashcard.id, event)}
                        />
                        <span className={styles.highlight}></span>
                        <span className={styles.bar}></span>
                        <label
                            htmlFor={`definition-${flashcard.id}`}
                            className="form-label px-0 text-muted"
                        >
                            DEFINITION
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
