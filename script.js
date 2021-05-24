let input = document.querySelector(".input");
let taskCont = document.querySelector(".task_cont");
let footer = document.querySelector(".footer");
let item = document.querySelector(".item");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let all = document.querySelector(".all");
let clear = document.querySelector(".clear");
let arrow = document.querySelector(".arrow");
let faArrow = document.querySelector(".fa-chevron-down");
arrTask = [];
let id = 0;
let value = 0;
let g = undefined;

input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    work();
  }
});

function work() {
 
  if (input.value.trim().length != 0 && inpcheck(input.value)) {

    let task = `<div class="task" id="${id}">
                    <input type="checkbox" class="check" id="${id}h" value="${value}" onclick="foo(event,value)">
                    <label for="${id}h" class="label"></label>
                    <p>${input.value}</p>
                    <div class="cross " value="${value}" onclick="del(event)">
                      <div class ="fas fa-times"></div>
                    </div>
                </div> `;  
    
    taskCont.insertAdjacentHTML("beforeend", task);

    
    id++ 
    value++
    footer.classList.add("d_Flex")
     arrow.classList.add("visible");
     all.classList.add("bord");
    countItem();
  }
  input.value = "";
}

//проверка на дубликаты 
function inpcheck(arg) {
  let checkA = arrTask.some((item) => item.task === arg);
  arrTask.push({ task: arg, checkedArr: false, ID: id });
  if (checkA) {
    arrTask.pop();
    return false;
  }
  return true;
}

//счетчик активных задач
function countItem() {
    let checkActive = undefined
    checkActive = arrTask.filter((item) => item.checkedArr === false);

  if (checkActive.length == 0 || checkActive.length > 1) {
    item.textContent = `${checkActive.length} items left`;
  } else {
    item.textContent = `${checkActive.length} item left`;
  }
}

//checkbox 
function foo(arg,value){
   if (arg.target.checked) {
     arg.target.parentNode.classList.add("through", "minOpacity");
     arrTask[value].checkedArr = true;
     
   } else {
     arg.target.parentNode.classList.remove("through", "minOpacity");
     arrTask[value].checkedArr = false;

   }
   review();
   countItem();
   arrowOpac();
   visibleCLear();
}

arrow.onclick = function () {
  let check = document.querySelectorAll(".check");

  //проверяем есть ли в масиве хоть один не отмеченный индекс
  let isCheked = arrTask.some((item) => item.checkedArr === false);

  //меняем их значения в массиве 
  for (let i = 0; i < check.length; i++) {
    if (isCheked) {
      check[i].checked = isCheked;
      arrTask[i].checkedArr = isCheked;
      check[i].parentNode.classList.add("through","minOpacity");  
    } else {
      check[i].checked = isCheked;
      arrTask[i].checkedArr = isCheked;
      check[i].parentNode.classList.remove("through", "minOpacity");
    }
  }
  review();
  arrowOpac()
  countItem();
  visibleCLear();
};


//уменьшает/увеличивает прозрачность стрелки
function arrowOpac(){
  let isCheked_2 = arrTask.some((item) => item.checkedArr === false);
  let isChekedAll = arrTask.every((item) => item.checkedArr === false);
  let isChekedAll2 = arrTask.every((item) => item.checkedArr === true);

  if(completed.classList.contains("bord") && isChekedAll){
    arrow.classList.remove("visible")
  }else if (active.classList.contains("bord") && isChekedAll2){
    arrow.classList.remove("visible")
  }else{
    arrow.classList.add("visible")
  }
    if (isCheked_2) {
      arrow.classList.remove("maxOpacity");
    } else {
      arrow.classList.add("maxOpacity");
    }
 
}

//показывает/скрывает кнопку cleare completed
function visibleCLear() {
  let isCheced_3 = arrTask.some(item => item.checkedArr === true);
  if (isCheced_3) {
    clear.classList.add("visible")
  } else {
    clear.classList.remove("visible");
  }
}


all.onclick = function () {
  all.classList.add("bord");
  active.classList.remove("bord");
  completed.classList.remove("bord");

  for (let i = 0; i < arrTask.length; i++) {
    g = document.getElementById(`${arrTask[i].ID}`);
    g.classList.remove("d_None");
  }
   arrowOpac();
};


active.onclick = function () {
  all.classList.remove("bord");
  active.classList.add("bord");
  completed.classList.remove("bord");

  for (let i = 0; i < arrTask.length; i++) {
    if (arrTask[i].checkedArr === false) {
      g = document.getElementById(`${arrTask[i].ID}`);
      g.classList.remove("d_None");
    } else {
      g = document.getElementById(`${arrTask[i].ID}`);
      g.classList.add("d_None");
    }
  }
   arrowOpac();
};


completed.onclick = function () {
  all.classList.remove("bord");
  active.classList.remove("bord");
  completed.classList.add("bord");

  for (let i = 0; i < arrTask.length; i++) {
    if (arrTask[i].checkedArr === false) {
      g = document.getElementById(`${arrTask[i].ID}`);
      g.classList.add("d_None");
    } else {
      g = document.getElementById(`${arrTask[i].ID}`);
      g.classList.remove("d_None")
    }
  }
   arrowOpac();
};



//clear complete
clear.onclick = function () {

  for (let i = 0; i < arrTask.length; i++) {
    if (arrTask[i].checkedArr === true) {
      g = document.getElementById(`${arrTask[i].ID}`);
      g.remove();
      delete arrTask[i]
    }
  }
    arrTask = arrTask.filter((item) => item != undefined);
  drop();
};



//очистка одного элемента
function del(event) {
  let valueCross = event.target.getAttribute("value");

  // удаляем из массива элемент
  for (let i = 0; i < arrTask.length; i++) {
    if (arrTask[i].ID == valueCross) {
      g = document.getElementById(`${arrTask[i].ID}`);
      g.remove();
      arrTask.splice(i, 1);
    }
  }
  //прогоняем для сброса всех значений
  drop();
}


function review() {
  if (active.classList.contains("bord")) {
    for (let i = 0; i < arrTask.length; i++) {
      if (arrTask[i].checkedArr=== true) {
        g = document.getElementById(`${arrTask[i].ID}`);
        g.classList.add("d_None");
      } else {
        g = document.getElementById(`${arrTask[i].ID}`);
        g.classList.remove("d_None");
      }
    }
  } else if (completed.classList.contains("bord")) {
    for (let i = 0; i < arrTask.length; i++) {
      if (arrTask[i].checkedArr === false) {
        g = document.getElementById(`${arrTask[i].ID}`);
        g.classList.add("d_None");
      } else {
        g = document.getElementById(`${arrTask[i].ID}`);
         g.classList.remove("d_None");
      }
    }
  }
  arrowOpac()
}

function drop() {
  let check = document.querySelectorAll(".check");
  let task = document.querySelectorAll(".task");
  let cross = document.querySelectorAll(".cross");

  for (let i = 0; i < arrTask.length; i++) {
    check[i].setAttribute("value", `${i}`);
    task[i].id = i;
    cross[i].setAttribute("value", `${i}`);
    arrTask[i].ID = i;
  }

  id = arrTask.length;
  value = arrTask.length;

  if (arrTask.length === 0) {
    arrTask = [];
    id = 0;
    value = 0;
    arrow.classList.remove("visible", "maxOpacity" );
    footer.classList.remove("d_Flex")
    clear.classList.remove("visible")
  }

  countItem();
}
