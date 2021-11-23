export default (object, compareTo) => (
  Object
    .entries(object)
    .every(([key, value]) => (
      Object
        .entries(compareTo)
        .some(([compareKey, compareValue]) => (
          Object.is(key, compareKey)
          && Object.is(value, compareValue)
        ))
    ))
);
