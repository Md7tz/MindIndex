import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FlashcardForm from "../../components/FlashcardForm";
import styles from "../../components/styles/AddSet.module.css";

export default function AddSet() {
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    flashcards: [
      { id: 1, question: "", answer: "" },
      { id: 2, question: "", answer: "" },
    ],
  });

  const handleCollectionNameChange = (event) => {
    setCollection({ ...collection, name: event.target.value });
  };

  const handleCollectionDescriptionChange = (event) => {
    setCollection({ ...collection, description: event.target.value });
  };

  const handleQuestionChange = (id, event) => {
    const updatedFlashcards = collection.flashcards.map((flashcard) => {
      if (flashcard.id === id) {
        return { ...flashcard, question: event.target.value };
      }
      return flashcard;
    });
    setCollection({ ...collection, flashcards: updatedFlashcards });
  };

  const handleAnswerChange = (id, event) => {
    const updatedFlashcards = collection.flashcards.map((flashcard) => {
      if (flashcard.id === id) {
        return { ...flashcard, answer: event.target.value };
      }
      return flashcard;
    });
    setCollection({ ...collection, flashcards: updatedFlashcards });
  };

  const addFlashcard = () => {
    const newId = Math.max(...collection.flashcards.map((flashcard) => flashcard.id)) + 1;
    const newFlashcard = { id: newId, question: "", answer: "" };
    setCollection({
      ...collection,
      flashcards: [...collection.flashcards, newFlashcard],
    });
  };

  const removeFlashcard = (id) => {
    if (collection.flashcards.length === 2)
      return;

    const updatedFlashcards = collection.flashcards.filter(
      (flashcard) => flashcard.id !== id
    );
    setCollection({ ...collection, flashcards: updatedFlashcards });
  };

  const moveFlashcard = (dragIndex, hoverIndex) => {
    const flashcard = collection.flashcards[dragIndex];
    const updatedFlashcards = [...collection.flashcards];
    updatedFlashcards.splice(dragIndex, 1);
    updatedFlashcards.splice(hoverIndex, 0, flashcard);
    setCollection({ ...collection, flashcards: updatedFlashcards });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform additional actions here, like saving the collection to a database
    console.log(collection);
  };

  return (
    <div className="container my-3 py-3">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Create a new study set</h2>
          <button type="submit" className="btn btn-dark">
            Create
          </button>
        </div>
        <div className={`row ${styles.group} px-3`}>
          <input
            type="text"
            className={`${styles.inputField}`}
            id="collectionName"
            placeholder="e.g. Biology 101"
            value={collection.name}
            onChange={handleCollectionNameChange}
          />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label
            htmlFor="collectionName"
            className="form-label px-0 text-muted"
          >
            TITLE
          </label>
        </div>
        <div className={`row ${styles.group} px-3`}>
          <textarea
            className={`${styles.inputField}`}
            id="collectionDescription"
            rows={3}
            placeholder="e.g. This is a collection of flashcards for Biology 101"
            value={collection.description}
            onChange={handleCollectionDescriptionChange}
          ></textarea>
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label
            htmlFor="collectionDescription"
            className="form-label px-0 text-muted"
          >
            DESCRIPTION
          </label>
        </div>
        <div className="mb-3">
          <h4>Flashcards</h4>
          <DndProvider backend={HTML5Backend}>
            <div className="card-container">
              {collection.flashcards.map((flashcard, index) => (
                <FlashcardForm
                  key={flashcard.id}
                  flashcard={flashcard}
                  index={index}
                  moveFlashcard={moveFlashcard}
                  removeFlashcard={removeFlashcard}
                  handleQuestionChange={handleQuestionChange}
                  handleAnswerChange={handleAnswerChange}
                  count={collection.flashcards.length}
                />
              ))}
            </div>
          </DndProvider>
          <div className="card my-4" onClick={addFlashcard}>
            <div className="card-body d-flex justify-content-center align-items-center fw-bolder">
              <FontAwesomeIcon icon={faPlus} />
              <span className={styles.highlight}></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
