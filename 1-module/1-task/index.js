function factorial(n) {
  let result = 1;
  for (let i = 0; i <= n; i++) {
    if (i === 0 || i === 1) {
      result *= 1;
    } else {
      result *= i;
    }
  }
  return result;
}