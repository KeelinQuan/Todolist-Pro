import axios from "axios";
import { upload } from "@/services/upload";
import { store } from "@/redux/store";
import dayjs from "dayjs";

export const getTaskByStatus = async (
  status = true,
  page,
  pageSize,
  signal
) => {
  const { startDate, endDate } = store.getState().taskList.filters;
  let queryFilterDate = "";
  if (startDate && endDate) {
    queryFilterDate = `&filters[date][$between]=${startDate}&filters[date][$between]=${endDate}`;
  }
  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[complete]=${status}${queryFilterDate}&sort[0]=createdAt:desc`,
    { signal }
  );
  return response.data;
};

export const getTasksComplete = async (page, pageSize, signal) => {
  return getTaskByStatus(true, page, pageSize, signal);
};
export const getTasksUnComplete = async (page, pageSize, signal) => {
  return getTaskByStatus(false, page, pageSize, signal);
};

export const createTask = async (title) => {
  const response = await axios.post(`/tasks`, {
    data: {
      title: title,
      date: new Date(),
    },
  });
  return response.data;
};

export const updateTask = async (id, newTask) => {
  const response = await axios.put(`/tasks/${id}`, {
    data: {
      title: newTask.title,
      complete: newTask.complete,
      date: newTask.date,
    },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};

export const addImgTask = async (file, idTask) => {
  const response = await upload(file, "api::task.task", idTask, "image");
  return response.data;
};

export const searchTask = async (txt) => {
  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[title][$contains]=${txt}`
  );
  return response.data;
};

export const getWarningTasks = async () => {
  let today = new Date();
  today.setDate(today.getDate() + 3);
  let warningDate = dayjs(today).format("YYYY-MM-DD");

  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[date][$lte]=${warningDate}&sort[0]=date:desc`
  );
  return response.data;
};
