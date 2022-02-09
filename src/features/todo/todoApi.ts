import axios from "axios";
import { API_URL } from "../../Constants";

export function fetchTodos() {
    return axios.get(API_URL).then(response => response.data);
}

