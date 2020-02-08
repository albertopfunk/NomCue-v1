import fetch from "isomorphic-unfetch";
import validParams from "../../data/validParams";

export default async (req, res) => {
  const { location, id } = JSON.parse(req.body);

  if (!validParams[id]) {
    return res.status(400).json({ message: `${id} is not a valid param` });
  }

  const url = `${process.env.YELP_URL}?location=${location}&radius=40000&categories=${id}&limit=50`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  };

  try {
    const resp = await fetch(url, options);
    const categories = await resp.json();

    if (res.statusCode !== 200) {
      return res.status(500).json({ message: "Yelp Error" });
    }

    res.send(categories);
  } catch (err) {
    res.status(500).json({ message: "Yelp Error" });
  }
};
