import webex from 'webex';

class WebExService {
  constructor() {
    this.guestIssuerID = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL09SR0FOSVpBVElPTi9hYWIwZTFjNC1jYTI3LTQ1MzgtYjlkYy00MWQ2YzU5YjIyYWE';
    this.guestSharedSecret = 'z5rtp2UCc5d3Y+M1qCcdayPlybeFn8fxlceEO8+UYdE=';
    this.botToken = 'ZDI2ZTRkOTgtZTEyNC00YzdhLWI3YjYtYmJlODE0Zjg2NzFkMGRhZWNkZWYtN2Nk_P0A1_c98415b4-c72b-47aa-82ca-ffe96054cf5a';
    this.apiKey = '9e178756-ea40-42c1-ae5f-79ed03831466';
    this.secretKey =
      'NIM8H7G2VQH8T8SHY6VFJYRU625G59XCYMBEL4JUUIB8BILOQTS7P3JGIKGH58LDX4XSL5APK4Q76S3SDNCIOGVAYROAE1RUAZJ244ECFPY64MW8G2U49T1SXWDYTE79G7B8ECH8TTZQ61IQA4NEMVCLXHK1RDCLVJWX67P6N07T657IUKD0VIKJSI47VIW7IJ8JX5PWAKLY5SBUUS9QY5A12UCV74MZRRHTALR3GKVI1EMS9BQPKOSMTV38LVHP95AONL6LR66DQ90AV8BWMDZSLFPKAKWPEUA899SU87RQB0LB6AMPO5R2KXLMW8CTO7R68O3M3T2BK7QKMNTWS3';
    this.webex = webex.init({
      credentials: {
        access_token: this.botToken,
      },
    });
  }

  intiateBugRoom = async (bugid, user_list) => {
    return new Promise((resolve, reject) => {
      this.webex.rooms
        .create({
          title: bugid,
        })
        .then(async room => {
          console.log(`Room created`, room);
          const memberships = await this.addUsers(room.id, user_list);
          resolve({ bugid, user_list, room, memberships });
        })
        // Make sure to log errors in case something goes wrong.
        .catch(error => {
          console.error(error);
          reject({ error: error.message });
        });
    });
  };

  addUsers = async (room_id, user_list = []) => {
    console.log('add user =====> ', room_id, user_list);
    return new Promise(async (resolve, reject) => {
      if (room_id && user_list) {
        let promiseAll = [];
        user_list.forEach(user => {
          promiseAll.push(this.webex.memberships.create({ roomId: room_id, personEmail: `${user}@gmail.com` }));
        });
        await Promise.all(promiseAll)
          .then(memberships => {
            resolve(memberships);
          })
          .catch(error => {
            reject({ error: error.message });
          });
      } else {
        reject({ error: `Room id is required.` });
      }
    });
  };

  sendMessage = async (room_id, message) => {
    console.log('add user =====> ', room_id, user_list);
    return new Promise(async (resolve, reject) => {
      if (room_id && message) {
        this.webex.message
          .create({ roomId: room_id, text: message })
          .then(memberships => {
            resolve(memberships);
          })
          .catch(error => {
            reject({ error: error.message });
          });
      } else {
        reject({ error: `Room id and message are required.` });
      }
    });
  };
}

export default WebExService;
