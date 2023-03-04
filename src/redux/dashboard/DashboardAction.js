import { updateBarLoading } from '../Actions';
import axios from "axios";

export const getGoogleFitData = (body, action) => {
    return (dispatch) => {
        const authCode = localStorage.getItem('authCode');
        axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", body, {
            headers: {
                "Authorization": `Bearer ${authCode}`,
            }
        })
        .then((response) => {
            dispatch(get_google_fit_data(response.data.bucket, action))
            dispatch(updateBarLoading(false));
        }, 
        (error) => {
            dispatch(updateBarLoading(false));
            console.log("ERROR: ", error);
        });
    }
}

const get_google_fit_data = (data, action) => {
    return {
        type: action,
        payload: data
    }
} 