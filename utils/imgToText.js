import { createWorker } from "tesseract.js";

const worker = await createWorker("kor");

/**
 *
 * @param {string} src
 * @returns {Promise<object>}
 */
const imgToText = async (src) => {
  const {
    data: { text },
  } = await worker.recognize(src);
  await worker.terminate();

  const formated = formatText(text);

  return formated;
};

/**
 * @param {string} text
 */
const formatText = (text) => {
  const lines = text.split("\n").filter((line) => line.includes("ㅣ"));

  const IDJson = lines.reduce((acc, line) => {
    const [key, value] = line.split("ㅣ").map((part) => part.trim());
    acc[key.replace(/\s/g, "")] = value;
    return acc;
  }, {});

  return IDJson;
};

export default imgToText;
