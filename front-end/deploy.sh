#! /bin/sh
npm run build
cp Staticfile ./build
cp nginx.conf ./build
cf push dss-explorer -p ./build
