const cacheBuilder = () => {
  const builder = {};

  let store = {};
  const cache = {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value && value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };

  function build() {
    return cache;
  }

  builder.build = build;

  return builder;
};

export default cacheBuilder;
