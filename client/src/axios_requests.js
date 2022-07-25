import axios from 'axios';
axios.defaults.withCredentials = true

const BE = "http://localhost:8080"
const avatarAPI = `https://api.multiavatar.com/4645646`;



export const logIn = (data) => {
    return axios.post(BE + '/login', data)
}

export const register = (data) => {
    return axios.post(BE + '/users/add', data)
}

export const getAllUsers = (data) => {
    return axios.get(BE + '/users/all')
}

export const editUser = (data) => {
    return axios.post(BE + "/users/edit", data);
};

export const deleteUser = (data) => {
    return axios.post(BE + "/users/delete", data);
};

export const getUserProfile = () => {
    return axios.get(BE + "/profile");
};

export const getCoinValueInUSD = () => {
    return axios.get(BE + "/levCoin/getValueUSD");
};

export const getCoinValueInNIS = () => {
    return axios.get(BE + "/levCoin/getValueNIS");
};


export const getCurrentUser = async () => {
    let resp = await axios.get(BE + "/profile");
    return resp.data.username;
        
};

export const getRandomAvatar = () => {
    return   axios.get(
        `${avatarAPI}/${Math.round(Math.random() * 1000)}`,
        { withCredentials: false}
      );
};

export const sendMessage = (receiver, content) => {
    let data = { 
        receiver: receiver,
        content: content
    } 
    return axios.post(BE + "/messages/send", data);
};

export const sendMoney = (receiver, ammount, currency) => {
    let data = { 
        receiver: receiver,
        ammount: ammount,
        currency: currency, 
    } 
    return axios.post(BE + "/transactions/transfer", data);
};

export const getAllMessages = async (user) => {
    let data = {
        receiver: user.username
    }
    let resp = await axios.post(BE + "/messages/sent", data);
    return resp;
}