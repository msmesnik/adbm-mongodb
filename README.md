# adbm-mongodb
mongoDB adapter for [adbm](https://github.com/daerion/adbm) database migration tool.

## Installation
```
yarn add adbm-mongodb
```

## Testing
Tests must be able to connect to a mongodb database. You can either provide a full mongodb URI via the `DB_URI` environment variable or use the `docker:db` npm script to spin up a docker container called `adbm_dev_db` which will provide a mongodb 4.0 server. Afterwards simply run:
```
yarn run test
```

## Author
[Michael Smesnik](https://github.com/daerion) at [crystallize](https://crystallize.com)

## License
MIT
