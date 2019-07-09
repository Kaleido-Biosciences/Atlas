const Router = require('express').Router;
const axios = require('axios');

const communities = require('./communities.json');
const compounds = require('./compounds.json');
const experiments = require('./experiments.json');
const media = require('./media.json');

const router = new Router();

router.get('/communities', (req, res) => {
  axios
    .get('https://kapture-staging.apps.kaleidobio.com/api/communities')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/batches', (req, res) => {
  axios
    .get('https://kapture-staging.apps.kaleidobio.com/api/batches')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/experiments', (req, res) => {
  axios
    .get('https://kapture-staging.apps.kaleidobio.com/api/experiments')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/media', (req, res) => {
  axios
    .get('https://kapture-staging.apps.kaleidobio.com/api/media')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/supplements', (req, res) => {
  axios
    .get('https://kapture-staging.apps.kaleidobio.com/api/supplements')
    .then(response => {
      res.send(response.data);
    });
});

module.exports = router;
