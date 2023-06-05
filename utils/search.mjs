import axios from "axios";
import Fuse from "fuse.js";

export const fetchData = async (authenticationToken) => {
  try {
    const [collectionsResponse, notesResponse] = await Promise.all([
      axios.get("/api/collections", {
        headers: {
          Authorization: `Bearer ${authenticationToken}`,
        },
      }),
      axios.get("/api/notes", {
        headers: {
          Authorization: `Bearer ${authenticationToken}`,
        },
      }),
    ]);

    const collections = collectionsResponse.data.collections.map((collection) => ({
      ...collection,
      merged_id: `collection_${collection.id}`,
      type: "collection",
    }));

    const notes = notesResponse.data.notes.map((note) => ({
      ...note,
      merged_id: `note_${note.id}`,
      type: "note",
    }));

    return [...notes, ...collections];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
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
