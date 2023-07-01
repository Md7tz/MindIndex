require("dotenv").config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // get first user id
  const user = await knex('users').where({ username: process.env.DEFAULT_USER }).first()
  const user_id = user.id

  // Deletes ALL existing entries and restart identity
  await knex('collections').truncate()

  await knex('collections').insert([
    { name: 'Biology', description: 'A set of science flashcards about general knowledge about biology topics', created_at: '2023-05-10 12:20:56.530593+08', user_id },
    { name: 'History', description: 'A collection of flashcards covering major historical events and figures', created_at: '2023-05-11 12:20:56.775846+08', user_id },
    { name: 'Mathematics', description: 'A comprehensive set of math flashcards covering various topics and formulas', created_at: '2023-05-12 12:20:56.785161+08', user_id },
    { name: 'Languages', description: 'Flashcards to help you learn and practice vocabulary and phrases in different languages', created_at: '2023-05-13 12:20:56.812023+08', user_id },
    { name: 'Geography', description: 'A collection of flashcards to test your knowledge of world geography and capitals', created_at: '2023-05-14 12:20:56.821201+08', user_id },
    { name: 'Chemistry', description: 'Flashcards covering the periodic table, chemical reactions, and fundamental concepts in chemistry', created_at: '2023-05-15 12:20:56.84487+08', user_id },
    { name: 'Literature', description: 'A set of flashcards featuring famous literary works and authors', created_at: '2023-05-16 12:20:56.908557+08', user_id },
    { name: 'Physics', description: 'Flashcards covering fundamental principles of physics and key formulas', created_at: '2023-05-17 12:20:56.95903+08', user_id },
    { name: 'Art History', description: 'Flashcards to help you learn about famous artworks, artists, and art movements', created_at: '2023-05-18 12:20:57.003162+08', user_id },
    { name: 'Computer Science', description: 'A comprehensive collection of flashcards covering various topics in computer science', created_at: '2023-05-19 12:20:57.069058+08', user_id },
    { name: 'Psychology', description: 'Flashcards to help you study psychological theories, concepts, and notable psychologists', created_at: '2023-05-20 12:20:57.141239+08', user_id },
    { name: 'Music Theory', description: 'A set of flashcards to aid in learning music theory concepts, scales, and chords', created_at: '2023-05-21 12:20:57.192241+08', user_id },
    { name: 'Economics', description: 'Flashcards covering fundamental economic principles, theories, and terms', created_at: '2023-05-22 12:20:57.233932+08', user_id },
    { name: 'Political Science', description: 'A collection of flashcards to help you study political systems, ideologies, and key figures', created_at: '2023-05-23 12:20:57.294829+08', user_id },
    { name: 'Medicine', description: 'Flashcards covering medical terminology, anatomy, and common medical conditions', created_at: '2023-05-24 12:20:57.377619+08', user_id },
    { name: 'Business', description: 'A comprehensive set of flashcards covering various business concepts and principles', created_at: '2023-05-25 12:20:57.434302+08', user_id },
    { name: 'Environmental Science', description: 'Flashcards to help you learn about environmental issues, sustainability, and ecosystems', created_at: '2023-05-26 12:20:57.510653+08', user_id },
    { name: 'Anatomy', description: 'A collection of flashcards to aid in learning human anatomy and physiology', created_at: '2023-05-27 12:20:57.55176+08', user_id },
    { name: 'Sociology', description: 'A set of flashcards to study sociological theories, concepts, and social issues', created_at: '2023-05-29 12:33:17.268316+08', user_id },
    { name: 'Foreign Languages', description: 'Flashcards to help you learn vocabulary, grammar, and expressions in foreign languages', created_at: '2023-05-30 12:33:36.614495+08', user_id },
    { name: 'Film Studies', description: 'A collection of flashcards to study influential films, directors, and cinematic techniques', created_at: '2023-05-31 12:33:42.173594+08', user_id },
    { name: 'Physical Education', description: 'Flashcards covering various sports, exercises, and fitness concepts', created_at: '2023-06-01 12:33:48.341005+08', user_id },
    { name: 'Engineering', description: 'A comprehensive set of flashcards covering different engineering disciplines and concepts', created_at: '2023-06-02 12:33:54.468904+08', user_id },
    { name: 'Culinary Arts', description: 'Flashcards to help you learn cooking techniques, recipes, and culinary terms', created_at: '2023-06-03 12:33:58.542266+08', user_id },
    { name: 'Law', description: 'A set of flashcards covering legal terms, principles, and notable court cases', created_at: '2023-06-04 12:34:02.482268+08', user_id },
    { name: 'Astrology', description: 'Flashcards to help you learn about zodiac signs, planetary positions, and astrological concepts', created_at: '2023-06-05 12:34:07.76152+08', user_id },
    { name: 'Journalism', description: 'A collection of flashcards to study journalism ethics, news writing, and media literacy', created_at: '2023-06-06 12:34:14.799607+08', user_id },
    { name: 'Architecture', description: 'Flashcards covering architectural styles, famous buildings, and design principles', created_at: '2023-06-07 12:34:19.092787+08', user_id },
    { name: 'Astronomy', description: 'A set of flashcards to study celestial bodies, astronomical phenomena, and the universe', created_at: '2023-06-08 12:34:23.676198+08', user_id },
    { name: 'Architecture', description: 'Flashcards covering architectural styles, famous buildings, and design principles', created_at: '2023-06-07 13:21:46.311677+08', user_id },
  ]);
};
