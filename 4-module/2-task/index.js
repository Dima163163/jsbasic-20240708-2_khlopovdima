function makeDiagonalRed(table) {
  const rowsLength = table.rows.length;
  const rows = table.rows;
  for (let i = 0; i < rowsLength; i++) {
    const row = rows[i];
    row.cells[i].style = 'background-color: red;';
  }
}
