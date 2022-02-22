node ./loadImages.js
Remove-Item -Path .\static\js\* -Force -Recurse
Remove-Item -Path .\static\css\* -Force -Recurse
Remove-Item -Path .\static\media\* -Force -Recurse
cd client
npm run build
Move-Item -Path .\build\static\js\* -Destination ..\static\js
Move-Item -Path .\build\static\css\* -Destination ..\static\css
Move-Item -Path .\build\static\media\* -Destination ..\static\media
robocopy .\build ..\ * /mt
Remove-Item -LiteralPath .\build -Force -Recurse
cd ..