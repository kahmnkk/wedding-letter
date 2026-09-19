# 한신랑 · 김신부 모바일 청첩장

순수 HTML, CSS, JavaScript로 만든 모바일 청첩장입니다. Node.js 설치 없이 기본 화면과 터미널 모드를 확인할 수 있습니다.

## 가장 간단한 실행 방법

1. 파일 탐색기에서 이 폴더를 엽니다.
2. `index.html` 파일을 더블 클릭합니다.
3. 브라우저에서 청첩장이 열립니다.

일반 청첩장 맨 아래의 `> developer mode` 버튼을 누르면 검은색 터미널 청첩장이 열립니다. 터미널 화면에서는 하단 안내를 누르거나 Enter 키를 눌러 다음 메시지로 넘어갈 수 있고, `×` 또는 Esc 키로 닫을 수 있습니다.

## 네이버 지도 표시하기

현재는 길찾기 버튼이 바로 동작합니다. 페이지 안의 삽입 지도까지 표시하려면 네이버 클라우드 플랫폼에서 Web Dynamic Map용 Client ID를 발급받은 뒤 `script.js`의 첫 부분을 수정합니다.

```js
const NAVER_MAP_CLIENT_ID = "발급받은_Client_ID";
```

Client Secret은 입력하거나 공개하면 안 됩니다. 로컬 파일로 지도를 확인할 때는 네이버 클라우드 콘솔의 Web 서비스 URL에 `file://`을 등록하거나, 아래의 로컬 서버 방식으로 실행하세요.

## 로컬 서버로 미리보기 (선택)

사진이나 네이버 지도를 포함해 배포 환경과 더 가깝게 확인하려면 로컬 서버를 사용하면 좋습니다. 현재 이 PC에는 Node.js와 Python이 설치되어 있지 않으므로, 둘 중 하나를 설치한 뒤 아래 명령을 사용하세요.

### Node.js를 설치한 경우

```powershell
npx serve .
```

표시되는 주소(보통 `http://localhost:3000`)를 브라우저에서 엽니다. 네이버 지도 콘솔에도 `http://localhost`를 Web 서비스 URL로 등록하세요.

### Python을 설치한 경우

```powershell
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

## 파일 구성

- `index.html`: 청첩장 구조와 내용
- `style.css`: 모바일 디자인 및 터미널 화면 스타일
- `script.js`: D-day, 네이버 지도, 타이핑 애니메이션
