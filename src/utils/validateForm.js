export function validateForm(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Username Can't be empty";
  }
  if (!values.email) {
    errors.email = "Email Can't be empty";
  }
  if (values.email && !values.email.includes("@")) {
    errors.email = "Email should contain @";
  }
  if (
    validateForm.password &&
    !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password)
  ) {
    errors.password = "Password must contain a letter and a number";
  }
  if (!values.title) {
    errors.title = "Title Can't be emtpy";
  }
  if (!values.description) {
    errors.description = "Description Can't be emtpy";
  }
  if (!values.body) {
    errors.body = "Body Can't be emtpy";
  }
  if (!values.tagList) {
    errors.tagList = "Taglist Can't be emtpy";
  }

  return errors;
}
