function isEmpty(obj) {
  if (!!Object.keys(obj).length) {
    return false;
  }

  return true;
}
