export default async function handler(req, res) {
  console.log(req.body);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/projectFilter?priceFrom=${req.body.minPrice}&priceTo=${req.body.maxPrice}&floorFrom=${req.body.minFloor}&floorTo=${req.body.maxFloor}&sizeFrom=${req.body.minSize}&sizeTo=${req.body.maxSize}&bedroomFrom=1&bedroomTo=3&bathFrom=1&bathTo=3&page=1`
    );

    if (!response.ok) {
      throw new Error('Bad response from server');
    }

    const leakedProjects = await response.json();

    res.status(200).json(leakedProjects);
  } catch (error) {
    console.error(error);
  }
}
