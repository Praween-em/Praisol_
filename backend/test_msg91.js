const axios = require('axios');

// Keys from the user's files and messages
const KEY_TYK = '479641TYKLykX9U6926afd1P1'; // From backend .env
const KEY_ACV = '479641ACv4HX0B6926b235P1'; // From frontend .env.local and example
const WIDGET_ID = '356b42627974383835393936';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0SWQiOiIzNjYzNmU2ZTZmNzMzMzM3MzEzMTM3MzciLCJjb21wYW55SWQiOjQ3OTY0MX0.moJ1wvrIv_fDhvNoa0T8Pt9PwxWBLUGXiThrgQ2LR1o'; // Latest token from logs

const URLS = [
  'https://api.msg91.com/api/v5/widget/verifyAccessToken',
  'https://control.msg91.com/api/v5/widget/verifyAccessToken'
];

async function testPermutations() {
  const keys = [KEY_TYK, KEY_ACV];
  
  for (const url of URLS) {
    for (const key of keys) {
      console.log(`\n--- Testing URL: ${url} ---`);
      console.log(`--- Testing Key: ${key.substring(0, 8)}... ---`);

      const permutations = [
        { name: 'User Example (authkey/access-token in body)', body: { 'authkey': key, 'access-token': TOKEN } },
        { name: 'With widgetId in body', body: { 'authkey': key, 'access-token': TOKEN, 'widgetId': WIDGET_ID } },
        { name: 'camelCase (accessToken)', body: { 'authkey': key, 'accessToken': TOKEN, 'widgetId': WIDGET_ID } },
        { name: 'authkey in header ONLY', headers: { 'authkey': key }, body: { 'access-token': TOKEN, 'widgetId': WIDGET_ID } }
      ];

      for (const p of permutations) {
        process.stdout.write(`Trying: ${p.name}... `);
        try {
          const resp = await axios.post(url, p.body, {
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              ...(p.headers || {})
            },
            timeout: 5000
          });
          console.log(`Status: ${resp.status}, Type: ${resp.data.type}, Msg: ${resp.data.message}`);
          if (resp.data.type === 'success') {
            console.log('✅ SUCCESS FOUND!');
            return;
          }
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }
    }
  }
}

testPermutations();
