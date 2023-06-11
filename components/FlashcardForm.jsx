import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDrag, useDrop } from "react-dnd";
import styles from "./styles/AddSet.module.css";
import { useEffect, useState } from "react";
/**
 * FlashcardForm Component
 * Renders a form for a flashcard with question and answer inputs.
 *
 * Props:
 * - flashcard (object): The current flashcard object containing the question and answer.
 * - index (number): The index of the current flashcard in the flashcard list.
 * - moveFlashcard (function): A callback function to handle the reording of flashcards.
 * - removeFlashcard (function): A callback function to remove the flashcard.
 * - handleQuestionChange (function): A callback function to handle changes in the question input.
 * - handleAnswerChange (function): A callback function to handle changes in the answer input.
 * - count (number): The count of flashcards in the form.
 */
export default function FlashcardForm({
  flashcard,
  index,
  moveFlashcard,
  removeFlashcard,
  handleQuestionChange,
  handleAnswerChange,
  count,
}) {
  const [{ isDragging }, drag] = useDrag({
    // Define the drag properties
    item: { type: "flashcard", id: flashcard.id, index }, // Specify the type, id, and index of the dragged item
    type: "flashcard", // Set the type of the draggable item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Collect information about the drag state
    }),
  });

  const handleCardHover = (item, monitor) => {
    // Handle the card hover event
    if (item.id === flashcard.id) {
      return; // If the hovered card is the same as the current card, return early
    }
    const dragIndex = item.index; // Get the index of the dragged card
    const hoverIndex = index; // Get the index of the current card (the hover target)
    moveFlashcard(dragIndex, hoverIndex); // Reorder the flashcards
    item.index = hoverIndex; // Update the index of the dragged card
  };

  const [, drop] = useDrop({
    // Define the drop properties
    accept: "flashcard", // Specify the accepted type of the dropped item
    canDrop: () => true, // Disable dropping functionality for this component
    hover: handleCardHover, // Specify the hover handler function
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
      ref={(node) => drag(drop(node))} // Configure drag and drop functionality for the container element
      className="card my-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <div className="text-muted font-monospace">{index + 1}</div>
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
}
