var AddToDoList = (function () {
  var thingsList = document.getElementById('to-do-list');
  var thingInput = document.getElementById('input-value');
  var addButton = document.getElementById('add-button');
  var clearButton = document.getElementById('clear');
  function getTasksFromLocalStorage() {
    var tasksList = LocalStorageModule.getItemFromLocalStorage('things');
    return tasksList;
  }

  function removeTask(thingId) {
    var things = getTasksFromLocalStorage();
    var newTask = things.filter(function (thing) {
      if (thing.id !== thingId) {
        return thing
      }
    });
    LocalStorageModule.saveItemInLocalStorage('things', newTask);
    refreshTasksList()
  }

  function createTaskRow(thing) {
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('button-remove');
    deleteButton.addEventListener('click', function () {
      removeTask(thing.id);
    });
    deleteButton.innerHTML = 'x';
    var cellCheck = document.createElement('td');
    var checkButton = document.createElement('button');
    checkButton.addEventListener('click', function () {
      markTaskAsDone(thing)
      refreshTasksList()
    })
    cellCheck.appendChild(checkButton);
    row.appendChild(cellCheck);
    var cellThingName = document.createElement('td');
    var paragraph = document.createElement('p');
    paragraph.innerText = thing.task;
    cellThingName.appendChild(paragraph);
    cell.appendChild(deleteButton);
    cellCheck.appendChild(checkButton);
    row.appendChild(cellCheck);
    row.appendChild(cellThingName)
    if (thing.status === 'done') {
      var paragraph = row.querySelector('p');
      paragraph.classList.add('deletion');
      checkButton.classList.add('full');
    } else {
      checkButton.classList.add('checkmark-button');
    }
    row.appendChild(cell)
    return row;
  }

  addButton.addEventListener('click', addThings)

  function addThings(thing) {
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var paragraph = document.createElement('p');
    paragraph.innerText = thingInput.value;
    var thingId = IdGeneratorModule.generateId('thing');
    var checkButtonCell = cellCheck(row, thingId);
    row.appendChild(checkButtonCell);
    cell.appendChild(paragraph);
    row.appendChild(cell);
    var taskId = IdGeneratorModule.generateId('thing');
    var removeButtonCell = createRemovalCell(taskId);
    row.appendChild(removeButtonCell);
    thingsList.appendChild(row);
    thingInput.value = '';

    var thing = {
      id: taskId,
      task: paragraph.innerText,
      status: 'to be done'
    }

    var tasksList = LocalStorageModule.getItemFromLocalStorage('things') || [];
    tasksList.push(thing);
    LocalStorageModule.saveItemInLocalStorage('things', tasksList);
  }

  function markTaskAsDone(thing) {
    var tasks = getTasksFromLocalStorage();

    var taskToBeChanged = tasks.find(function (task) {

      return task.id === thing.id;

    })
    console.log(taskToBeChanged)
    taskToBeChanged.status = 'done';

    LocalStorageModule.saveItemInLocalStorage('things', tasks);
  }

  function refreshTasksList() {
    thingsList.innerHTML = '';
    populateListWithTask();
  }
  function cellCheck(row, thing) {
    var checkCell = document.createElement('td');
    var checkButton = document.createElement('button');

    checkButton.addEventListener('click', function () {
      markTaskAsDone(thing)
      refreshTasksList()
    })
    checkCell.appendChild(checkButton)
    if (thing.status === 'done') {
      var paragraph = row.querySelector('p');
      paragraph.classList.add('deletion');
      checkButton.classList.add('full');
    } else {
      checkButton.classList.add('checkmark-button');
    }
    row.appendChild(checkCell)
    thingsList.appendChild(row);
    return checkCell;
  }

  function createRemovalCell(thingId) {
    var removeButtonCell = document.createElement('td');
    var removeButton = document.createElement('button');
    removeButton.innerText = 'x';
    removeButton.classList.add('button-remove');
    removeButton.addEventListener('click', function () {
      removeTask(thingId)
    })
    removeButtonCell.appendChild(removeButton);
    return removeButtonCell;
  }

  clearButton.addEventListener('click', clearToDoList)

  function clearToDoList() {
    var allListPoints = document.querySelectorAll('tr');
    for (i = 0; i < allListPoints.length; i++) {
      thingsList.removeChild(allListPoints[i]);
    }
    localStorage.removeItem('things') || [];
    var clearInput = document.getElementById('input-value');
    clearInput.value = '';
  }

  function populateListWithTask() {
    var tasksList = getTasksFromLocalStorage();
    if (tasksList) {
      for (i = 0; i < tasksList.length; i++) {
        var taskRow = createTaskRow(tasksList[i]);
        thingsList.appendChild(taskRow);
      }
    }
  }
  populateListWithTask();
})();