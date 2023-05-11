const router = require('express').Router()
const { models: { User, Rating, Friend }} = require('../db')
const multer = require('multer');
module.exports = router

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'username'],
      include: [Rating, Friend]},
     )
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await User.findByPk(req.params.id,  {include: [Rating, Friend]});
    res.json(event);
  } catch (err) {
    next(err);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // get the path of the uploaded image, if any
    const image = req.file ? req.file.path : null;

    const user = await User.create({ username, password, imageUrl: image });
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (ex) {
    next(ex);
  }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     res.send(await user.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

router.put('/:id', upload.single('file'), async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    // get the path of the uploaded image, if any
    const image = req.file ? req.file.path : user.imageUrl;

    const updatedUser = await user.update({ ...req.body, imageUrl: image });
    const token = await updatedUser.generateToken();
    res.send({ user: updatedUser, token });
  } catch (ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router
