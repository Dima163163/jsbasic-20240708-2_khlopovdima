function checkSpam(str) {
  const spamStr = str.toLowerCase();

  if (spamStr.includes('1xbet') || spamStr.includes('xxx')) {
    return true;
  }

  return false;
}
