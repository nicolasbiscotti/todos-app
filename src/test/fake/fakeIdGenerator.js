import { FakeMessages } from "./fakeErrorMessages";

const fakeIdGenerator = () => {
  const fakeIds = [];

  const idGenerator = {};

  const next = () => {
    if (fakeIds.length === 0) {
      throw new Error(FakeMessages.GENERATOR_DOES_NOT_HAVE_NEXT);
    }
    return fakeIds.shift();
  };

  const add = (id) => fakeIds.push(id);

  idGenerator.next = next;
  idGenerator.add = add;

  return idGenerator;
};

export default fakeIdGenerator;
