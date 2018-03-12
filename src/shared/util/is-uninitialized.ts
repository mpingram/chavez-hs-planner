const isUninitialized = (value): boolean => {
  const isUndefined = value === undefined;
  const isnan = isNaN(value);
  return isUndefined || isnan;
}

export default isUninitialized;
