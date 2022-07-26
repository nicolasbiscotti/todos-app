export const givenThatCache = (cache) => {
  const config = {};
  const given = {};

  const alreadyHasItem = (key) => {
    config.key = key;
    return given;
  };

  const withValue = (rawValue) => {
    cache.setItem(config.key, JSON.stringify(rawValue));
  };

  given.alreadyHasItem = alreadyHasItem;
  given.withValue = withValue;

  return given;
};
