import { useState, useEffect } from 'react'
import Error from 'next/error';
import moment from 'moment';
import FlashcardsViewer from '../../components/collection/FlashcardViewer';
import ClientApi from '../../components/ClientApi';
import { toast } from 'react-toastify';
import FlashcardListing from '../../components/collection/FlashcardListing';
import styles from '../../components/styles/Studyset.module.css';
import NoteListing from '../../components/collection/NoteListing';

export default function PublicStudySet({ slug }) {
	const [collection, setCollection] = useState({
		user: {
			username: "username",
			avatar: "https://via.placeholder.com/150",
		},
		name: "Collection",
		description: "",
		flashcards: [
			{ id: "1", question: 'Hej', answer: 'Hello' },
			{ id: "2", question: 'Varsågod', answer: 'You\'re welcome' },
			{ id: "3", question: 'Snälla', answer: 'Please' },
			{ id: "4", question: 'Ursäkta mig', answer: 'Excuse me' },
			{ id: "5", question: 'Jag förstår inte', answer: 'I do not understand' },
			{ id: "6", question: 'Talar du engelska?', answer: 'Do you speak English?' },
			{ id: "7", question: 'Vad heter du?', answer: 'What is your name?' },
			{ id: "8", question: 'Offentlig telefon', answer: 'Public telephone' },
			{ id: "9", question: 'Nyhetsbyrå', answer: 'News agency' }
		],
		notes: [
			{ title: 'The Art of Problem Solving', body: 'Unlocking the beauty of mathematics through problem-solving techniques.', created_at: '2023-06-01 09:00:00', },
			{ title: 'Exploring the Cosmos', body: 'Journeying through the wonders of the universe and the mysteries of physics.', created_at: '2023-06-02 10:30:00', },
			{ title: 'Alchemy: From Elements to Elixirs', body: 'Unraveling the secrets of chemistry and its transformative powers.', created_at: '2023-06-03 11:45:00', },
		]
	});
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const fetchCollection = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BASEPATH}/api/collections/${slug}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${await ClientApi.getToken()}`
					}
				});

				if (!response.ok) {
					const error = await response.json();

					if (response.status === 404) {
						setNotFound(true);
					}
					throw new Error(error);
				}

				const data = await response.json();

				setCollection(data.collection);
			} catch (error) {
				toast.error(error.props.message);
			}
		};

		fetchCollection();
	}, [slug]);


	const handleSubmit = async (event) => {
		event.preventDefault();
	}

	return (
		collection?.id ? (
			<div className="container my-3 py-3">
				<form onSubmit={handleSubmit}>
					<div className="d-flex justify-content-between align-items-center">
						<h2>{collection?.name}</h2>
						<div className="d-flex justify-content-center align-items-center gap-3">
							<span className="text-muted">
								{
									collection?.updated_at
										? "Last updated " + moment(collection.updated_at).fromNow()
										: "Created " + moment(collection.created_at).fromNow()
								}
							</span>
							<img src={collection?.user?.profile?.avatar_url || "http://www.gravatar.com/avatar/?d=mp"} alt="avatar" className="rounded-circle" width="50" height="50" />
							<span className="text-muted">{collection?.user?.username}</span>
						</div>
					</div>
					<div>
						<blockquote className={`blockquote ${styles.note}`}>
							<p class="mb-0">
								{collection?.description}
							</p>
						</blockquote>
					</div>

					<div className="mb-3">
						<div className="card-container">
							<FlashcardsViewer cards={collection.flashcards} />
						</div>
						<hr />
						<FlashcardListing flashcards={collection.flashcards || []} />
						<hr />
						<h3>Notes</h3>
						<NoteListing notes={collection.notes || []} />
					</div>
				</form>
			</div>
		) : notFound ? (
			<Error statusCode={404} />
		) : (
			<div className="container my-3 py-3">
				<div className="d-flex justify-content-center align-items-center">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		)
	);
}

export async function getServerSideProps(context) {
	const { slug } = context.query

	return {
		props: { slug },
	}
}   // Path: pages\user\study-set\[slug].jsx

