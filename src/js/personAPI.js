import axios from "../../node_modules/axios/dist/esm/axios.js";
// import axios from "axios";

const API_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/users";

// Lấy tất cả data từ server
export function getPersonAPI(searchVal){
    return axios({
        method: "GET",
        url: API_URL,
        params: {
            category: searchVal || undefined
        }
    });
}

// Xóa data khỏi server
export function deletePersonAPI(personID, usertype){
    return axios({
        method: "DELETE",
        url: `${API_URL}/${personID}`,
        params: {
            category: usertype || undefined
        }
    });
}