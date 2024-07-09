function truncate(str, maxlength) {
  if (str.length > maxlength) {
    const newStr = str.substring(0, maxlength - 1) + '…';
    return newStr;
  }

  return str;
}
