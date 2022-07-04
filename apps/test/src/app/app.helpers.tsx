function formatNumberDecimalPlaces(decimal: number) {
  return function(number: string | number) {
    return Number(parseFloat(number.toString().replace(/,/g, '')).toFixed(decimal)).toLocaleString('en', {
      minimumFractionDigits: decimal
    });
  };
}

export default formatNumberDecimalPlaces;
