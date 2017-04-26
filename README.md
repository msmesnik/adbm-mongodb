# adbm-mongodb
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

mongoDB adapter for [adbm](https://github.com/daerion/adbm) database migration tool.

## Installation
```
npm install adbm-mongodb
```

## Testing
Tests must be able to connect to a mongodb database. You can either provide a full mongodb URI via the `DB_URI` environment variable or use the `docker:db` npm script to spin up a docker container called `adbm_dev_db` which will provide a mongodb 3.4 server. Afterwards simply run:
```
npm run test
```

## Author
[Michael Smesnik](https://github.com/daerion) at [tailored apps](https://github.com/tailoredapps)

## License
MIT
