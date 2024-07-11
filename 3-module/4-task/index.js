function showSalary(users, age) {
  const fileredUsers = users.filter(user => user.age <= age);

  const newStr = fileredUsers.reduce((acc, user, i) => {
    return acc += `${user.name}, ${user.balance}${i === fileredUsers.length - 1 ? '' : '\n'}`;
  }
  , '');

  return newStr;
}
