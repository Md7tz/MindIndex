/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notes').del()
  await knex('notes').insert([
    { title: 'The Art of Problem Solving', body: 'Unlocking the beauty of mathematics through problem-solving techniques.', created_at: '2023-06-01 09:00:00', user_id: 3 },
    { title: 'Exploring the Cosmos', body: 'Journeying through the wonders of the universe and the mysteries of physics.', created_at: '2023-06-02 10:30:00', user_id: 3 },
    { title: 'Alchemy: From Elements to Elixirs', body: 'Unraveling the secrets of chemistry and its transformative powers.', created_at: '2023-06-03 11:45:00', user_id: 3 },
    { title: 'The Web of Life', body: 'Diving into the intricacies of biology and the interconnectedness of living organisms.', created_at: '2023-06-04 13:15:00', user_id: 3 },
    { title: 'Chronicles of the Past', body: 'Unveiling the tales of ancient civilizations and the lessons they teach us.', created_at: '2023-06-05 14:45:00', user_id: 3 },
    { title: 'Geographical Wonders', body: 'Embarking on a virtual tour of breathtaking landscapes and geographical phenomena.', created_at: '2023-06-06 16:30:00', user_id: 3 },
    { title: 'Literary Escapades', body: 'Immersing ourselves in the world of words, exploring the works of renowned authors.', created_at: '2023-06-07 09:30:00', user_id: 3 },
    { title: 'The Brush Symphony', body: 'Discovering the diverse expressions of art through strokes of creativity.', created_at: '2023-06-08 10:45:00', user_id: 3 },
    { title: 'Melodies of the Soul', body: 'Unraveling the power of music to move hearts and stir emotions.', created_at: '2023-06-09 12:15:00', user_id: 3 },
    { title: 'Coding the Future', body: 'Diving into the world of algorithms, data structures, and programming languages.', created_at: '2023-06-10 13:45:00', user_id: 3 },
    { title: 'Unraveling the Mind', body: 'Exploring the depths of human psychology and understanding the complexities of the human mind.', created_at: '2023-06-11 15:30:00', user_id: 3 },
    { title: 'Society Under the Microscope', body: 'Analyzing the dynamics, structures, and impact of societies around the globe.', created_at: '2023-06-12 09:00:00', user_id: 3 },
    { title: 'The Economy Unveiled', body: 'Decoding the mechanisms and forces that shape local and global economies.', created_at: '2023-06-13 10:30:00', user_id: 3 },
    { title: 'Politics: A Web of Power', body: 'Unraveling the intricacies of political systems and the pursuit of governance.', created_at: '2023-06-14 11:45:00', user_id: 3 },
    { title: 'The Philosophy of Existence', body: 'Delving into profound questions about life, reality, and the nature of existence.', created_at: '2023-06-15 13:15:00', user_id: 3 },
    { title: 'Engineering Wonders', body: 'Discovering groundbreaking inventions and the marvels of engineering.', created_at: '2023-06-16 14:45:00', user_id: 3 },
    { title: 'The Healing Arts', body: 'Exploring the realm of medicine and the pursuit of physical and mental well-being.', created_at: '2023-06-17 16:30:00', user_id: 3 },
    { title: 'Architectural Marvels', body: 'Unveiling the fusion of science, art, and culture in architectural wonders.', created_at: '2023-06-18 09:30:00', user_id: 3 },
    { title: 'From Field to Arena', body: 'Immersing in the world of sports, from historical achievements to modern competitions.', created_at: '2023-06-19 10:45:00', user_id: 3 },
    { title: 'Culinary Adventures', body: 'Embarking on a gastronomic journey, exploring flavors from around the world.', created_at: '2023-06-20 12:15:00', user_id: 3 },
    { title: 'Fashion: The Language of Style', body: 'Discovering the artistry and cultural significance woven into the world of fashion.', created_at: '2023-06-21 13:45:00', user_id: 3 },
    { title: 'Blossoms of Serenity', body: 'Embracing the therapeutic benefits and creativity of gardening.', created_at: '2023-06-22 15:30:00', user_id: 3 },
    { title: 'Stargazing and Beyond', body: 'Unveiling the mysteries of astrology and the cosmic wonders of the universe.', created_at: '2023-06-23 09:00:00', user_id: 3 },
    { title: 'Mythology: Tales of Ancient Gods', body: 'Exploring captivating myths and legends from different cultures.', created_at: '2023-06-24 10:30:00', user_id: 3 },
    { title: 'Linguistic Treasures', body: 'Embarking on a linguistic journey, celebrating the diversity of languages worldwide.', created_at: '2023-06-25 11:45:00', user_id: 3 },
    { title: 'Wanderlust Chronicles', body: 'Venturing into the realm of travel, discovering new destinations and experiences.', created_at: '2023-06-26 13:15:00', user_id: 3 },
    { title: 'The Art of Capturing Moments', body: 'Unleashing creativity through the lens, exploring the world of photography.', created_at: '2023-06-27 14:45:00', user_id: 3 },
    { title: 'Celluloid Magic', body: 'Diving into the captivating world of cinema, from timeless classics to modern masterpieces.', created_at: '2023-06-28 16:30:00', user_id: 3 },
    { title: 'Fitness Revolution', body: 'Unlocking the potential of physical fitness for a healthier and more vibrant life.', created_at: '2023-06-29 09:30:00', user_id: 3 },
    { title: 'Yoga: Harmony of Body and Mind', body: 'Exploring the ancient practice of yoga for holistic well-being and inner peace.', created_at: '2023-06-30 10:45:00', user_id: 3 },
    { title: 'The Journey of Self-Improvement', body: 'Embarking on a transformative path of personal growth and development.', created_at: '2023-07-01 12:15:00', user_id: 3 },
    { title: 'Ecology: Nurturing Our Planet', body: 'Understanding the delicate balance of nature and our role in environmental stewardship.', created_at: '2023-07-02 13:45:00', user_id: 3 },
    { title: 'Tech Innovations: Shaping the Future', body: 'Unveiling cutting-edge technologies and their impact on society and industries.', created_at: '2023-07-03 15:30:00', user_id: 3 },
    { title: 'The Written Word', body: 'Exploring the power of writing as a tool for communication, expression, and storytelling.', created_at: '2023-07-04 09:00:00', user_id: 3 }
  ]);
};
