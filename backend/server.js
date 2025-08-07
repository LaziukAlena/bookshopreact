import express from 'express';
import cors from 'cors';
import { Faker, en, de, ja } from '@faker-js/faker';
import seedrandom from 'seedrandom';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/api/books', (req, res) => {
  const {
    locale = 'en',
    seed = 0,
    reviews = 0.5,
    likes = 0.5,
    start = 0,
    count = 20,
  } = req.query;

  const localeMap = { en, de, ja };
  const selectedLocale = localeMap[locale] || en;

  const books = [];

  for (let i = 0; i < count; i++) {
    const index = Number(start) + i;

  
    const rng = seedrandom(`${seed}_${locale}_${index}`);

    const likeRandom = rng();
    const reviewRandom = rng();
    const fakerSeed = Math.floor(rng() * 1_000_000); 

    const faker = new Faker({ locale: selectedLocale });
    faker.seed(fakerSeed);

    const title = faker.lorem.words(3);
    const author = faker.person.fullName();
    const publisher = faker.company.name();
    const description = faker.lorem.paragraphs(2);

    const isbn = `${faker.string.numeric(10)}${index.toString().padStart(3, '0')}`;

    const likeCount = Math.min(10, Math.round(likeRandom * 10 * parseFloat(likes) * 10) / 10);
    const reviewCount = Math.min(10, Math.round(reviewRandom * 10 * parseFloat(reviews) * 10) / 10);

    books.push({
      index,
      title,
      author,
      publisher,
      isbn,
      cover: `https://picsum.photos/seed/${isbn}/200/300`,
      reviews: reviewCount,
      likes: likeCount,
      description,
    });
  }

  res.json(books);
});

app.get('/', (req, res) => {
  res.send('📚 Bookshop API is running');
});


app.listen(port, () => {
  console.log(`✅ Backend listening at http://localhost:${port}`);
});











