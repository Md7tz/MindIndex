import React, { useEffect, useState } from "react";
import styles from "./styles/NoteForm.module.css";
import Select from "react-select";
import ClientApi from "./ClientApi";
import axios from "axios";

const CreateEditMode = ({
  onSubmit,
  title,
  setTitle,
  body,
  setBody,
  setCollection_id,
  collection_id,
  formMode,
}) => {
  const [collectionOptions, setCollectionOptions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authenticationToken = await ClientApi.getToken();

      const url = `/api/collections`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authenticationToken}`,
        },
      });

      const collections = response.data.collections.results;

      // Transform the collection data to options format
      const options = collections.map((collection) => ({
        value: collection.id,
        label: collection.name,
      }));

      setCollectionOptions(options);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  // Find the pre-selected collection option based on the collection_id
  const selectedCollectionOption = collectionOptions.find(
    (option) => option.value == collection_id
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleCollectionChange = (selectedOption) => {
    // Update the selected collection_id
    setCollection_id(selectedOption.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label
          htmlFor="title"
          className={`form-label ${styles["note-form-label"]}`}
        >
          Title
        </label>
        <input
          type="text"
          className="form-control note-form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="body"
          className={`form-label ${styles["note-form-label"]}`}
        >
          Body
        </label>
        <textarea
          className={`form-control ${styles["note-form-control"]}`}
          id="body"
          rows="3"
          value={body}
          onChange={handleBodyChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label
          htmlFor="select"
          className={`form-label ${styles["note-form-label"]}`}
        >
          Select Collection
        </label>
        <Select
          options={collectionOptions}
          value={selectedCollectionOption}
          onChange={handleCollectionChange}
          instanceId="react-select"
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: "black",
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: "black",
            }),
          }}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className={`btn btn-primary ml-4 ${styles["note-form-update-button"]} text-center`}
        >
          {formMode === "create" ? "Create Note" : "Update Note"}
        </button>
      </div>
    </form>
  );
};

export default CreateEditMode;
