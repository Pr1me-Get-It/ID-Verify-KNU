import imgToText from "./utils/imgToText.js";
import checkIDValid from "./utils/checkIDValid.js";

const idVerifyKNU = async (img) => {
  try {
    const IDJson = await imgToText(img);
    const isValid = checkIDValid(IDJson);
    return { isValid, IDJson };
  } catch (error) {
    console.error("Error in idVerifyKNU:", error);
    throw error;
  }
};

export default idVerifyKNU;
