export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const urlFormatter = (str) => {
  let prefix = 'https://';
  if (str.substr(0, prefix.length) !== prefix) {
    str = prefix + str;
  }
  return str;
};
