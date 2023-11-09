const form = document.querySelector("form");
const taskList = document.querySelector("#taskList");
const outNumberTasks = document.querySelector("#outNumberTasks");
const btnClearList = document.querySelector("#btnClearList");
const btnSortHigh = document.querySelector("#btnSortHigh");
const btnSortChip = document.querySelector("#btnSortChip");
const btnSortAction = document.querySelector("#btnSortAction");
const btnShowAll = document.querySelector("#btnShowAll");
const SEQUENCE_NUMBER_ENTER = 13;
let newArr = JSON.parse(localStorage.getItem("tasks"));
let taskArray = [];

if (newArr) {
    for (let elem of newArr) {
      console.log(newArr)
        createTask(elem.name, elem.cost, elem.id, elem.discount);
    }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = prompt("Введіть назву товару", "");
  let cost = +prompt("Введіть ціну товару", "");
  let id = +prompt("Введіть id товару", "");
  let discount = +prompt(
    "Введіть знижку товару (пропустіть натиснувши Enter якщо знижки немає)",
    "0"
  );
  taskArray.push({name, cost, id, discount});
  createTask(name, cost, id, discount);
});

function createTask(name, cost, id, disc) {
  const liMain = document.createElement("li");
  const ul = document.createElement("ul");
  const liName = document.createElement("li");
  const liCost = document.createElement("li");
  const liId = document.createElement("li");
  const liDisc = document.createElement("li");
  const spanDisc = document.createElement("span");
  const spanAf = document.createElement("span");
  const spanCost = document.createElement("span");
  const spanAfCo = document.createElement("span");
  const buttonEdit = document.createElement("button");
  const buttonDelete = document.createElement("button");
  liMain.className = "task";
  ul.className = "taskText task";
  liName.className = "task";
  liCost.className = "task";
  liId.className = "task";
  liDisc.className = "task";
  buttonEdit.className = "taskButton btnEdit";
  buttonDelete.className = "taskButton btnDelete";
  liName.textContent = `Назва товару: ${name}`;
  liCost.textContent = `Ціна товару: `;
  spanCost.textContent = `${Math.round(cost - ((cost/100)*disc))}`;
  spanAfCo.textContent = "грн";
  liId.textContent = `Id товару: ${id}`;
  liDisc.textContent = "Знижка товару: ";
  spanDisc.textContent = ` ${disc}`;
  spanAf.textContent = "%";
  buttonDelete.textContent = "Delete";
  buttonEdit.textContent = "Edit";
  liDisc.append(spanDisc);  
  liDisc.append(spanAf);  
  liDisc.append(buttonEdit);  
  liCost.append(spanCost);  
  liCost.append(spanAfCo);  
  ul.append(liName);  
  ul.append(liCost);  
  ul.append(liId);  
  ul.append(liDisc);
  liMain.append(ul);
  liMain.append(buttonDelete);
  taskList.append(liMain);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  taskList.style.visibility = "visible";
  outNumberTasks.textContent = `${taskArray.length}`;
  addListener(buttonDelete, buttonEdit, spanDisc, liMain, id, cost, spanCost);
}

function addListener(buttonDelete, buttonEdit, spanDisc, liMain, liId, cost, spanCost) {
  buttonDelete.addEventListener("click", () => {
    liMain.remove();
    let res = taskArray.findIndex((elem) => elem.id === liId);
    taskArray.splice(res, 1);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    outNumberTasks.textContent = `${taskArray.length}`;
  });

  buttonEdit.addEventListener("click", () => {
    let newDisc = +prompt("Введіть нову знижку","");
    if (newDisc <= 0 || newDisc >= 100) spanDisc.textContent = "0";
    spanDisc.textContent = newDisc;
    taskArray.forEach(function (elem) {
      if (elem.id == liId) {
        elem.discount = newDisc;
        spanCost.textContent = `${Math.round(cost - ((cost/100)*elem.disc))}`;
        }
      });
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  });
}

btnClearList.addEventListener("click", () => {
  taskList.innerHTML = "";
  taskArray = [];
  outNumberTasks.textContent = `${taskArray.length}`;
  localStorage.setItem("tasks", JSON.stringify(taskArray));
});

btnSortHigh.addEventListener("click", () => {
  taskList.innerHTML = "";
  let high = taskArray;
  function compareNumeric(a, b) {
    if (a.cost < b.cost) return 1;
    if (a.cost == b.cost) return 0;
    if (a.cost > b.cost) return -1;
  }
  high.sort(compareNumeric)
  createTask(high[0].name, high[0].cost, high[0].id, high[0].discount);
});

btnSortChip.addEventListener("click", () => {
  taskList.innerHTML = "";
  let high = taskArray;
  function compareNumeric(a, b) {
    if (a.cost > b.cost) return 1;
    if (a.cost == b.cost) return 0;
    if (a.cost < b.cost) return -1;
  }
  high.sort(compareNumeric)
  createTask(high[0].name, high[0].cost, high[0].id, high[0].discount);
});

btnSortAction.addEventListener("click", () => {
  taskList.innerHTML = "";
  let actionArray = taskArray.filter(elem => elem.discount > 0)
  for (let task of actionArray) {
    createTask(task.name, task.cost, task.id, task.discount);
  }
  });

btnShowAll.addEventListener("click", () => {
  taskList.innerHTML = "";
  for (let task of taskArray) {
    createTask(task.name, task.cost, task.id, task.discount);
  }
});

