import imgToText from "./utils/imgToText.js";
import IDVerifier from "./utils/checkIDValid.js";

const idVerifier = new IDVerifier();
await idVerifier.preloadTemplates();

const idVerifyKNU = async (img) => {
  try {
    const IDJson = await imgToText(img);
    const resultVerifier = await idVerifier.verifyImage(img);
    const isValid = idVerifier.isValid(IDJson) && resultVerifier.isValid;
    console.log(resultVerifier);
    return { isValid, IDJson };
  } catch (error) {
    console.error("Error in idVerifyKNU:", error);
    throw error;
  }
};

console.log(await idVerifyKNU("imgs/sample02.PNG"));

export default idVerifyKNU;
