const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategory = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const specificCat = await Category.findByPk(req.params.id, {
      include: [{model:Product}]
    })
    res.status(200).json(specificCat);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  try {
    const specificCat = await Category.update(req.body, {where: {id: req.body.id}});
    if (!specificCat) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(specificCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
try {
    const specificCat = await Category.destroy({where: {id: req.params.id}});
    if (!specificCat) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(specificCat);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
