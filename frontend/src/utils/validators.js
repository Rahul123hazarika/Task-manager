import { VALIDATION_RULES } from './constants';

export const validateEmail = (email) => {
  return VALIDATION_RULES.EMAIL.test(email);
};

export const validatePassword = (password) => {
  return VALIDATION_RULES.PASSWORD.test(password);
};

export const validatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/\d/)) strength++;
  if (password.match(/[@$!%*?&]/)) strength++;
  return strength;
};

export const validatePhone = (phone) => {
  return VALIDATION_RULES.PHONE.test(phone.replace(/\D/g, ''));
};

export const validateForm = (data, rules) => {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    if (!data[field] && rules[field].required) {
      errors[field] = `${field} is required`;
    } else if (data[field] && rules[field].validate) {
      const error = rules[field].validate(data[field]);
      if (error) errors[field] = error;
    }
  });
  return errors;
};

export const getPasswordStrengthText = (strength) => {
  switch (strength) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return 'Unknown';
  }
};

export const getPasswordStrengthColor = (strength) => {
  switch (strength) {
    case 0:
    case 1:
      return 'text-red-500';
    case 2:
      return 'text-yellow-500';
    case 3:
      return 'text-blue-500';
    case 4:
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};
