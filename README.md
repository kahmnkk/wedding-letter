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

Client Secret은 입력하거나 공개하면 안 됩니다. 지도 API 인증은 브라우저의 실제 웹 주소를 기준으로 하므로, `file:///...`로 직접 연 화면 대신 아래 로컬 서버 방식으로 확인하세요.

## 로컬 서버로 미리보기 (선택)

사진이나 네이버 지도를 포함해 배포 환경과 동일하게 확인하려면 로컬 서버를 사용하세요. 네이버 클라우드 플랫폼 Application의 Web 서비스 URL에는 `http://localhost`를 등록합니다.

### Node.js를 설치한 경우

Node.js를 방금 설치했다면 먼저 PowerShell 또는 Codex 터미널을 닫았다가 새로 여세요. 새 터미널에서도 `npx`를 찾지 못하면 아래 명령을 먼저 한 번 실행합니다.

```powershell
$env:Path = "C:\Program Files\nodejs;$env:Path"
```

그 다음 로컬 서버를 시작합니다.

```powershell
& "C:\Program Files\nodejs\npx.cmd" serve .
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

## 사진 넣기

웨딩 사진을 아래 이름으로 넣으면 페이지에 바로 표시됩니다. 사진 파일은 JPG를 권장합니다.

- 첫 화면 사진: `images/main.jpg`
- 갤러리: `images/gallery/photo-1.jpg`부터 `photo-15.jpg`까지

갤러리에는 처음 8장의 사진과 `+ 더보기` 카드가 표시됩니다. 더보기 카드는 9번째 사진을 열며, 팝업 안에서 15장 전체를 좌우로 넘겨 볼 수 있습니다.

사진을 더 넣으려면 `script.js`의 `galleryPhotos` 배열에 경로를 추가하세요. 예: `"images/gallery/photo-10.jpg"`.

## 카카오톡 미리보기 이미지

카카오톡 공유 미리보기는 첫 화면 사진인 `images/main.jpg`를 사용하도록 설정돼 있습니다.

카카오톡은 이미 한 번 읽은 미리보기를 캐시할 수 있습니다. 배포 후에는 카카오 디벨로퍼스의 공유 디버거에서 주소를 다시 수집하면 변경 사항이 반영됩니다.
