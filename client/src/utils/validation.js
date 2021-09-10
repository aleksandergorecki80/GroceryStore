const regExPatterns = {
    name: /^[a-z\d ]{5,25}$/i, // d - meta character for digit
    //eslint-disable-next-line
    email: /^([a-z\d\.-]+)@([a-z\d\.-]+)\.([a-z]{2,8})(\.[a-z]{5,50})?$/,
    password: /^[\w@-]{8,20}$/i, // w - any character a-z, A-Z, 0-9, including the _
  };

  export const validateEmail = (phrase) => {
    return regExPatterns.email.test(phrase);
  };

  export const validatePasswords = (phrase) => {
    return regExPatterns.password.test(phrase);
  };

  export const validateName = (phrase) => {
    return regExPatterns.name.test(phrase);
}