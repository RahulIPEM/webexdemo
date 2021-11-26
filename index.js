import express from 'express';
import bodyParser from 'body-parser';
import WebExService from './WebexService';
const webExService = new WebExService();

var app = express();
// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hi, how are you?' });
});

app.post('/api/webex/room', async (req, res) => {
  try {
    const { bugid, user_list } = req.body;
    const result = await webExService.intiateBugRoom(bugid, user_list);
    res.status(200).send(result);
  } catch (error) {
    console.log('in controller', error);
    res.status(500).send(error);
  }
});

app.post('/api/webex/join', async (req, res) => {
  try {
    const { room_id, user_list } = req.body;
    const result = await webExService.addUsers(room_id, user_list);
    res.status(200).send(result);
  } catch (error) {
    console.log('in controller', error);
    res.status(500).send(error);
  }
});
