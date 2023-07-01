require("dotenv").config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("flashcards").del();
  await knex("flashcards").insert([
    {
      question: "What is the study of living organisms?",
      answer: "Biology",
      collection_id: 1,
    },
    {
      question:
        "What is the process by which plants convert sunlight into energy?",
      answer: "Photosynthesis",
      collection_id: 1,
    },
    {
      question: "What is the function of DNA in cells?",
      answer: "Storing genetic information",
      collection_id: 1,
    },
    {
      question: "Who was the first President of the United States?",
      answer: "George Washington",
      collection_id: 2,
    },
    {
      question: "Which event marked the beginning of World War II?",
      answer: "The invasion of Poland",
      collection_id: 2,
    },
    {
      question: 'Who is known for writing "The Communist Manifesto"?',
      answer: "Karl Marx",
      collection_id: 2,
    },
    {
      question: "What is the value of pi (π)?",
      answer: "Approximately 3.14159",
      collection_id: 3,
    },
    {
      question: "What is the formula for calculating the area of a triangle?",
      answer: "(base × height) / 2",
      collection_id: 3,
    },
    {
      question: "What is the quadratic formula?",
      answer: "(-b ± √(b^2 - 4ac)) / (2a)",
      collection_id: 3,
    },
    {
      question: 'How do you say "hello" in Spanish?',
      answer: "Hola",
      collection_id: 4,
    },
    {
      question: 'What is the plural form of the word "child" in English?',
      answer: "Children",
      collection_id: 4,
    },
    {
      question: 'What is the verb "to eat" in French?',
      answer: "Manger",
      collection_id: 4,
    },
    {
      question: "What is the capital of Australia?",
      answer: "Canberra",
      collection_id: 5,
    },
    {
      question: "Which continent is the largest by land area?",
      answer: "Asia",
      collection_id: 5,
    },
    {
      question: "What is the longest river in the world?",
      answer: "The Nile",
      collection_id: 5,
    },
    {
      question: "What is the symbol for the chemical element hydrogen?",
      answer: "H",
      collection_id: 6,
    },
    {
      question:
        "What is the process of combining two or more elements to form a new substance called?",
      answer: "Chemical reaction",
      collection_id: 6,
    },
    {
      question: "What is the atomic number of carbon?",
      answer: "6",
      collection_id: 6,
    },
    {
      question: 'Who wrote the novel "Pride and Prejudice"?',
      answer: "Jane Austen",
      collection_id: 7,
    },
    {
      question:
        'What is the opening line of Charles Dickens\' "A Tale of Two Cities"?',
      answer: '"It was the best of times, it was the worst of times."',
      collection_id: 7,
    },
    {
      question:
        "What is the literary term for a long narrative poem typically involving heroic deeds and events?",
      answer: "Epic",
      collection_id: 7,
    },
    {
      question: "What is the formula for calculating force?",
      answer: "Force = mass × acceleration",
      collection_id: 8,
    },
    {
      question: "What is the unit of measurement for electric current?",
      answer: "Ampere (A)",
      collection_id: 8,
    },
    {
      question: "What is the speed of light in a vacuum?",
      answer: "Approximately 299,792,458 meters per second",
      collection_id: 8,
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      collection_id: 9,
    },
    {
      question:
        "What art movement was characterized by its use of geometric shapes and bold colors?",
      answer: "Cubism",
      collection_id: 9,
    },
    {
      question:
        "Which artist is famous for his series of paintings of water lilies?",
      answer: "Claude Monet",
      collection_id: 9,
    },
    {
      question: "What is the binary representation of the decimal number 10?",
      answer: "1010",
      collection_id: 10,
    },

    {
      question:
        "What is the term for a programming language that uses English-like commands?",
      answer: "High-level programming language",
      collection_id: 10,
    },
    {
      question: "What does the acronym HTML stand for?",
      answer: "Hypertext Markup Language",
      collection_id: 10,
    },
    {
      question: "Who is known for the psychoanalytic theory of personality?",
      answer: "Sigmund Freud",
      collection_id: 11,
    },
    {
      question:
        "What is the psychological term for a person's unique pattern of thoughts, feelings, and behaviors?",
      answer: "Personality",
      collection_id: 11,
    },
    {
      question:
        "What is the process of acquiring new information and experiences called?",
      answer: "Learning",
      collection_id: 11,
    },
    {
      question:
        "What is the musical term for the speed at which a piece of music is played?",
      answer: "Tempo",
      collection_id: 12,
    },
    {
      question: "What are the three primary chords in the key of C major?",
      answer: "C major, F major, G major",
      collection_id: 12,
    },
    {
      question:
        "What is the term for a musical composition for a solo instrument accompanied by an orchestra?",
      answer: "Concerto",
      collection_id: 12,
    },
    {
      question:
        "What is the economic term for the total value of goods and services produced in a country in a given year?",
      answer: "Gross Domestic Product (GDP)",
      collection_id: 13,
    },
    {
      question:
        "What is the concept that describes the limited availability of resources in relation to unlimited wants?",
      answer: "Scarcity",
      collection_id: 13,
    },
    {
      question:
        "What is the economic term for the percentage of the labor force that is unemployed and actively seeking employment?",
      answer: "Unemployment rate",
      collection_id: 13,
    },
    {
      question:
        "What is the system of government in which power is held by the people and exercised through elected representatives?",
      answer: "Democracy",
      collection_id: 14,
    },
    {
      question: 'Who wrote the book "The Prince"?',
      answer: "Niccolò Machiavelli",
      collection_id: 14,
    },
    {
      question:
        "What is the term for a form of government in which a single ruler has absolute power?",
      answer: "Autocracy",
      collection_id: 14,
    },
    {
      question: "What is the largest organ in the human body?",
      answer: "The skin",
      collection_id: 15,
    },
    {
      question: "What is the medical term for the voice box?",
      answer: "Larynx",
      collection_id: 15,
    },
    {
      question:
        "What is the condition characterized by the inability to get sufficient sleep called?",
      answer: "Insomnia",
      collection_id: 15,
    },
    {
      question:
        "What is the term for the financial statement that shows a company's revenues, expenses, and profits over a specific period?",
      answer: "Income statement",
      collection_id: 16,
    },
    {
      question:
        "What is the economic term for the total market value of all final goods and services produced within a country in a given year?",
      answer: "Gross Domestic Product (GDP)",
      collection_id: 16,
    },
    {
      question:
        "What is the process of identifying potential risks and developing strategies to manage them called?",
      answer: "Risk management",
      collection_id: 16,
    },
    {
      question:
        "What is the term for the gradual increase in the Earth's average temperature due to human activities?",
      answer: "Global warming",
      collection_id: 17,
    },
    {
      question:
        "What is the term for the gradual increase in the Earth's average temperature due to human activities?",
      answer: "Global warming",
      collection_id: 17,
    },
    {
      question:
        "What is the study of the relationships between organisms and their environment called?",
      answer: "Ecology",
      collection_id: 17,
    },
    {
      question:
        "What is the term for the variety of life on Earth, including the diversity of species, ecosystems, and genetic variations?",
      answer: "Biodiversity",
      collection_id: 17,
    },
    {
      question: "What is the largest bone in the human body?",
      answer: "Femur",
      collection_id: 18,
    },
    {
      question:
        "What is the name of the muscle that separates the chest and abdominal cavities?",
      answer: "Diaphragm",
      collection_id: 18,
    },
    {
      question: "What is the medical term for the collarbone?",
      answer: "Clavicle",
      collection_id: 18,
    },
    {
      question: "Who is considered the founder of sociology?",
      answer: "Auguste Comte",
      collection_id: 19,
    },
    {
      question:
        "What is the term for a social group that an individual belongs to and identifies with?",
      answer: "In-group",
      collection_id: 19,
    },
    {
      question:
        "What is the theory that explains how society and social order are maintained through shared values and norms?",
      answer: "Functionalism",
      collection_id: 19,
    },
    {
      question: 'How do you say "hello" in French?',
      answer: "Bonjour",
      collection_id: 20,
    },
    {
      question: 'What is the Spanish word for "thank you"?',
      answer: "Gracias",
      collection_id: 20,
    },
    {
      question: 'What is the German word for "goodbye"?',
      answer: "Auf Wiedersehen",
      collection_id: 20,
    },
    {
      question: 'Who directed the movie "Citizen Kane"?',
      answer: "Orson Welles",
      collection_id: 21,
    },
    {
      question:
        "What is the term for a shot in which the camera moves vertically up or down?",
      answer: "Tilt shot",
      collection_id: 21,
    },
    {
      question:
        "What is the technique of combining two or more images to create a single image called?",
      answer: "Image compositing",
      collection_id: 21,
    },
    {
      question:
        "What is the term for the maximum amount of force a muscle or group of muscles can generate?",
      answer: "Muscle strength",
      collection_id: 22,
    },
    {
      question:
        "What is the process of increasing the intensity or duration of physical activity gradually called?",
      answer: "Progression",
      collection_id: 22,
    },
    {
      question:
        "What is the term for a condition characterized by the loss of bone mass and increased risk of fractures?",
      answer: "Osteoporosis",
      collection_id: 22,
    },
    {
      question:
        "What is the branch of engineering that deals with the design and construction of structures?",
      answer: "Civil engineering",
      collection_id: 23,
    },
    {
      question:
        "What is the process of converting raw materials into a finished product called?",
      answer: "Manufacturing",
      collection_id: 23,
    },
    {
      question:
        "What is the term for the ability of a material to transmit heat or electricity?",
      answer: "Conductivity",
      collection_id: 23,
    },
    {
      question:
        "What is the process of cooking food using dry heat in an oven or over an open flame called?",
      answer: "Baking",
      collection_id: 24,
    },
    {
      question: "What is the French term for a small, bite-sized appetizer?",
      answer: "Amuse-bouche",
      collection_id: 24,
    },
    {
      question:
        "What is the technique of cutting vegetables into very small, even cubes called?",
      answer: "Brunoise",
      collection_id: 24,
    },
    {
      question:
        "What is the principle that the accused is innocent until proven guilty called?",
      answer: "Presumption of innocence",
      collection_id: 25,
    },
    {
      question:
        "What is the Latin term for a legal document that orders a person to appear in court?",
      answer: "Subpoena",
      collection_id: 25,
    },
    {
      question:
        "What is the name for a person appointed by the court to represent a minor or an incapacitated adult in legal proceedings?",
      answer: "Guardian ad litem",
      collection_id: 25,
    },
    {
      question:
        "What is the term for the astrological sign that represents the balance, justice, and diplomacy?",
      answer: "Libra",
      collection_id: 26,
    },
    {
      question:
        "What is the study of the relationship between celestial events and human behavior called?",
      answer: "Astrology",
      collection_id: 26,
    },
    {
      question:
        "What is the term for the imaginary line that divides the Earth into the northern and southern hemispheres?",
      answer: "Equator",
      collection_id: 26,
    },
    {
      question:
        "What is the term for reporting news stories in a fair, unbiased, and objective manner?",
      answer: "Objective journalism",
      collection_id: 27,
    },
    {
      question:
        "What is the legal and ethical principle that protects journalists from revealing their sources?",
      answer: "Confidentiality",
      collection_id: 27,
    },
    {
      question:
        "What is the term for a sensationalized or exaggerated news story intended to attract attention?",
      answer: "Tabloid",
      collection_id: 27,
    },
    {
      question:
        "What is the term for a large, vertical pillar that supports the weight of a building or structure?",
      answer: "Column",
      collection_id: 28,
    },
    {
      question:
        "What is the style of architecture characterized by pointed arches, ribbed vaults, and flying buttresses?",
      answer: "Gothic architecture",
      collection_id: 28,
    },
    {
      question:
        "What is the name of the famous architectural site located in Agra, India, known for its white marble mausoleum?",
      answer: "Taj Mahal",
      collection_id: 28,
    },
    {
      question:
        "What is the term for a giant, luminous sphere of hot gas held together by gravity?",
      answer: "Star",
      collection_id: 29,
    },
    {
      question:
        "What is the name of the galaxy that contains our solar system?",
      answer: "Milky Way",
      collection_id: 29,
    },
    {
      question:
        "What is the term for the event in which a planet passes between the Earth and the Sun, obscuring the view of the Sun?",
      answer: "Solar eclipse",
      collection_id: 29,
    },
  ]);
};
