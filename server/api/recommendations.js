const router = require('express').Router()
const { models: { Recommendation}} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const shows = await Recommendation.findAll()
    res.json(shows)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // const eventId = req.params.id
    const show= await Recommendation.findByPk(req.params.id);
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Recommendation.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const rating = await Recommendation.findByPk(req.params.id)
    res.send(await rating.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const show = await Rating.findByPk(req.params.id);
    await show.destroy();
    res.send(show);
  } catch (error) {
    next(error);
  }
});

module.exports = router
