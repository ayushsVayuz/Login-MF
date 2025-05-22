/**
 * @param {Event} e - The input event containing email data.
 * @param {Object} field - React Hook Form field object.
 */
export const handleEmailChange = ({ e, field }) => {
  if (e.target.value) {
    e.target.value = e.target.value.replace(/\s/g, "");
  }
  field.onChange(e);
};


/**
 * @param {Event} e - The input event containing password data.
 * @param {Object} field - React Hook Form field object.
 */
export const handlePasswordChange = ({ e, field }) => {
  if (e.target.value) {
    e.target.value = e.target.value.replace(/\s/g, "");
  }
  field.onChange(e);
};
