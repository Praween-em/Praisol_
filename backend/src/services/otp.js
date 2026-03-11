const axios = require('axios');

const AUTH_KEY = process.env.MSG91_AUTH_KEY;
const TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

/**
 * Send OTP to a phone number via MSG91.
 * Phone must be 10 digits (without country code).
 */
async function sendOTP(phone) {
  const mobile = `91${phone}`;
  const response = await axios.post(
    'https://control.msg91.com/api/v5/otp',
    { template_id: TEMPLATE_ID, mobile, otp_length: 6 },
    { headers: { authkey: AUTH_KEY, 'Content-Type': 'application/json' } }
  );
  return response.data;
}

/**
 * Verify OTP entered by user against MSG91.
 * Returns true if OTP is valid.
 */
async function verifyOTP(phone, otp) {
  const mobile = `91${phone}`;
  const response = await axios.get(
    'https://control.msg91.com/api/v5/otp/verify',
    {
      params: { mobile, otp },
      headers: { authkey: AUTH_KEY },
    }
  );
  return response.data?.type === 'success';
}

module.exports = { sendOTP, verifyOTP };
