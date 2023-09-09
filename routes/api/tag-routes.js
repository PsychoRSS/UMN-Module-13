const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{model: Product}, {model:ProductTag}]
    })
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const specificTag = await Tag.findByPk(req.params.id, {
      include: [{model:Product}, {model:ProductTag}]
    })
    res.status(200).json(specificTag);
  } catch (err) {
    res.status(500).json(err);
  }

  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/',async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const specificTag = await Tag.update(req.body, {where: {id: req.body.id}});
    if (!specificTag) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(specificTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id',async (req, res) => {
  try {
    const specificTag = await Tag.destroy({where: {id: req.params.id}});
    if (!specificTag) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(specificTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
