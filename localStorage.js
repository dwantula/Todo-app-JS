var LocalStorageModule = (function() {
  function saveItemInLocalStorage(key, value) {
    var valueStringified = JSON.stringify(value);
    localStorage.setItem(key, valueStringified);
  }

  function getItemFromLocalStorage(key) {
    var value = localStorage.getItem(key)
    return JSON.parse(value);
  }
  return {
    saveItemInLocalStorage: saveItemInLocalStorage,
    getItemFromLocalStorage: getItemFromLocalStorage,
  }
})();