import { imageHash } from "image-hash";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 이미지 해시 기반 유사도 판별 \
 * 추출된 ID text의 유효성 검사
 */
class IDVerifier {
  constructor() {
    this.templateHashes = new Map();
  }

  async preloadTemplates() {
    const templatesDir = path.join(__dirname, "../templates");
    const files = await fs.readdir(templatesDir);

    for (const file of files) {
      const hash = await this.computeHash(path.join(templatesDir, file));
      this.templateHashes.set(file, hash);
      console.log(`Preloaded template: ${file} = ${hash}`);
    }
  }

  async computeHash(imagePath) {
    const processedBuffer = await sharp(imagePath)
      .png({ quality: 100 })
      .resize(256)
      .toBuffer();

    return new Promise((resolve, reject) => {
      const srcObj = { data: processedBuffer, ext: "image/png" };
      imageHash(srcObj, 8, true, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString("hex"));
        }
      });
    });
  }

  hammingDistance(hash1, hash2) {
    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) {
        distance++;
      }
    }
    return distance;
  }

  async verifyImage(imagePath) {
    const inputHash = await this.computeHash(imagePath);

    let bestMatch = { name: null, distance: Infinity, similarity: 0 };

    for (const [templateName, templateHash] of this.templateHashes) {
      const distance = this.hammingDistance(inputHash, templateHash);
      const similarity = 1 - distance / 64;

      if (distance < bestMatch.distance) {
        bestMatch = { name: templateName, distance, similarity };
      }
    }

    // 거리 13 이하
    const isValidID = bestMatch.distance <= 13;

    return {
      isValid: isValidID,
      bestMatch: bestMatch.name,
      distance: bestMatch.distance,
      similarity: bestMatch.similarity.toFixed(3),
      threshold: { distance: 13, similarity: 0.796 },
    };
  }

  /**
   * 검사: 추출된 JSON에 필수 항목이 모두 존재하는지 확인
   * @param {object} IDJson
   * @returns {boolean}
   */
  isValid(IDJson) {
    const requiredFields = ["이름", "소속", "학번", "학적상태", "생년월일"];
    for (const field of requiredFields) {
      if (!Object.hasOwn(IDJson, field) || !IDJson[field]) {
        return false;
      }
    }
    return true;
  }
}

export default IDVerifier;
