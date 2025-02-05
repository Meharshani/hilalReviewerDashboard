import { url } from "../environment";
import axios from "./axios";

const handleCatch = (error) => {
  if (error.response) {

    if (error.response.status === 422) {
      if (error.response.data.errors) {
        const myObject = error.response.data.errors;
        const firstKey = Object.keys(myObject)[0];
        const firstValue = myObject[firstKey];
        throw new Error(firstValue[0]);
      }
      else {
        throw new Error(error.response.data.message);
      }
    }
    else if (error.response.status === 400) {
      if (error.response.data.message.includes('is already a list member')) {
        const msg = error.response.data.message.split('. ')[0];
        throw new Error(msg);
      }

      else {

        throw new Error(error.response.data.message);
      }

    }

    else if (error.response.status === 401) {
      localStorage.clear()
      window.location.reload()
      throw new Error(error.response.data.message);
    }
    else {

      throw new Error('An error occurred on the server.');
    }
  } else if (error.request) {

    console.log(error.request);
  } else {

    console.log('Error', error.message);
  }
  throw error;
}

export const GetProfileData = async () => {
  const token = localStorage.getItem('user_token')
  // console.log("getprofile working");

  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`api/reviewer/admin/profile`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const UpdateProfileData = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.put(`api/reviewer/admin/profile`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const UpdateProfileImage = async (imageFile) => {
  const token = localStorage.getItem('user_token');
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await axios.post(`api/reviewer/admin/profile-image`, formData, {
      headers
    });

    return response.data;
  } catch (error) {
    handleCatch(error);
  }
};
export const GetCmcSearchData = async (query) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',


    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }


    const response = await axios.get(`/cmc/all?page=1&limit=100&search=${query}`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};


export const GetFavData = async () => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/watch-list`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const AddToFavorite = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.post(`/watch-list/add-coin`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};
export const RemoveFromFavorite = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.put(`/watch-list/remove-coin`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const SetNewPassword = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.put(`api/reviewer/admin/password`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const UpdateUserSettings = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.put(`/user-setting/save-chat-history`, data,
      {
        headers
      });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

// Function to submit the report with status and report content
export const submitReport = async (report, reportId, shariahStatus, reportData) => {
  // console.log(' >>check', reportData);
  
  const token = localStorage.getItem("user_token");

  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Prepare data object dynamically
    const data = {};

    if (report) {
      data.report = report; // Only include report if it's not empty
    }

    if (shariahStatus) {
      data.shariahStatus = shariahStatus; // Only include shariahStatus if it's not empty
    }

    // If no valid data, don't send request
    if (Object.keys(data).length === 0) {
      console.log("No valid data to send");
      return;
    }

    const response = await axios.post(`api/reviewer/report/reqs/submit/${reportId}?requestedBy=${reportData?.requestedBy}`, data, { headers });

    return response.data;
  } catch (error) {
    handleCatch(error);
    return { success: false }; // Return failure status in case of error
  }
};


export const reportSave = async (report, reportId, shariahStatus, reportData) => {
  // console.log(reportData);

  const token = localStorage.getItem('user_token');

  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Prepare request body only with non-empty values
    const data = {};
    if (report) data.report = report;
    if (shariahStatus) data.shariahStatus = shariahStatus;
    // console.log(data);

    // If no valid data, don't send request
    if (Object.keys(data).length === 0) {
      console.log("No valid data to send");
      return;
    }

    const response = await axios.put(
      `api/reviewer/report/reqs/${reportId}?requestedBy=${reportData?.requestedBy}`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    handleCatch(error);
  }
};

