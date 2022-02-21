SET subkey1=%random%%random%%random%%random%

SET subkey1=%subkey1:0=a%
SET subkey1=%subkey1:1=b%
SET subkey1=%subkey1:2=c%

call cd client/
call npm run build
call robocopy .\build ..\ * /mt
call Remove-Item -LiteralPath .\build -Force -Recurse
call cd ..
call git add .
call git commit -am %subkey1%
call git push