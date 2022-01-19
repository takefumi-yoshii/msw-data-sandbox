const path = require("path");
const dotenv = require("dotenv");
// ____________________________________________________________
//
module.exports = async () => {
  process.env.TZ = "Asia/Tokyo";
  dotenv.config({ path: path.resolve(__dirname, ".env") });
};
