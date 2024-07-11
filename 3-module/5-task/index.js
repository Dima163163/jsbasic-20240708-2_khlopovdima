function getMinMax(str) {
  const numbersArr = str.split(' ').filter(item => !isNaN(+item));

  return {
    min: Math.min(...numbersArr),
    max: Math.max(...numbersArr),
  };
}
