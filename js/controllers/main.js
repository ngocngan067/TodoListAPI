var taskService = new TaskService();
let input = document.querySelector("#newTask");
getTask();

function getEle(id) {
  return document.getElementById(id);
}

function isLoading(isLoader) {
  return isLoader ? getEle('loader').style.display = "block" : getEle('loader').style.display = "none";
}

function getTask() {
  // isLoading(true);
  taskService
    .getTaskListApi()
    .then(function (res) {
      // Success
      var list = res.data;
      console.log(list);

      let listTaskCompleted = list.filter(item => item.status === true);
      let listTaskTodo = list.filter(item => item.status === false);

      let contentCompleted = createContent(listTaskCompleted, true);
      let contentTodo = createContent(listTaskTodo, false);

      document.querySelector("#completed").innerHTML = contentCompleted;
      document.querySelector("#todo").innerHTML = contentTodo;

      // isLoading(false);
    })
    .catch(function (err) { });
};

function createContent(arr, isCompleted) {
  let content = ''
  if (isCompleted) {
    arr.forEach(item => {
      content += `
          <li>
              <span>${item.name}</span>
              <div class="buttons d-flex flex-row-reverse">
                  <button onclick="deleteTask(${item.id})">
                      <i class="remove fa fa-trash-alt"></i>
                  </button>

                  <button class="complete" onclick="changeStatus('${item.id}', '${item.name}', '${item.status}')">
                      <i class="fas fa-check-circle"></i>
                  </button>
              </div>
          </li>    
      `
    })
    return content;
  } else {
    arr.forEach(item => {
      //name: "English", status: false, id: "15"
      content += ` 
              <li>
                  <span>${item.name}</span>
                  <div class="buttons d-flex flex-row-reverse">
                      <button onclick="deleteTask(${item.id})">
                          <i class="remove fa fa-trash-alt"></i>
                      </button>

                      <button class="complete" onclick="changeStatus('${item.id}', '${item.name}', '${item.status}')">
                          <i class="far fa-check-circle"></i>
                      </button>
                  </div>
              </li>
          `
    })
    return content;
  }
}

function addTask() {
  let newTask = input.value;
  let task = new Task(newTask);
  taskService.addTaskListApi(task).then(res => {
    var list = res.data;
    getTask();
    input.value = '';
    isLoading(false);
  })
  alert('Add task successfully!')
}

function changeStatus(id, name, status) {
  var result = confirm('Do you want to change status this item?');
  if (result) {
    isLoading(true);
    let data = {
      name: name,
      status: !JSON.parse(status)
    }
    taskService.updateTaskListApi(id, data).then(res => {
      getTask();
      isLoading(false);
    })
    alert('Change status successfully!') 
  }
}

function deleteTask(id) {
  var result = confirm('Do you want to delete this item?');
  isLoading(true);
  taskService.deleteTaskListApi(id).then(res => {
    if (result) {
      getTask();
      isLoading(false);
      alert('Deleted successfully!')
    }
    isLoading(false);
  }).catch(e => {});
  
}


document.querySelector("#addItem").addEventListener("click", () => {
  isLoading(true);
  taskService.getTaskListApi().then(res => {
    var list = res.data;
    // console.log('hello');
    var isEmpty = input.value === '';
    var isExisted = list.find(item => item.name === input.value);

    //check empty
    if (isEmpty) {
      //notify
      notiInput.innerHTML = 'You have nothing to-do!'
      notiInput.style.display = 'block';
      isLoading(false);
      return;
    }

    //check existed
    if (isExisted) {
      notiInput.innerHTML = 'You have yet to complete any tasks.'
      notiInput.style.display = 'block';
      isLoading(false);
      return;
    }

    addTask()
  }).catch(function (err) {
    // Error
    console.log(err);
  });
})

input.addEventListener('input', function () {
  taskService.getTaskListApi().then(res => {
    var list = res.data;
    var isEmpty = this.value === '';
    var isExisted = list.find(item => item.name === input.value);

    //check empty
    if (isEmpty) {
      //notify
      notiInput.innerHTML = 'You have nothing to-do!'
      notiInput.style.display = 'block';
      isLoading(false);
      return;
    }

    notiInput.innerHTML = ''
    notiInput.style.display = 'none';

    //check existed
    if (isExisted) {
      notiInput.innerHTML = 'You have yet to complete any tasks.'
      notiInput.style.display = 'block';
      isLoading(false);
      return;
    }

    notiInput.innerHTML = ''
    notiInput.style.display = 'none';

  }).catch(function (err) {
    // Error
    // console.log(err);
  });

});
