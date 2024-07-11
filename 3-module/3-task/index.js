function camelize(str) {
  let arrStr = str.split('-');
  arrStr = arrStr.map((item, i) => i !== 0 ? item[0].toUpperCase() + item.slice(1).toLowerCase() : item);
  return arrStr.join('');
}
