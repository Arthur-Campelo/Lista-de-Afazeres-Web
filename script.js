let input = document.getElementById("inputArea");
let tasksArea = document.getElementById("tasksArea");
let taskList = []

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

        taskList.unshift(newTask);
        reDraw();
    }

}

function reDraw() {
    tasksArea.innerHTML = "";
    taskList.forEach((task) => { tasksArea.innerHTML += task });
}

function changeState(div) {
    var classArray = Array.from(div.classList);
    var checkMark = div.getElementsByClassName('mdi')[0];
    var taskText = div.querySelector('.task-text').innerText;



    if (!classArray.includes('done')) {
        changePosition(div, true);

        let index = taskList.findIndex(task => task.includes(taskText));

        div.classList.add('done');
        checkMark.classList.add('mdi-check-circle');
        checkMark.classList.remove('mdi-circle-outline');

        taskList[index] = taskList[index].replace('mdi-circle-outline', 'mdi-check-circle').replace('class="task"', 'class="task done"');


    } else {
        changePosition(div, false);

        let index = taskList.findIndex(task => task.includes(taskText));

        div.classList.remove('done');
        checkMark.classList.add('mdi-circle-outline');
        checkMark.classList.remove('mdi-check-circle');

        taskList[index] = taskList[index].replace('mdi-check-circle', 'mdi-circle-outline').replace('class="task done"', 'class="task"');

    }

    reDraw();
}

function changePosition(taskElement, goesDown) {
    let index = taskList.findIndex(task => task.includes(taskElement.querySelector(".task-text").innerHTML));

    var divList = Array.from(document.getElementsByClassName("task"));
    var element = taskList[index];
    taskList.splice(index, 1);

    reDraw();

    var isThereDone = divList.some((task) => { classArray = Array.from(task.classList); return classArray.includes('done') });

    if (goesDown) {
        var classArray;


        if (isThereDone) {
            for (var i = 0; i < divList.length; i++) {

                var task = divList[i];
                classArray = Array.from(task.classList);
                if (classArray.includes('done')) {
                    taskList.splice(Math.max(i - 1, 0), 0, element);
                    break;
                }
            }
        } else {
            taskList.push(element);
        }
    } else {
        //checa se tem algum outro done 
        //se não tiver
        taskList.splice(0, 0, element);
        //se tiver colocar no elemento uma posição antes desse
        console.log("subindo");
    }

    reDraw();
}

function isNew(taskNew) {
    return !taskList.some((task) => { return task === taskNew });
}

function deleteTask(div) {
    let index = taskList.findIndex(task => task.includes(div.parentElement.parentElement.querySelector(".task-text").innerHTML));
    console.log(index);

    taskList.splice(index, 1);
    reDraw();
}