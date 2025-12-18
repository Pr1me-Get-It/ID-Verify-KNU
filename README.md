# ID-Verify-KNU

간단한 OCR 기반 학내 학생 확인 도구입니다. 이 저장소는 이미지를 OCR하여 이름/소속/학번/학적상태/생년월일을 추출하고, 추출 결과에서 확인에 필요한 필드가 있는지 검사하는 유틸(예: `imgToText.js`, `checkIDValid.js`)을 포함합니다.

**주요 기능**

- 이미지에서 텍스트 추출 (tesseract.js 사용)
- 추출된 텍스트를 키:값 형태로 파싱하여 JSON 반환
- 필수 필드(이름, 소속, 학번, 학적상태, 생년월일) 존재 여부 검사

**사전 요구사항**

- Node.js (권장: v18 이상, 현재 테스트: v24)
- 인터넷 연결(언어 데이터/외부 이미지 접근 시)

**설치**

```bash
npm install
```

**사용 예제**

- 모듈로 사용 예시 (ESM 환경, `index.js` 참조)

```javascript
import idVerifyKNU from "./IDVerifyKNU.js";

(async () => {
  const { isValid, IDJson } = await idVerifyKNU("imgs/IMG_0739.PNG");
  console.log(IDJson); // 파싱된 JSON
  console.log("isValid:", isValid);
})();
```

**파일 설명**

- `imgToText.js` : tesseract.js의 `createWorker`를 사용해 OCR 수행하고 결과를 파싱하여 JSON 반환.
- `checkIDValid.js` : 추출된 JSON에 필수 항목이 모두 존재하는지 검사하는 함수.

**데이터/개인정보 주의**

- 이 프로젝트는 개인 식별 정보를 다루기 쉬우므로 실제 서비스에 적용 시에는 개인정보 보호법 등 관련 법규와 기관 내부 규정을 반드시 준수하세요.
