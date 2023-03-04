import axios from "../../node_modules/axios/dist/esm/axios.js";
// import axios from "axios";

const API_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/users";

// Lấy data từ server (nếu không truyền tham số thì mặc định lấy tất cả, nếu có tham số thì đó là value của thuộc tính category)
export function getPersonAPI(value){
    return axios({
        method: "GET",
        url: API_URL,
        params: {
            category: value || undefined
        }
    });
}

// Lấy data theo ID
export function getPersonAPIByID(personID){
    return axios({
        method: "GET",
        url: `${API_URL}/${personID}`
    });
}

// Xóa data khỏi server
export function deletePersonAPI(personID, userType){
    return axios({
        method: "DELETE",
        url: `${API_URL}/${personID}`,
        params: {
            category: userType || undefined
        }
    });
}

// Thêm data mới vào server
export function createPersonAPI(person){
    return axios({
        method: "POST",
        url: API_URL,
        data: person
    });
}

// Cập nhật data vào server
export function updatePersonAPI(personID, person){
    return axios({
        method: "PUT",
        url: `${API_URL}/${personID}`,
        data: person
    });
}