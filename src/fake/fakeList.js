import { faker } from "@faker-js/faker";

export const createDummyData = () => {
  const size = faker.datatype.number({
    min: 3,
    max: 10,
  });

  return [...Array(size)].map(() => {
    return {
      id: faker.datatype.uuid(),
      completed: faker.datatype.boolean(),
      message: faker.lorem.sentence(3),
      title: faker.lorem.sentence(4),
    };
  });
};
