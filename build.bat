call node ./loadImages.js
call del .\static\js\* /Q
call del .\static\css\* /Q
call del .\static\media\* /Q
call cd client
call npm run build
call robocopy .\build ..\ * /mt /move
cd .\build\static
call robocopy .\js ..\..\..\static\js * /move /mt
call robocopy .\css ..\..\..\static\css * /move /mt
call robocopy .\media ..\..\..\static\media * /move /mt
cd ..\..
call rmdir .\build\static /Q
call del .\build\* /Q
call rmdir .\build /Q