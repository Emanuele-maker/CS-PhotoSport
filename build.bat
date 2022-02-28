call break>.\client\src\images.json
call break>.\client\src\previews.json
call node ./loadImages.js
call cd client/
call npm ci
npm run build