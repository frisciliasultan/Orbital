import axios from "axios";

const setAuthToken = token => {
    if(token) {
        //Apply authorization token to every request if logged in 
        axios.defaults.headers.common["Authorization"] = token;
        axios.defaults.proxy = "https://modtree-api.netlify.app/.netlify/functions"
    } else {
        //Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;