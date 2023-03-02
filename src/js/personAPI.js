import axios from "axios";

const API_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/users";

export function getPersonAPI(searchVal){
    return axios({
        method: "GET",
        url: API_URL,
        params: {
            category: searchVal || undefined
        }
    });
}