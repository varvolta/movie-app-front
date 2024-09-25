import regex from './regexp';

export const validateField = (fieldName, text) =>
    text?.length ? regex[fieldName].validation.test(text) : true;
