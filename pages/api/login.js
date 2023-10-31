export default function handler(req, res) {

  const users = [
    {
      id: 13896475,
      name: "Jhon Doe",
      email_address: "jhon@jhon.com",
      user_rol: "adviser",
      status: "authorized",
      password: 1234567,
    },
    {
      id: 1567859,
      name: "Cristhian",
      email_address: "cristhian@paperplane.co",
      user_rol: "admin",
      status: "authorized",
      password: 1234567,
    },
  ];

  let userToLog;

  userToLog =
    users.find((user) => user.name === req.body.name) ||
    users.find((user) => user.id === Number(req.body.token));

  if (req.body.token) {
    res.status(200).json(userToLog);
    return;
  }

  if (userToLog) {
    if (userToLog.password === Number(req.body.password)) {
      res.status(200).json(userToLog);
    }
  }
}
