const isUninitialized = (value): boolean => {
  const isUndefined = value === undefined;
  const isNull = value === null;
  const isnan = Number.isNaN(value);
  return isUndefined || isNull || isnan;
}

export default isUninitialized;
