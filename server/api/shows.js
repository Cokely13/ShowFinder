const router = require('express').Router()
const Sequelize = require('sequelize')
const { models: { Show, Rating}} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const shows = await Show.findAll({include: Rating})
    res.json(shows)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // const eventId = req.params.id
    // const show = await Show.findOne({
    //   FROM: Show,
    //   where: {id: req.params.id},
    //   include: [
    //     {
    //       model: Rating, //including ratings array
    //       as: 'ratings',
    //       required: true,
    //       attributes: [], //but making it empty
    //     },
    //   ],
    //   // attributes: {
    //   //   include: [ // this adds AVG attribute to others instead of rewriting
    //   //     [Sequelize.fn('AVG', Sequelize.col('ratings.rating')), 'avgRating'],
    //   //   ],
    //   // },
    //   // group: ['Show.id'],
    // });


    const show= await Show.findByPk((req.params.id), {include: Rating})
    //     where: {id : req.params.id},
    //     include: Rating
    //   , attributes: {
    //     include: [ // this adds AVG attribute to others instead of rewriting
    //       [Sequelize.fn('AVG', Sequelize.col('ratings.rating')), 'avgRating'],
    //     ]},
    //     group: ['Show.id'],}
    // )
    //   attributes: [sequelize.fn("COUNT", sequelize.col("id"))],
    // });
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Show.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id)
    res.send(await show.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.send(show);
  } catch (error) {
    next(error);
  }
});







module.exports = router
