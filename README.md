# ID-Verify-KNU

간단한 OCR 기반 학내 학생 확인 도구입니다. 이 저장소는 이미지를 OCR(문자 인식)으로 처리하여 이름/소속/학번/학적상태/생년월일을 추출하고, 추출 결과와 이미지 템플릿 유사도를 결합해 학내 학생 여부를 검증합니다.

**핵심 기능**

- 이미지에서 텍스트 추출: `tesseract.js` 사용
- 텍스트 파싱 → 키:값(JSON) 반환
- 텍스트 기반 필드 검사 및 이미지 템플릿 유사도 검사(`image-hash` 사용)

**사전 요구사항**

- Node.js 18+ (테스트: v24)
- npm 설치된 패키지

**설치**

```bash
npm install
```

**빠른 시작(예제)**

- 엔트리 모듈 `IDVerifyKNU.js`를 사용하면 OCR + 템플릿 검사 과정을 한 번에 실행합니다.

```bash
node ./IDVerifyKNU.js
```

- 코드에서 호출 예 (ESM 환경):

```javascript
import idVerifyKNU from "./IDVerifyKNU.js";

(async () => {
  const { isValid, IDJson } = await idVerifyKNU("imgs/IMG_0739.PNG");
  console.log(IDJson); // 파싱된 JSON
  console.log("isValid:", isValid);
})();
```

**템플릿(이미지 유사도) 설정**

- 템플릿 이미지는 프로젝트 루트의 `templates/` 폴더에 PNG/JPG 파일로 저장하세요.
- `IDVerifier.preloadTemplates()`가 시작 시 해당 폴더를 읽어 해시를 미리 계산합니다.
