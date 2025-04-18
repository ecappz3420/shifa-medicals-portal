import axios from "axios";

var baseURL =
  "https://www.zohoapis.in/creator/v2.1/data/shifaumar421/order-management";
let cachedAccessToken = null;
let tokenExpiryTime = 0;

export async function refreshAccessToken() {
  try {
    if (cachedAccessToken && Date.now() < tokenExpiryTime) {
      return cachedAccessToken; // Return cached token if not expired
    }
    const response = await axios.post(
      "https://accounts.zoho.in/oauth/v2/token",
      null,
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_ZOHO_CLIENT_SECRET,
          refresh_token: process.env.NEXT_PUBLIC_ZOHO_REFRESH_TOKEN,
          grant_type: "refresh_token",
        },
      }
    );
    const { access_token, expires_in } = response.data;
    cachedAccessToken = access_token;
    tokenExpiryTime = Date.now() + expires_in * 1000;
    return access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

export async function getRecords(reportLinkName, authToken, criteria) {
  try {
    const response = await axios.get(
      `https://www.zohoapis.in/creator/v2.1/data/shifaumar421/order-management/report/${reportLinkName}?max_records=1000&criteria=${encodeURIComponent(
        criteria
      )}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${authToken}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
}

export async function addRecord(formLinkName, authToken, data) {
  try {
    const formData = JSON.stringify({
      data: data,
    });
    const response = await axios.post(
      `https://www.zohoapis.in/creator/v2.1/data/shifaumar421/order-management/form/${formLinkName}`,
      formData,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding record:", error);
    throw error;
  }
}

export async function updateRecord(
  appLinkName,
  formLinkName,
  recordId,
  authToken,
  data
) {
  try {
    const response = await axios.patch(
      `${baseURL}/${appLinkName}/${formLinkName}/${recordId}`,
      data,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
}

export async function deleteRecord(
  appLinkName,
  formLinkName,
  recordId,
  authToken
) {
  try {
    const response = await axios.delete(
      `${baseURL}/${appLinkName}/${formLinkName}/${recordId}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
}
