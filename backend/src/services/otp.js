const axios = require('axios');

/**
 * Send OTP to a phone number via MSG91.
 */
async function sendOTP(phone) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const mobile = `91${phone}`;
  
  const response = await axios.post(
    'https://control.msg91.com/api/v5/otp',
    { template_id: templateId, mobile, otp_length: 6 },
    { headers: { authkey: authKey, 'Content-Type': 'application/json' } }
  );
  return response.data;
}

/**
 * Verify OTP entered by user against MSG91 (Legacy flow).
 */
async function verifyOTP(phone, otp) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const mobile = `91${phone}`;
  const response = await axios.get(
    'https://control.msg91.com/api/v5/otp/verify',
    {
      params: { mobile, otp },
      headers: { authkey: authKey },
    }
  );
  return response.data?.type === 'success';
}

/**
 * Verify an access token from the MSG91 Hello widget.
 * Returns the user's identifier (phone/email) if valid.
 */
async function verifyWidgetToken(token) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const widgetId = process.env.MSG91_WIDGET_ID;
  
  if (!authKey) throw new Error('Server configuration error: MSG91_AUTH_KEY missing');
  if (!token) throw new Error('Token is required');

  const url = 'https://api.msg91.com/api/v5/widget/verifyAccessToken';
  
  async function attempt(key, label) {
    const body = { 'authkey': key, 'access-token': token, 'widgetId': widgetId };
    try {
      const resp = await axios.post(url, body, {
        headers: { 'authkey': key, 'Content-Type': 'application/json', 'Accept': 'application/json' }
      });
      if (resp.data?.type === 'success') {
        // MSG91 can return mobile in resp.data.data OR directly in resp.data.message
        return resp.data.data ?? resp.data.message;
      }
      return { error: resp.data?.message || 'Failed', code: resp.data?.code };
    } catch (err) {
      if (err.response) return { error: err.response.data?.message || err.message, code: err.response.data?.code };
      return { error: err.message };
    }
  }

  // 1. Try with the key from .env
  let result = await attempt(authKey, 'Primary Key');
  
  // 2. If it's an AuthenticationFailure (201/401), try the fallback key
  const fallbackKey = process.env.MSG91_FALLBACK_KEY;
  if (fallbackKey && result && (result.error === 'AuthenticationFailure' || result.code == '201' || result.code == '401')) {
    result = await attempt(fallbackKey, 'Fallback Key');
  }

  if (result && !result.error) {
    // Robust mobile number extraction
    let mobile = null;
    if (typeof result === 'string') {
      mobile = result;
    } else if (result && typeof result === 'object') {
      mobile = result.mobile || (result.description ? result.description.mobile : null);
    }

    if (!mobile) throw new Error('Verification succeeded but no mobile number found in data');
    return { mobile: String(mobile) };
  }

  throw new Error(`MSG91 Verification Failed: ${result?.error || 'Unknown error'}`);
}

module.exports = { sendOTP, verifyOTP, verifyWidgetToken };
