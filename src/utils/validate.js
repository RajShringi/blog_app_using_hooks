export function validate(errors, name, value) {
  switch (name) {
    case "email":
      if (!value) {
        errors.email = "Email Can't be empty";
      } else if (!value.includes("@")) {
        errors.email = "Email should contain @";
      } else {
        errors.email = "";
      }
      break;
    case "password":
      const re = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      if (!value) {
        errors.password = "Password Can't be empty";
      } else if (value.length < 6) {
        errors.password = "Password should be at-least 6 characters";
      } else if (!re.test(value)) {
        errors.password = "Password must contain a letter and a number";
      } else {
        errors.password = "";
      }
      break;
    case "username":
      if (!value) {
        errors.username = "Username can't be empty";
      } else if (value.length < 6) {
        errors.username = "Username should be at-least 6 characters long";
      } else {
        errors.username = "";
      }
      break;
    case "title":
      if (value === "") {
        errors.title = "Can't be empty";
      } else {
        errors.title = "";
      }
      break;
    default:
      break;
  }

  return errors;
}
