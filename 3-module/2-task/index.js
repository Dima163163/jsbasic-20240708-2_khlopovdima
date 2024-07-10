function filterRange(arr, a, b) {
  const newArrNumbers = [];

  for (let number of arr) {
    if (number >= a && number <= b) {
      newArrNumbers.push(number);
    }
  }

  return newArrNumbers;
}
