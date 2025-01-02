// route to get logged in user's info (needs the token)

// currently can retrieve this info from decrypted token
export const getMe = async (id, token) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

  export const getHelpers = async (user_id,token) => {
    try {
      const response = await fetch (`/api/kids/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  };

  export const getHelper = async(user_id,id,token) => {
    try {
      const response = await fetch(`/api/kids/users/${user_id}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  };

  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const createHelper = (userData, token) => {
    return fetch('/api/kids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };

  export const updateHelper = async (current_points,kids_id) => {
    try {
      const response = await fetch (`/api/kids/${kids_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(current_points),
    });
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  };
  

  export const createTask = (userData, token) => {
    return fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };

  export const getTasks = async(token) => {
    try {
      const response = await fetch('/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

  export const getKidsTasks = async (kids_id, token) => {
    try {
    const response = await fetch(`/api/tasks/kids/${kids_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};


  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Handle the data here (e.g., store it, process it, etc.)
        return data; // Return the data if needed
      })
      .catch(error => {
        // Handle any errors (e.g., network issues, invalid response, etc.)
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error if needed
      });
  };
  
  export const destroyTask = async (id) => {
    try {
      const response = await fetch (`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  };

  export const destroyHelper = async (id) => {
    try {
      const response = await fetch (`/api/kids/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  };