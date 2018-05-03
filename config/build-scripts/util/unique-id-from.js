/* 
 * Create a unique ID from a piece of data.
 *
 * */

const crypto = require("crypto");

const uniqueIDFrom = (string) => {
  return crypto.createHash("md5").update(string).digest("hex");
};

module.exports = uniqueIDFrom;
