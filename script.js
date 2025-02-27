let input = document.getElementById("inputArea");
let tasksArea = document.getElementById("tasksArea");
let taskList = [];
let grocerieList = [];
let projectList = [];

let selectedList = taskList;

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

function select(selected, list) {
    buttonList = document.getElementsByClassName('taskList');
    for (var i = 0; i < Array.from(buttonList).length; i++) {
        if (Array.from(buttonList[i].classList).includes('active')) {
            buttonList[i].classList.toggle('active');
        }
    }
    selected.classList.toggle('active');

    selectedList = list;
    reDraw();
}



function teste() {
    document.getElementsByClassName("taskList")[0].classList.toggle('active');
}
