export default async function recentsContacts(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetRecentContacts?username=${req.body.id}`
    );
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    const contacts = await response.json();

    if (contacts) {
      res.status(200).json(contacts);
    }
  } catch (error) {}
}
