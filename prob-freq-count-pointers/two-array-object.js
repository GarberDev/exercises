// add whatever parameters you deem necessary
function twoArrayObject(keys, values) {
  // object to return
  let obj = {};
  // loop through keys
  for (let i = 0; i < keys.length; i++) {
    // add key value pair to obj
    obj[keys[i]] = values[i] || null;
  }
  // return obj
  return obj;
}
