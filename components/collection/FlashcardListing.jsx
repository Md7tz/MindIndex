export default function FlashcardListing({ flashcards }) {
    return (
        <div className="row">
            {flashcards?.length > 0 ? (
                flashcards.map((card, index) => (
                    <div className="col-12" key={index}>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4 d-flex align-items-center justify-content-center p-2">
                                    <h5 className="card-title">{card?.question}</h5>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <p className="card-text p-2">
                                            {card?.answer}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">{index + 1}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    )
}