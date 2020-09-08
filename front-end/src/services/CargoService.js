import http from "../http-common";

const getAll = () => {
  return http.get("/cargo");
};

const get = id => {
  return http.get(`/cargo/${id}`);
};

const create = data => {
  return http.post("/cargo/new", data);
};

const update = (id, data) => {
  return http.put(`/cargo/${id}`, data);
};

const remove = id => {
  return http.delete(`/cargo/${id}`);
};

const removeAll = () => {
  return http.delete(`/cargo`);
};

const findByDescription = descricao => {
  return http.get(`/cargo?descricao=${descricao}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByDescription
};
