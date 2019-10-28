
export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validateName = (name) => {
    var re = /[a-z]{1,10}/;
    return re.test(name);
}

export const validatePassword = (password) => {
    var re = /(?=.*[0-9])/;
    return re.test(password);
}

export const validateRePassword = (password, repassword) => {
    return password === repassword;
}