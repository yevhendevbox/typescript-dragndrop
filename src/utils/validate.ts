import { Validatable } from '../types';

export function validate(input: Validatable): boolean {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }

  if (input.minLength && typeof input.value === 'string') {
    isValid = isValid && input.value.toString().length >= input.minLength;
  }

  if (input.maxLength && typeof input.value === 'string') {
    isValid = isValid && input.value.toString().length <= input.maxLength;
  }
  if (input.min != null && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min;
  }

  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max;
  }

  return isValid;
}