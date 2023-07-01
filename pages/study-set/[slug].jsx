import Error from "next/error";
import moment from "moment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FlashcardForm from "../../components/collection/FlashcardForm";
import styles from "../../components/styles/AddSet.module.css";
import ClientApi from "../../components/ClientApi";

export default function Studyset({ slug }) {
  const [collection, setCollection] = useState(
    {
      name: "",
      description: "",
      flashcards: [
        { id: 1, question: "", answer: "" },
        { id: 2, question: "", answer: "" },
      ],
      created_at: "",
      updated_at: "",
    }
  );

  const [errors, setErrors] = useState({});


  // fetch collection data from the API
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEPATH}/api/collections/${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await ClientApi.getToken()}`,
            },
          }
        );
        const data = await response.json();
        setCollection(data.collection);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollection();
  }, [slug]);


  const handleCollectionNameChange = (event) => {
    setCollection({ ...collection, name: event.target.value });
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
    const flashcards = collection.flashcards;
    const maxId = flashcards.length > 0 ? Math.max(...flashcards.map((flashcard) => flashcard.id)) : 0;
    const newId = maxId + 1;

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
      const response = await fetch(process.env.NEXT_PUBLIC_BASEPATH + "/api/collections/" + slug, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await ClientApi.getToken()}`,

        },
        // body: JSON.stringify({ ...collection })
        body: JSON.stringify({
          name: collection.name,
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
        setCollection(data.collection);
        toast.success(data.message);
      } else {
        // Handle error case
        const errorData = await response.json();
        setErrors(errorData.errors);
        toast.error(errorData.errors[Object.keys(errorData.errors)[0]][0]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    collection?.id ? (
      <div className="container my-3 py-3">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Editing study set </h2>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <span className="text-muted">
                Last updated on {collection?.updated_at ? moment(collection.updated_at).format("MMMM Do YYYY, h:mm a")
                  : "never"
                }
              </span>
              <button type="submit" className="btn btn-dark">
                Save
              </button>
            </div>
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

                {!!errors && Object?.keys(errors)?.some((key) => key.startsWith("flashcards")) && (
                  <>
                    <div className="is-invalid"></div>
                    <div className="invalid-feedback px-0">
                      {collection?.flashcards?.length < 2
                        ? "you need to add at least 2 flashcards"
                        : "Fill in all the fields"}
                    </div>
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
    ) : <Error statusCode={404} />
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  return {
    props: {
      slug
    },
  };
}