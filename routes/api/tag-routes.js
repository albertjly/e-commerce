const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const dbTags = await Tag.findAll(
      {
        include: [
          {
            model: Product,
            through: ProductTag,
          }
        ]
      });
    res.json(dbTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const dbTag = await Tag.findOne(
      {
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Product,
            through: ProductTag,
          }
        ]
      });
    res.json(dbTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tagIds) => res.status(200).json(tagIds))
    .then((productIds) => res.status(200).json(productIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(data => res.json(data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
