export default async function handler(req, res) {
  console.log(req.body);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/projectFilter?priceFrom=${req.body.minPrice}&priceTo=${req.body.maxPrice}&floorFrom=${req.body.minFloor}&floorTo=${req.body.maxFloor}&sizeFrom=${req.body.minSize}&sizeTo=${req.body.maxSize}&bedroomFrom=${req.body.minBeds}&bedroomTo=${req.body.maxBeds}&bathFrom=${req.body.minBaths}&bathTo=${req.body.maxBaths}&projectId=${req.body.projectId}&username=${req.body.id}&page=1&rows=100`
    );

    if (!response.ok) {
      throw new Error('Bad response from server');
    }

    const leakedProjects = await response.json();

    res.status(200).json(leakedProjects);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
