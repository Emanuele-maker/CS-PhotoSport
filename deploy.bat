SET subkey1=%random%%random%%random%%random%

SET subkey1=%subkey1:0=a%
SET subkey1=%subkey1:1=b%
SET subkey1=%subkey1:2=c%

call tsc
call cd client/
call npm run build
call cd ..
call git add .
call git commit -am %subkey1%
call git push heroku master
call git push
