/**
 * @param {object} IDJson
 * @returns {boolean}
 */
const checkIDValid = (IDJson) => {
  const requiredFields = ["이름", "소속", "학번", "학적상태", "생년월일"];
  for (const field of requiredFields) {
    if (!IDJson.hasOwnProperty(field) || !IDJson[field]) {
      return false;
    }
  }
  return true;
};

export default checkIDValid;
