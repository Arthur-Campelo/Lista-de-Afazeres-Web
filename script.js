let input = document.getElementById("inputArea");
let tasksArea = document.getElementById("tasksArea");
let saveButton;

//detectar enter pressionado após a janela carregar
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            add();
        }
    });
});

document.addEventListener("click", function (event) {
    var flag = false;
    var elements = document.querySelectorAll(".colorOption");
    var elementsButton = document.querySelectorAll(".colorPaletSelector");

    for (var i = 0; i < Array.from(elements).length; i++) {
        if (elements[i].contains(event.target)) {
            flag = true;
            break;
        }
    }
    for (var i = 0; i < Array.from(elementsButton).length; i++) {
        if (elementsButton[i].contains(event.target)) {
            flag = true;
            break;
        }
    }

    if (!flag) {
        Array.from(elements).forEach((element) => { element.remove() });
        saveButton.style.zIndex = "10";
    }
    /*
        var clickedInside = Array.from(elements).some(element => element.contains(event.target));
    
        if (!clickedInside) {
            console.log("hehe");
            Array.from(elements).forEach((element) => { element.remove() })
        } else {
            console.log("clicked inside");
        }*/
});

class ListType {
    constructor(list, colorPalet, name) {
        this.list = list;
        this.colorPalet = colorPalet;
        this.name = name;
    }
}

let colorPalet1 = ["rgb(200, 116, 6)", "rgb(222, 184, 135)", "rgb(238, 221, 199)", "rgb(228, 202, 169)"]
let colorPalet2 = ["rgb(6, 116, 200)", "rgb(135, 184, 222)", "rgb(199, 221, 238)", "rgb(169, 202, 228)"];
let colorPalet3 = ["rgb(6, 150, 75)", "rgb(135, 222, 184)", "rgb(199, 238, 221)", "rgb(169, 228, 202)"];
let colorPalet4 = ["rgb(200, 40, 6)", "rgb(222, 135, 135)", "rgb(238, 199, 199)", "rgb(228, 169, 169)"];
let colorPalet5 = ["rgb(116, 6, 200)", "rgb(184, 135, 222)", "rgb(221, 199, 238)", "rgb(202, 169, 228)"];
let colorPalet6 = ["rgb(80, 80, 80)", "rgb(140, 140, 140)", "rgb(220, 220, 220)", "rgb(180, 180, 180)"];


let optionList = [];

let taskList = [];
let grocerieList = [];
let projectList = [];

optionList[0] = new ListType(taskList, colorPalet1, "Tarefas");
optionList[1] = new ListType(grocerieList, colorPalet2, "Compras");
optionList[2] = new ListType(projectList, colorPalet3, "Projetos");

let selectedList = optionList[0].list;

function add() {
    var newText = input.value;
    input.value = "";

    if (newText != null && newText != "") {
        newTask = `<div class="task" onclick="changeState(this)">
                <div class="task-icon">
                    <i class="mdi mdi-circle-outline"></i>
                </div>
                <div class="task-text">
                    `+ newText + `
                </div>
                <div class="task-button-area">
                    <button class="task-button" onclick="deleteTask(this);event.stopPropagation()"><i class="mdi mdi-delete"></button></i>
                </div>
            </div>`;

        if (!isNew(newTask)) {
            alert("Tarefa já adicionada");
            return;
        }

        selectedList.unshift(newTask);
        reDraw();
    }

}

function reDraw() {
    tasksArea.innerHTML = "";
    selectedList.forEach((task) => { tasksArea.innerHTML += task });
}

function changeState(div) {
    var classArray = Array.from(div.classList);
    var index;
    var checkMark = div.getElementsByClassName('mdi')[0];

    if (!classArray.includes('done')) {
        index = changePosition(div, true);

        div.classList.add('done');
        checkMark.classList.add('mdi-check-circle');
        checkMark.classList.remove('mdi-circle-outline');

        selectedList[index] = selectedList[index].replace('mdi-circle-outline', 'mdi-check-circle').replace('class="task"', 'class="task done"');

    } else {
        index = changePosition(div, false);

        div.classList.remove('done');
        checkMark.classList.add('mdi-circle-outline');
        checkMark.classList.remove('mdi-check-circle');

        selectedList[index] = selectedList[index].replace('mdi-check-circle', 'mdi-circle-outline').replace('class="task done"', 'class="task"');

    }
    reDraw();
}

function changePosition(taskElement, goesDown) {
    let index = selectedList.findIndex(task => task.includes(taskElement.querySelector(".task-text").innerHTML));

    var divList = Array.from(document.getElementsByClassName("task"));
    var element = selectedList[index];
    selectedList.splice(index, 1);

    reDraw();

    var isThereDone = divList.some((task) => { classArray = Array.from(task.classList); return classArray.includes('done') });

    if (goesDown) {
        var classArray;

        if (isThereDone) {
            for (var i = 0; i < divList.length; i++) {

                var task = divList[i];

                classArray = Array.from(task.classList);
                if (classArray.includes('done')) {
                    selectedList.splice(Math.max(i - 1, 0), 0, element);
                    return Math.max(i - 1, 0);
                }
            }

        } else {

            selectedList.push(element);
            return selectedList.length - 1;
        }

    } else {

        selectedList.splice(0, 0, element);
        return 0;
    }

    reDraw();
}

function isNew(taskNew) {
    return !selectedList.some((task) => { return task === taskNew });
}

function deleteTask(div) {
    let index = selectedList.findIndex(task => task.includes(div.parentElement.parentElement.querySelector(".task-text").innerHTML));

    selectedList.splice(index, 1);
    reDraw();
}

function select(selected, listIndex) {
    buttonList = document.getElementsByClassName('taskList');
    for (var i = 0; i < Array.from(buttonList).length; i++) {
        if (Array.from(buttonList[i].classList).includes('active')) {
            buttonList[i].classList.toggle('active');
        }
    }

    selected.classList.toggle('active');


    changeTheme(optionList[listIndex].colorPalet, optionList[listIndex].name);
    selectedList = optionList[listIndex].list;
    reDraw();
}

function changeTheme(colorPalet, name) {
    var title = document.getElementById('title');
    var body = document.getElementsByTagName('body');
    var addList = document.getElementById('addList')
    var inputArea = document.getElementById('inputArea');
    var add = document.getElementById('add');
    var plusIcon = document.getElementsByClassName('material-symbols-outlined');



    if (!(name == undefined || name == null)) {
        title.innerHTML = name;
    }

    { //change color 1
        title.style.color = colorPalet[0];
        /*Array.from(taskList).forEach((task) => {
            if (Array.from(task.classList).includes('active')) {
                task.style.color = colorPalet[0]
            }
        });*/
        plusIcon[0].style.color = colorPalet[0];
    }
    {// change color 2
        /*Array.from(taskList).forEach((task) => {
            if (Array.from(task.classList).includes('active')) {
                task.style.borderColor = colorPalet[1]
            }

        });*/
        addList.style.borderColor = colorPalet[1];
        inputArea.style.borderColor = colorPalet[1];
        add.style.borderColor = colorPalet[1];
        add.style.backgroundColor = colorPalet[1];
    }
    {//cahnge color 3
        body[0].style.backgroundColor = colorPalet[2];
    }
    {//change color 4
        /*Array.from(taskList).forEach((task) => {
            if (Array.from(task.classList).includes('active')) {
                task.style.backgroundColor = colorPalet[3]
            }

        });*/
        addList.style.backgroundColor = colorPalet[3];
    }
}

function addList(button) {
    saveButton = button;
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="taskList colorPalet6" ><input placeholder="..."></input> <div class="colorPaletSelector" onclick="selectTheme(this)"></div>`;

    var listOptions = document.getElementById("listOptions");

    listOptions.insertBefore(newDiv.firstChild, button);
    var elementNewDiv = listOptions.getElementsByClassName('taskList');
    var elementNewDivLastElement = elementNewDiv[Array.from(elementNewDiv).length - 1];

    elementNewDivLastElement.setAttribute("onclick", "select(this, " + (Array.from(elementNewDiv).length - 1) + ")");
    elementNewDivLastElement.getElementsByTagName('input')[0].setAttribute("onblur", "changeTitle(this, " + (Array.from(elementNewDiv).length - 1) + ")");


    let newList = [];
    optionList.push(new ListType(newList, colorPalet6, "Dê um nome:"));

    select(elementNewDivLastElement, Array.from(elementNewDiv).length - 1);


}

function selectTheme(element) {
    if (Array.from(element.parentElement.classList).includes('active')) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('colorOption');
        newDiv.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        saveButton.style.zIndex = "-10";

        element.append(newDiv);

        for (var i = 0; i < 5; i++) {
            var classType = "colorPalet" + (i + 1)
            var listOptions = document.getElementById("listOptions");
            var elementNewDiv = listOptions.getElementsByClassName('taskList');

            var newColorOption = document.createElement('div');
            newColorOption.innerHTML = `<div class="colorPaletSelector ` + classType + `" onclick="setTheme(this,` + classType + `,` + (i + 1) + `,` + (Array.from(elementNewDiv).length - 1) + `)" style="width: 40px; height:40px" >`;

            newDiv.append(newColorOption);
        }
    }
}

function setTheme(element, classType, classThemeIndex, index) {
    changeTheme(classType);
    parentTaskSelector = element.closest('.active');

    Array.from(parentTaskSelector.classList).forEach((cls) => {
        if (cls.startsWith("colorPalet")) {
            parentTaskSelector.classList.remove(cls);
        }
    });
    parentTaskSelector.classList.add("colorPalet" + classThemeIndex);
    //optionList[index].colorPalet = colorPalet+classThemeIndex;//Array.from(element.classList)[1];
    optionList[index].colorPalet = eval("colorPalet" + classThemeIndex);
}


function changeTitle(input, index) {
    optionList[index].name = input.value;
    title.innerHTML = optionList[index].name;
}

function teste() {
    var elements = document.querySelectorAll(".colorOption");
    Array.from(elements).forEach((element) => { element.remove() })

}
