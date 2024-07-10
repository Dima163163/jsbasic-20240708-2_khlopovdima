function namify(users) {
  const newArrNames = [];

  for (let user of users) {
    newArrNames.push(user.name);
  }

  return newArrNames;
}
