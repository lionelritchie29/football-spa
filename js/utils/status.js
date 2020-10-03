const status = (res) => {
  if (res.status === 200) {
    return Promise.resolve(res);
  } else {
    return Promise.reject();
  }
};

export default status;
