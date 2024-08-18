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
export const GetTrendingCoins = async () => {
  // const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/cmc/trending-recent`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};
export const GetNews = async (count) => {
  let endpoint = '';
  if (count) {
    endpoint = `news?page=1&limit=${count}`
  }
  else {
    endpoint = `news?page=1&limit=24`
  }
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/cmc/${endpoint}`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};
export const GetProfileData = async () => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/auth/profile`, {
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

    const response = await axios.put(`/auth/profile`, data, {
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

    const response = await axios.post(`/auth/profile-image`, formData, {
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

export const GetCmcData = async (shariahStatus, rank, percentageChange) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`

    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    let endpoint = '';
    if (shariahStatus === 'All' && rank === null && percentageChange === 'All') {
      endpoint = `/cmc/all`;
    } else if (shariahStatus !== 'All' && rank === null && percentageChange === 'All') {
      endpoint = `/cmc/all?shariahStatus=${shariahStatus}`;
    } else if (shariahStatus === 'All' && rank !== null && percentageChange === 'All') {
      endpoint = `/cmc/all?rank=${rank}`;
    } else if (shariahStatus === 'All' && rank === null && percentageChange !== 'All') {
      endpoint = `/cmc/all?percentageChange=${percentageChange}`;
    } else if (shariahStatus !== 'All' && rank !== null && percentageChange === 'All') {
      endpoint = `/cmc/all?shariahStatus=${shariahStatus}&rank=${rank}`;
    } else if (shariahStatus !== 'All' && rank === null && percentageChange !== 'All') {
      endpoint = `/cmc/all?shariahStatus=${shariahStatus}&percentageChange=${percentageChange}`;
    } else if (shariahStatus === 'All' && rank !== null && percentageChange !== 'All') {
      endpoint = `/cmc/all?rank=${rank}&percentageChange=${percentageChange}`;
    } else {
      endpoint = `/cmc/all?shariahStatus=${shariahStatus}&rank=${rank}&percentageChange=${percentageChange}`;
    }

    const response = await axios.get(endpoint, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};
export const GetCoinData = async (id) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`

    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.get(`/cmc/${id}`, {
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

    const response = await axios.put(`/auth/password`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const ChatbotQuery = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.post(`/chatbot/query`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const GetAllChat = async () => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/chatbot/all`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};
export const GetChatHistory = async (id) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/chatbot/chat-history/${id}`, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const DeleteChatHistory = async (allValue, data) => {
  const token = localStorage.getItem('user_token')



  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.put(`/chatbot/delete-chat?all=${allValue}`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const UpdateChatSubject = async (id, data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.put(`/chatbot/chat/${id}`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const GenrateReport = async (data) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.post(`/report/token`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};

export const GetReport = async (id) => {
  const token = localStorage.getItem('user_token')
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    };

    const response = await axios.get(`/report/view/${id}`, {
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

    const response = await axios.put(`/user-setting/save-chat-history`, data, {
      headers
    });

    return response.data;
  }
  catch (error) {
    handleCatch(error)
  }
};