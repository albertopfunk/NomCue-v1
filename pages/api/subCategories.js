import subCategories from '../../data/subCategories.json';

export default (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({message: "need a category name"})
  }

  if (!subCategories[req.query.name]) {
    return res.status(400).json({message: "category name is incorrect"})
  }

  res.send(subCategories[req.query.name])
};
