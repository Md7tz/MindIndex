import moment from "moment";

export default function NoteListing({ notes }) {
	return (
		<div className="row">
			{notes?.length > 0 ? (
				notes.map((note, index) => (
					<div className="col-sm-6 my-2" key={index}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">{note?.title}</h5>
								<p className="card-text">{note?.body}</p>
								<span className="text-muted">
								{
									note?.updated_at
										? "Last updated " + moment(note.updated_at).fromNow()
										: "Created " + moment(note.created_at).fromNow()
								}
								</span>
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

