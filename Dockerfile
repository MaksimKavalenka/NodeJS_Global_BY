from node:8.6.0
run mkdir /web
copy . /web
workdir /web
run npm install
