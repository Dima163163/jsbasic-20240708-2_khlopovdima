/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.createTable(rows);
    this.checkDelete(this.elem);
  }

  createTable(rows) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');

    const thName = document.createElement('th');
    thName.textContent = 'Имя';
    const thAge = document.createElement('th');
    thAge.textContent = 'Возраст';
    const thSalary = document.createElement('th');
    thSalary.textContent = 'Зарплата';
    const thCity = document.createElement('th');
    thCity.textContent = 'Город';
    const thDelete = document.createElement('th');

    const tBody = document.createElement('tbody');

    trHead.append(thName, thAge, thSalary, thCity, thDelete);
    thead.append(trHead);
    table.append(thead, tBody);


    rows.forEach(item => {
      const trBody = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = item.name;

      const tdAge = document.createElement('td');
      tdAge.textContent = item.age;

      const tdSalary = document.createElement('td');
      tdSalary.textContent = item.salary;

      const tdCity = document.createElement('td');
      tdCity.textContent = item.city;

      const tdDelete = document.createElement('td');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';

      tdDelete.append(deleteButton);
      trBody.append(tdName, tdAge, tdSalary, tdCity, tdDelete);
      tBody.append(trBody);
    });

    return table;
  }

  checkDelete(elem) {
    elem.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches('button')) {
        const elementTr = target.closest('tr');
        elementTr.remove();
      }
    });
  }
}
