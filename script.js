document.querySelector(".accounts").before(document.querySelector(".gallery"));
document.head.insertAdjacentHTML(
  "beforeend",
  "<style>.gallery{background:#fbfaf8}.accounts{background:#fff}footer button{display:block;margin:20px auto 0;padding:9px 13px;border:1px dashed #999;background:#fff;color:#555;font:10px Space Mono,monospace;cursor:pointer}</style>",
);
// NAVER Cloud Platform Maps > Application에서 발급한 Client ID입니다.
// Client Secret은 브라우저 코드에 절대 넣지 않습니다.
const NAVER_CLOUD_MAP_CLIENT_ID = "d2b00m5hqf";
const weddingDate = new Date("2027-09-26T11:00:00+09:00");
function countdown() {
  const x = Math.max(0, weddingDate - new Date()),
    d = Math.floor(x / 86400000),
    h = Math.floor(x / 36e5) % 24,
    m = Math.floor(x / 6e4) % 60,
    s = Math.floor(x / 1000) % 60;
  [
    ["days", d, 3],
    ["hours", h, 2],
    ["minutes", m, 2],
    ["seconds", s, 2],
  ].forEach(
    ([id, n, l]) =>
      (document.querySelector(`#${id}`).textContent = String(n).padStart(
        l,
        "0",
      )),
  );
  document.querySelector("#dday-text").textContent = d;
}
countdown();
setInterval(countdown, 1000);
function initMap() {
  if (!window.naver?.maps) {
    showMapFailure();
    return;
  }

  const p = new naver.maps.LatLng(37.5194604, 127.0191255),
    map = new naver.maps.Map("naver-map", {
      center: p,
      zoom: 16,
      zoomControl: true,
    });
  new naver.maps.Marker({ position: p, map, title: "더컨벤션 신사" });
}
function showMapFailure() {
  document.querySelector("#naver-map").innerHTML =
    "<p>네이버 지도 인증에 실패했습니다.<br>Dynamic Map 이용 신청과 Web 서비스 URL을 확인해 주세요.</p>";
}

function waitForNaverMap(attempt = 0) {
  if (window.naver?.maps) {
    initMap();
  } else if (attempt < 20) {
    setTimeout(() => waitForNaverMap(attempt + 1), 250);
  } else {
    showMapFailure();
  }
}

window.navermap_authFailure = showMapFailure;

if (NAVER_CLOUD_MAP_CLIENT_ID !== "YOUR_NAVER_MAP_CLIENT_ID") {
  const s = document.createElement("script");
  s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(NAVER_CLOUD_MAP_CLIENT_ID)}`;
  s.onload = () => waitForNaverMap();
  s.onerror = showMapFailure;
  document.head.append(s);
}
const toast = document.querySelector("#toast");
function notice(t) {
  toast.textContent = t;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
document.querySelectorAll("[data-copy]").forEach((b) =>
  b.addEventListener("click", async () => {
    await navigator.clipboard.writeText(b.dataset.copy);
    notice("계좌번호를 복사했습니다.");
  }),
);
document.querySelector("#copy-url").addEventListener("click", async () => {
  await navigator.clipboard.writeText(location.href);
  notice("청첩장 주소를 복사했습니다.");
});
document
  .querySelector("#share")
  .addEventListener("click", () =>
    navigator.share
      ? navigator.share({ title: "한신랑 · 김신부 결혼식", url: location.href })
      : notice("공유 기능을 지원하지 않습니다."),
  );
const terminal = document.querySelector("#terminal"),
  out = document.querySelector("#terminal-output");
const terminalLines = [
  ["muted", "Last login: Sun Sep 26 10:41:07 on love.local"],
  ["prompt", "han-groom@wedding ~ % ./open-invitation.sh"],
  ["info", "Initializing love_protocol v2027.09.26..."],
  ["success", "✓ connection established"],
  ["prompt", "han-groom@wedding ~ % cat ./our-story.txt"],
  ["output", "한 줄기 별빛이 되어 만난 인연,"],
  ["output", "평생을 함께 걸어가려 합니다."],
  ["prompt", "han-groom@wedding ~ % wedding --when"],
  ["accent", "2027. 09. 26. SUN 11:00 AM"],
  ["prompt", "han-groom@wedding ~ % wedding --where"],
  ["accent", "THE CONVENTION SINSA"],
  ["prompt", "han-groom@wedding ~ % echo $MESSAGE"],
  ["output", "새로운 챕터의 시작에 함께 접속해 주세요."],
  ["success", "Invitation delivered. ♥"],
];
let terminalTimer;
function streamTerminal() {
  clearInterval(terminalTimer);
  out.innerHTML = "";
  let lineIndex = 0;
  terminalTimer = setInterval(() => {
    if (lineIndex >= terminalLines.length) return clearInterval(terminalTimer);
    const [kind, text] = terminalLines[lineIndex++];
    const line = document.createElement("span");
    line.className = `terminal-line ${kind}`;
    line.textContent = text;
    out.append(line, document.createTextNode("\n"));
    out.scrollTop = out.scrollHeight;
  }, 520);
}
document.querySelector("#open-terminal").onclick = () => {
  terminal.classList.add("is-open");
  streamTerminal();
};
document.querySelector("#close-terminal").onclick = () =>
  terminal.classList.remove("is-open");
document.addEventListener("keydown", (e) => {
  if (terminal.classList.contains("is-open")) {
    if (e.key === "Escape") terminal.classList.remove("is-open");
  }
});

// 사진을 더 넣고 싶다면 이 배열 끝에 "images/gallery/photo-10.jpg"처럼 추가하세요.
const galleryPhotos = Array.from(
  { length: 15 },
  (_, index) => `images/gallery/photo-${index + 1}.jpg`,
);
const galleryGrid = document.querySelector("#gallery-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCount = document.querySelector("#lightbox-count");
let activePhoto = 0;

function showPhoto(index) {
  activePhoto = (index + galleryPhotos.length) % galleryPhotos.length;
  lightboxImage.src = galleryPhotos[activePhoto];
  lightboxCount.textContent = `${activePhoto + 1} / ${galleryPhotos.length}`;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

galleryPhotos.slice(0, 9).forEach((photo, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", `${index + 1}번째 웨딩 사진 크게 보기`);
  button.innerHTML = `<img src="${photo}" alt="한신랑과 김신부의 웨딩 사진 ${index + 1}">`;
  if (index === 8) {
    button.classList.add("more-card");
    button.innerHTML += "<span>더보기</span>";
  }
  button.addEventListener("click", () => showPhoto(index));
  galleryGrid.append(button);
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

document
  .querySelector("#lightbox-previous")
  .addEventListener("click", () => showPhoto(activePhoto - 1));
document
  .querySelector("#lightbox-next")
  .addEventListener("click", () => showPhoto(activePhoto + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") showPhoto(activePhoto + 1);
});

let touchStartX = 0;
let touchStartY = 0;

lightboxImage.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  },
  { passive: true },
);

lightboxImage.addEventListener(
  "touchend",
  (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) < 35 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    showPhoto(deltaX < 0 ? activePhoto + 1 : activePhoto - 1);
  },
  { passive: true },
);
