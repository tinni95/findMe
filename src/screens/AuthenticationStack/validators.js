export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateName = (name) => {
  const re = /[a-z]{1,10}/;
  return re.test(name);
};

export const validatePassword = (password) => {
  const re = /(?=.*[0-9])/;
  return re.test(password);
};

export const validateRePassword = (password, repassword) => {
  return password === repassword;
};
