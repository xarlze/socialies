const baseUrl = "http://localhost:3000";

export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/auth/login`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const registerUser = (registerData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${baseUrl}/users`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const getUsers = () =>{
  return fetch(`${baseUrl}/users`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const getDetail = id =>{
  return fetch(`${baseUrl}/users/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const putUser = (id, data) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  
  return fetch(`${baseUrl}/users/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const getFriends = (id) =>{
  return fetch(`${baseUrl}/friendships/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const postFriendship = (data) =>{
  const opts = {
    method: 'POST',
    body: JSON.stringify({ friendship: data }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${baseUrl}/friendships`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}







