const clear = document.querySelector(".clear");
const listTitle = document.getElementById("list-title");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

// vars
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");
let name = localStorage.getItem("NAME");

// check if data is not empty 
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    LoadList(name, LIST);
} else {
    LIST = [];
    id = 0;
}

if (name) {
    listTitle.value = name;
}

// load items to the user interface
function LoadList(name, array) {
    listTitle.value = name;
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}