const Router = require('express').Router;
const communities = require('./communities.json');
const compounds = require('./compounds.json');
const experiments = require('./experiments.json');
const media = require('./media.json');

const router = new Router();

router.get('/communities', (req, res) => {
  res.send(communities);
});

router.get('/compounds', (req, res) => {
  res.send(compounds);
});

router.get('/experiments', (req, res) => {
  res.send(experiments);
});

router.get('/media', (req, res) => {
  res.send(media);
});

module.exports = router;
