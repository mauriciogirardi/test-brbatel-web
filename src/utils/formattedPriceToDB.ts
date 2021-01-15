const formattedPriceToDB = (value: number): string => {
  const formatted =
    String(value).length > 6
      ? String(value).replace('R$', '').replace('.', '').replace(',', '.')
      : String(value).replace('R$', '').replace(',', '.');

  return formatted;
};

export default formattedPriceToDB;
