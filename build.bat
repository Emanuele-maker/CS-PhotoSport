@REM call node ./loadImages.js
@REM call del .\static\js\* /Q
@REM call del .\static\css\* /Q
@REM call del .\static\media\* /Q
call cd client/
call del .\test.txt
@REM call npm run build
@REM call robocopy .\build ..\ * /mt /move
@REM cd .\build\static
@REM call robocopy .\js ..\..\..\static\js * /move /mt
@REM call robocopy .\css ..\..\..\static\css * /move /mt
@REM call robocopy .\media ..\..\..\static\media * /move /mt
@REM cd ..\..
@REM call rmdir .\build\static /Q
@REM call del .\build\* /Q
@REM call rmdir .\build /Q