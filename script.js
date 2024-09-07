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
    try {
        LIST = JSON.parse(data);
        id = LIST.length;  // Correctly set the id
        LoadList(name, LIST);  // Load list if data exists
    } catch (error) {
        console.error("Error parsing localStorage data", error);
        LIST = [];
        id = 0;
    }
} else {
    LIST = [];
    id = 0;
}

if (name) {
    listTitle.value = name;
}

// load items to the user interface
function LoadList(name, array) {
    if (name) listTitle.value = name;  // Ensure name exists
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage (with the cross on top)
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// add to do function 
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
        <li class="item">
          <i class="far ${DONE}" job="complete" data-id="${id}"></i>
          <p class="text ${LINE}">${toDo}</p>
          <i class="fas fa-trash-alt" job="delete" data-id="${id}"></i>
        </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list when user hit enter key
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const toDo = input.value.trim();

        // if the input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            id++;

            // add item to localStorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.dataset.id].done = !LIST[element.dataset.id].done;  // Toggle
}

// remove to do
function removeToDo(element) {
    element.parentNode.remove();  // Simply remove the parent

    LIST[element.dataset.id].trash = true;  // Mark as trash
}

// target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside the list
    if (element.attributes.job) {
        const elementJob = element.attributes.job.value; // complete or delete

        if (elementJob === "complete") {
            completeToDo(element);
        } else if (elementJob === "delete") {
            removeToDo(element);
        }

        // add item to localStorage
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
});

listTitle.addEventListener("change", function () {
    localStorage.setItem("NAME", listTitle.value.trim());
});
// console.log(
//     "%c Designed and Developed by Xcriminal. ",
//     "background-image: linear-gradient(70deg, #F5F5F5, #229799); color: Black;font-weight:900;font-size:1rem; padding:20px;"
// );
console.log("%c Designed and Developed by Aman Singh. ", "background-image: linear-gradient(70deg, #F5F5F5, #229799); color: Black;font-weight:900;font-size:1rem; padding:20px;");
console.log("%c ██╗  ██╗ ██████╗██████╗ ██╗███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ", "color: #229799;");
console.log("%c ╚██╗██╔╝██╔════╝██╔══██╗██║████╗ ████║██║████╗  ██║██╔══██╗██║     ", "color: #229799;");
console.log("%c  ╚███╔╝ ██║     ██████╔╝██║██╔████╔██║██║██╔██╗ ██║███████║██║     ", "color: #229799;");
console.log("%c  ██╔██╗ ██║     ██╔══██╗██║██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ", "color: #229799;");
console.log("%c ██╔╝ ██╗╚██████╗██║  ██║██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗", "color: #229799;");
console.log("%c ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝", "color: #229799;");