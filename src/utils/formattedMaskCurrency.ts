import React from 'react';

const formattedMaskCurrency = (
  e: React.FormEvent<HTMLInputElement>,
): string => {
  let { value } = e.currentTarget;

  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{1})(\d{14})$/, ' $1.$2');
  value = value.replace(/(\d{1})(\d{11})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{8})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{5})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{1,2})$/, '$1,$2');

  e.currentTarget.value = value;
  return value;
};
export default formattedMaskCurrency;
