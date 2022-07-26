export default function listAccessibleName() {
  const config = {};
  const builder = {};

  const title = (title) => {
    config.title = title;
    return builder;
  };

  const items = (items) => {
    config.items = items;
    return builder;
  };

  const build = () => {
    const listTitle = config.title;
    const itemTitles = config.items.reduce(
      (text, current) => (text += current.title),
      ""
    );
    return listTitle + itemTitles;
  };

  builder.title = title;
  builder.items = items;
  builder.build = build;

  return builder;
}
