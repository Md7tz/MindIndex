import axios from "axios";
import Fuse from "fuse.js";

export const fetchData = async () => {
  const [collectionsResponse, notesResponse] = await Promise.all([
    axios.get("/api/collections"),
    axios.get("/api/notes"),
  ]);

  const collections = collectionsResponse.data.collections.map(
    (collection) => ({
      ...collection,
      merged_id: `collection_${collection.id}`,
      type: "collection",
    })
  );

  const notes = notesResponse.data.notes.map((note) => ({
    ...note,
    merged_id: `note_${note.id}`,
    type: "note",
  }));
  return [... notes, ... collections];
};

export const filteredData = (searchQuery, data) => {
  console.log(`FilteredData: ${data}`)
  return searchQuery
    ? new Fuse(data, {
        keys: ["title", "body", "description", "name"],
        includeScore: true,
        threshold: 0.4,
      })
        .search(searchQuery)
        .map((result) => result.item)
    : [];
};
