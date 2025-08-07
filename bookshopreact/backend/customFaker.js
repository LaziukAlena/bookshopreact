import { Faker } from '@faker-js/faker';
import { en, de, ja } from '@faker-js/faker';

const localeMap = {
  en,
  de,
  ja,
};

export function getFakerByLocale(locale = 'en') {
  const selected = localeMap[locale] || en;
  return new Faker({ locale: selected });
}

export function generateBook(index, locale = 'en') {
  const faker = getFakerByLocale(locale);

  return {
    isbn: faker.string.uuid(),
    title: faker.lorem.words(3),
    authors: [faker.person.fullName()],
    publisher: faker.company.name(),
    cover: faker.image.urlPicsumPhotos({ width: 200, height: 300 }),
    reviews: faker.number.float({ min: 0, max: 10 }),
    likes: faker.number.float({ min: 0, max: 10 }),
    description: faker.lorem.paragraph(),
    index,
  };
}

export function generateBooks(count = 10, start = 0, locale = 'en') {
  return Array.from({ length: count }, (_, i) =>
    generateBook(start + i + 1, locale)
  );
}



