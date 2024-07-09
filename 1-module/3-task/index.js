function ucFirst(str) {
  if (str !== '') {
    const name = str[0].toUpperCase() + str.slice(1).toLowerCase();
    return name;
  }

  return '';
}
