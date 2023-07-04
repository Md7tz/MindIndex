export default function Restrict(req, res, next) {
    let restricted = false;
    let message = "";

    req.payload = req.payload || {};

    const subscription = req.user.subscription;
    // limit the number of collections per month to 15, notes to 20, and flashcards to 100
    if (!subscription || subscription?.status != "paid") {
        let collectionsCount = req.user.collections_count + (req.payload.collection ? 1 : 0);
        let notesCount = req.user.notes_count + (req.payload.note ? 1 : 0);

        let flashcardsCount = req.user.flashcards_count + (req.payload.collection ? req.payload.collection.flashcards.length : 0);


        if (req.payload.collectionId)
            collectionsCount -= 1;
        if (req.payload.noteId)
            notesCount -= 1;
        if (req.payload.collectionId && req.payload.collection.flashcards) {
            flashcardsCount -= req.payload.currentFlashcardCount;
        }

        if (req.payload.collection && collectionsCount > LIMITS.collections) {
            message = "You have reached the maximum number of collections for this month";
            restricted = true;
        } if (req.payload.collection?.flashcards.length > 0 && flashcardsCount > LIMITS.flashcards) {
            message = "You have reached the maximum number of flashcards for this month";
            restricted = true;
        } if (req.payload.note && notesCount > LIMITS.notes) {
            message = "You have reached the maximum number of notes for this month";
            restricted = true;
        }
    }

    req.payload = {
        restricted,
        message
    }
    return;
}

export const LIMITS = {
    collections: 15,
    notes: 20,
    flashcards: 100,
};