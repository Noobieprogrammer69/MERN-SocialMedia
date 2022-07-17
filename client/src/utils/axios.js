import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social6969.herokuapp.com/api/'
});

export default instance;