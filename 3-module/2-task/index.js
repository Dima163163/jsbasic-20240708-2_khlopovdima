function filterRange(arr, a, b) {
  const newArrNumbers = arr.filter((number) => number >= a && number <= b);

  return newArrNumbers;
}
