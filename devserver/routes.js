const Router = require('express').Router;
const axios = require('axios');

const communities = require('./communities.json');
const compounds = require('./compounds.json');
const experiments = require('./experiments.json');
const media = require('./media.json');

const router = new Router();

router.get('/communities', (req, res) => {
  axios
    .get(API_URL +'/communities')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/batches', (req, res) => {
  axios
    .get(API_URL +'/batches')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/experiments', (req, res) => {
  axios
    .get(API_URL +'/experiments')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/media', (req, res) => {
  axios
    .get(API_URL +'/media')
    .then(response => {
      res.send(response.data);
    });
});

router.get('/supplements', (req, res) => {
  axios
    .get(API_URL +'/supplements')
    .then(response => {
      res.send(response.data);
    });
});

module.exports = router;
