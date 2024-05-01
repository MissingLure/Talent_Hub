  function isEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  
  function isPassword(password) {
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  }

  function emptyFields(employee) {
    const emptyFields = [];
    for(const field in employee) {
        if (!employee[field]) {
            emptyFields.push(field);
        }
    }
    return emptyFields;
  };

  module.exports = {
    emptyFields,
    isEmail,
    isPassword,
  };
  
