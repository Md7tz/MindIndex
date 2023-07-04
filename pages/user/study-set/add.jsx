import { useState } from "react";
import slugify from "slugify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FlashcardForm from "../../../components/collection/FlashcardForm";
import styles from "../../../components/styles/AddSet.module.css";
import { toast } from "react-toastify";
import ClientApi from "../../../components/ClientApi";
import { Navigate } from "../../../components/Basepath";

export default function AddSet() {
  const [collection, setCollection] = useState({
    name: "",
    slug: "",
    description: "",
    flashcards: [
      { id: 1, question: "", answer: "" },
      { id: 2, question: "", answer: "" },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleCollectionNameChange = (event) => {
    setCollection({ ...collection, name: event.target.value, slug: slugify(event.target.value, { lower: true }) });
    setErrors({ ...errors, name: "" });
  };

  const handleCollectionDescriptionChange = (event) => {
    setCollection({ ...collection, description: event.target.value });
    setErrors({ ...errors, description: "" });
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
    const newId =
      Math.max(...collection.flashcards.map((flashcard) => flashcard.id)) + 1;
    const newFlashcard = { id: newId, question: "", answer: "" };
    setCollection({
      ...collection,
      flashcards: [...collection.flashcards, newFlashcard],
    });
  };

  const removeFlashcard = (id) => {
    if (collection.flashcards.length === 2) return;

    const updatedFlashcards = collection.flashcards.filter(
      (flashcard) => flashcard.id !== id
    );
    setCollection({ ...collection, flashcards: updatedFlashcards });
  };

  const moveFlashcard = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) {
      // No need to reorder if the dragIndex and hoverIndex are the same
      return;
    }

    const flashcardsCopy = [...collection.flashcards];

    // Remove the dragged flashcard from its original position
    const [draggedFlashcard] = flashcardsCopy.splice(dragIndex, 1);

    // Insert the dragged flashcard at the hoverIndex
    flashcardsCopy.splice(hoverIndex, 0, draggedFlashcard);

    setCollection({ ...collection, flashcards: flashcardsCopy });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH + "/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await ClientApi.getToken()}`,

        },
        // body: JSON.stringify({ ...collection })
        body: JSON.stringify({
          name: collection.name,
          slug: collection.slug,
          description: collection.description,
          flashcards: collection.flashcards.map((flashcard) => {
            return {
              question: flashcard.question,
              answer: flashcard.answer,
            };
          }),
        })

      });

      if (response.ok) {
        // Collection created successfully
        const data = await response.json();
        toast.success(data.message);

        await ClientApi.updateUser();
        Navigate.push("/study-set/" + collection.slug);
      } else {
        // Handle error case
        const errorData = await response.json();
        // console.log(errorData);
        if (errorData.errors)
          setErrors(errorData.errors);
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container my-3 py-3">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Create a new study set
            <span className="text-muted mx-2 px-2 fs-5">url slug: {collection.slug}</span>
          </h2>
          <button type="submit" className="btn btn-dark">
            Create
          </button>
        </div>
        <div className={`row ${styles.group} px-3 has-validation`}>
          <input
            type="text"
            className={`${styles.inputField} ${errors?.name ? "is-invalid" : ""}`}
            id="collectionName"
            placeholder="e.g. Biology 101"
            value={collection.name}
            onChange={handleCollectionNameChange}
          />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          {errors?.name && <div className="invalid-feedback px-0">{errors.name[0]}</div>}
          <label
            htmlFor="collectionName"
            className="form-label px-0 text-muted has-validation"
          >
            TITLE
          </label>
        </div>
        <div className={`row ${styles.group} px-3`}>
          <textarea
            className={`${styles.inputField} ${errors?.description ? "is-invalid" : ""}`}
            id="collectionDescription"
            rows={3}
            placeholder="e.g. This is a collection of flashcards for Biology 101"
            value={collection.description}
            onChange={handleCollectionDescriptionChange}
          ></textarea>
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          {errors?.name && <div className="invalid-feedback px-0">{errors.description[0]}</div>}
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
            <div className="card-container has-validation">
              {Object?.keys(errors)?.some((key) => key.startsWith("flashcards")) && (
                <>
                  <div className="is-invalid"></div>
                  <div className="invalid-feedback px-0">Fill in all the fields</div>
                </>
              )}
              {collection?.flashcards?.map((flashcard, index) => (
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
