const mergeOptions = function (mergedOptions = {}, options = {}) {
  const finalOptions = { ...mergedOptions };

  for (const key in options) {
    if (finalOptions[key]) {
      if (options[key] instanceof Array) {
        finalOptions[key] = [
          ...finalOptions[key],
          ...options[key],
        ];
      } else if (options[key] instanceof Object) {
        finalOptions[key] = {
          ...finalOptions[key],
          ...options[key],
        };
      } else {
        finalOptions[key] = options[key];
      }
    } else {
      finalOptions[key] = options[key];
    }
  }

  return finalOptions;
};

module.exports = {
  mergeOptions,
};
