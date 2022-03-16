"use strict";
const { generateResponse } = require ('../utils/utils')

module.exports.hello = async (event) => {
  return generateResponse("Hola2")
};
