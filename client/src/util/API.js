// route to get logged in user's info (needs the token)

// currently can retrieve this info from decrypted token


  //Users

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

  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  //Task
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

  export const updateTask = async (tasks_id) => {
    try {
      const response = await fetch (`/api/tasks/${tasks_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching task data');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching task data: ${error.message}`);
  }
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
  //Helper
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

  //Reward

  // create reward
  export const createReward = (userData, token) => {
    return fetch('/api/rewards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };

  // get rewards by user
  export const getRewards = async (user_id,token) => {
    try {
      const response = await fetch (`/api/rewards/users/${user_id}`, {
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

  export const getReward = async (users_id, rewardId) => {
    try {
      const response = await fetch (`/api/rewards/users/${users_id}/${rewardId}`, {
      method: 'GET',
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

  //update a sepecific rewards
  export const updateRewards = async (rewards_id, userData) => {
    try {
      const response = await fetch (`/api/rewards/${rewards_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error fetching rewards data');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching rewards data: ${error.message}`);
  }
  };
//destroy reward
  export const destroyReward = async (id) => {
    try {
      const response = await fetch (`/api/rewards/${id}`, {
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

  //Redemptions

  // create redemption record
  export const createPointHistory = (userData, token) => {
    return fetch('/api/point-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };
  

  // get rewards by user
  export const getPointHistory= async ( kids_id) => {
    try {
      const response = await fetch (`/api/point-history/kids/${kids_id}`, {
      method: 'GET',
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

  //update a sepecific point history
  export const updatePointHistory = async (point_history_id, userData) => {
    try {
      const response = await fetch (`/api/point-history/${point_history_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error fetching redemption data');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching redemption data: ${error.message}`);
  }
  };
//destroy point history
  export const destroyPointHistory = async (id) => {
    try {
      const response = await fetch (`/api/point-history/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching redemption data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching reddemption data: ${error.message}`);
  }
  };

    //Penalties

  // create penalty
  export const createPenalty = (userData, token) => {
    return fetch('/api/penalties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };
  // get penalties by user
  export const getPenalties = async (user_id,token) => {
    try {
      const response = await fetch (`/api/penalties/users/${user_id}`, {
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
  //update a sepecific penalty
  export const updatePenalties = async (penalties_id, userData) => {
    try {
      const response = await fetch (`/api/penalties/${penalties_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error fetching rewards data');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching rewards data: ${error.message}`);
  }
  };
//destroy penalty
  export const destroyPenalty = async (id) => {
    try {
      const response = await fetch (`/api/penalties/${id}`, {
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
