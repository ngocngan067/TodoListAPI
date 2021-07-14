function TaskService() { }

TaskService.prototype.getTaskListApi = function () {
    // GET: lấy dữ liệu từ server
    // axios sẽ trả về 1 promise
    return axios({
        url: 'https://60ec118ae9647b0017cde04e.mockapi.io/task',
        method: 'GET',
    });
};

TaskService.prototype.addTaskListApi = function (task) {
    // POST: thêm dữ liệu mới vào database
    // data: truyền dữ liệu cần thêm vào database
    return axios({
        url: 'https://60ec118ae9647b0017cde04e.mockapi.io/task',
        method: 'POST',
        data: task,
    });
};

TaskService.prototype.deleteTaskListApi = function (id) {
    // DELETE: xoá data thông qua id
    return axios({
        url: `https://60ec118ae9647b0017cde04e.mockapi.io/task/${id}`,
        method: 'DELETE',
    });
};

TaskService.prototype.getTaskListById = function (id) {
    return axios({
        url: `https://60ec118ae9647b0017cde04e.mockapi.io/task/${id}`,
        method: 'GET',
    });
};

TaskService.prototype.updateTaskListApi = function (id, data) {
    return axios({
        url: `https://60ec118ae9647b0017cde04e.mockapi.io/task/${id}`,
        method: 'PUT',
        data: data,
    });
};
