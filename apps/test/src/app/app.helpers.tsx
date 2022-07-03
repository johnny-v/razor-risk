function formatNumberDecimalPlaces(decimal: number) {
  return function(number: number) {
    return Number(number.toFixed(decimal)).toLocaleString('en', {
      minimumFractionDigits: decimal
    });
  };
}

export default formatNumberDecimalPlaces;
