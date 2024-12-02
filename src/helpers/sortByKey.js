export const sortByKey = (originalArray, orderArray, key) => {
  const clone = [...originalArray];
  clone.sort((a, b) => {
    const aIndex = orderArray.indexOf(a[key].toString());
    const bIndex = orderArray.indexOf(b[key].toString());
    return aIndex - bIndex;
  });
  return clone;
};