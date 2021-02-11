var IdGeneratorModule = (function() {
  function generateId(key) {
    var id = (new Date()).getTime();
    return key + "-" + id;
  };
  return {
    generateId: generateId
  }
})();