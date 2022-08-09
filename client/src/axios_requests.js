import axios from 'axios'
axios.defaults.withCredentials = true

const BE = 'http://localhost:8081'
const avatarAPI = `https://api.multiavatar.com/4645646`

export const logIn = (data) => {
  return axios.post(BE + '/login', data)
}

export const register = (data) => {
  return axios.post(BE + '/users/add', data)
}

export const getAllUsers = (data) => {
  return axios.get(BE + '/users/all')
}

export const getAnotherUser = (username) => {
  return axios.get(BE + '/getAnotherUser?username=' + username);
}

export const getManager = () => {
  return axios.get(BE + '/users/manager')
}

export const getUser = () => {
  return axios.get(BE + '/users/manager')
}

export const getFeedbacks =  () => {
  return axios.get(BE + '/feedbacks')
}

export const editUser = (data) => {
  return axios.post(BE + '/users/edit', data)
}

export const deleteUser = (data) => {
  return axios.post(BE + '/users/delete', data)
}

export const getUserProfile = () => {
  return axios.get(BE + '/profile')
}

export const getCoinValueInUSD = () => {
  return axios.get(BE + '/levCoin/getValueUSD')
}

export const getCoinValueInNIS = () => {
  return axios.get(BE + '/levCoin/getValueNIS')
}

export const logout = () => {
    return axios.get(BE + '/logout')
  }

export const getCurrentUser = async () => {
  let resp = await axios.get(BE + '/profile')
  return resp.data.username
}

export const getAllTransactions = async () => {
  let resp = await axios.get(BE + '/transactions/all')
  return resp.data
}

export const getRandomAvatar = () => {
  return axios.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}`, { withCredentials: false })
}

export const sendMessage = (receiver, content) => {
  let data = {
    receiver: receiver,
    content: content,
  }
  return axios.post(BE + '/messages/send', data)
}

export const transferMoney = (receiver, ammount, currency) => {
  let data = {
    receiver: receiver,
    ammount: ammount,
    currency: currency,
  }
  return axios.post(BE + '/transactions/transfer', data)
}

export const askMoney = (receiver, ammount, returnDate) => {
  let data = {
    to: receiver,
    ammount: ammount,
    returnDate: returnDate,
  }
  return axios.post(BE + '/notifications/request', data)
}

export const getPendingNotifications = () => {
  return axios.get(BE + '/notifications/pending')
}

export const rejectNotification = (notification) => {
  let data = {
    notification: notification,
  }
  return axios.post(BE + '/notifications/reject', data)
}

export const dismissNotification = (notification) => {
  let data = {
    notification: notification,
  }
  return axios.post(BE + '/notifications/dismiss', data)
}

export const acceptNotification = (notification) => {
  let data = {
    notification: notification,
  }
  return axios.post(BE + '/notifications/accept', data)
}

export const borrowMoney = (receiver, ammount, currency, date) => {
  let data = {
    receiver: receiver,
    ammount: ammount,
    currency: currency,
    expiryDate: date,
  }
  return axios.post(BE + '/transactions/borrow', data)
}

export const getAllMessages = async (user) => {
  let resp = await axios.get(BE + '/messages/sent?receiver=' +  user.username);
  return resp;
}
