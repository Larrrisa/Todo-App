"use strict";

const icon = document.querySelector(".icon");
const newItem = document.querySelector(".new-item");
const todoItems = document.querySelectorAll(".todo-item");
const items = document.querySelectorAll(".item");
const form = document.querySelector(".form");
const body = document.body;
const deleteBtns = document.querySelectorAll(".delete");
const countItems = document.querySelector(".actual-state");
const filterCompletedItem = document.querySelector(".filter-completed");
const filterActiveItem = document.querySelector(".filter-active");
const filterClear = document.querySelector(".filter-clear");
const clearCompletedItem = document.querySelector(".clear");
const checkbox = document.querySelectorAll(".checkbox");

//CHANGE THEME
icon.addEventListener("click", function () {
  body.classList.toggle("light");
});

//COUNT ITEMS
let countTodoItems = function () {
  countItems.textContent = `${form.children.length} items left`;
  if (form.children.length === 1) {
    countItems.textContent = `${form.children.length} item left`;
  }
};

countTodoItems();

//ADD NEW ITEM
newItem.onkeyup = keyup;

function keyup(e) {
  if (e.keyCode === 13 && newItem.value !== "") {
    let div = document.createElement("div");
    div.className = "todo-item";
    div.innerHTML = `<div class="item">
    <input type="checkbox" class="checkbox">
    <p class="item-description">${newItem.value}</p>
    <button class="delete">
    <img src="/images/icon-cross.svg" alt="" class="delete">
    </button>
    </div>`;
    form.prepend(div);

    newItem.value = "";

    //LISTENERS FOR NEW ITEMS
    div.addEventListener("click", function (e) {
      //DELETE NEW ITEM
      if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.parentElement.remove();
        countTodoItems();
      }
      //MARK COMPLITED
      e.currentTarget.classList.toggle("marked");

      //FILTER ITEMS
      //FILTER ACTIVE ITEMS
      filterActiveItem.addEventListener("click", function () {
        form.querySelectorAll(".todo-item").forEach(function (i) {
          if (i.classList.contains("marked")) {
            i.style.display = "none";
            countItems.textContent = `${
              form.querySelectorAll(".todo-item").length -
              form.querySelectorAll(".marked").length
            } items left`;
          }
        });
        filterActiveItem.classList.add("chosen-filter");

        //DELETE STYLE FROM OTHER ELEMENTS
        if (filterActiveItem.classList.contains("chosen-filter")) {
          filterCompletedItem.classList.remove("chosen-filter");
          filterClear.classList.remove("chosen-filter");
        }
      });

      //FILTER COMPLITED ITEMS
      filterCompletedItem.addEventListener("click", function () {
        form.querySelectorAll(".todo-item").forEach(function (i) {
          if (!i.classList.contains("marked")) {
            i.style.display = "none";
            countItems.textContent = `${
              form.querySelectorAll(".marked").length
            } items left`;
          }
        });
        filterCompletedItem.classList.add("chosen-filter");

        //DELETE STYLE FROM OTHER ELEMENTS
        if (filterCompletedItem.classList.contains("chosen-filter")) {
          filterActiveItem.classList.remove("chosen-filter");
          filterClear.classList.remove("chosen-filter");
        }
      });

      //SHOW ALL ITEMS
      filterClear.addEventListener("click", function () {
        form.querySelectorAll(".todo-item").forEach(function (i) {
          if (i) {
            i.style.display = "";
            countTodoItems();
          }
        });
        filterClear.classList.add("chosen-filter");

        //DELETE STYLE FROM OTHER ELEMENTS
        if (filterClear.classList.contains("chosen-filter")) {
          filterActiveItem.classList.remove("chosen-filter");
          filterCompletedItem.classList.remove("chosen-filter");
        }
      });

      //DELETE COMPLITED ITEMS
      clearCompletedItem.addEventListener("click", function () {
        form.querySelectorAll(".todo-item").forEach(function (i) {
          if (i.classList.contains("marked")) {
            i.remove();
            countTodoItems();
          }
        });
      });

      //DRAG AND DROP
      for (const element of todoItems) {
        element.draggable = true;
      }
      form.addEventListener("dragstart", (e) => {
        e.target.classList.add("selected");
      });

      form.addEventListener("dragend", (e) => {
        e.target.classList.remove("selected");
      });

      form.addEventListener("dragover", (e) => {
        e.preventDefault();

        const activeElement = form.querySelector(".selected");
        const currentElement = e.target;

        const isMoveable =
          activeElement !== currentElement &&
          currentElement.classList.contains("todo-item");

        if (!isMoveable) {
          return;
        }

        const nextElement =
          currentElement === activeElement.nextElementSibling
            ? currentElement.nextElementSibling
            : currentElement;

        form.insertBefore(activeElement, nextElement);
      });
    });

    countTodoItems();
  }

  //WARNING ABOUT EMPTY ITEM
  else if (e.keyCode == 13 && newItem.value === "") {
    alert("Поле не может быть пустым, введите текст");
  }
}

// //MARKING ACTIVE ITEMS
// form.querySelectorAll(".item").forEach((i) => {
//   i.addEventListener("click", function (e) {
//     e.currentTarget.classList.toggle("marked"); //&& e.currentTarget.children[0].checked == true;
//   });
// });
