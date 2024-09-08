import { createSlice } from "@reduxjs/toolkit";
import { INFO_USER } from "../../validate/const";
import { tokenUtils } from "../../utils/token";



const initialState = {
    info_user: tokenUtils.getInfoLocal('user_info') || {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            console.log("action.payload", action.payload);
            const { type, value } = action.payload;
            if (typeof type !== "string") {
                console.log("123 dress");
            } else {
                state.info_user[type] = value;
            }
        },
        resetUser: (state) => {
            Object.assign(state.info_user, INFO_USER);
        },
        setUser: (state, action) => {
            state.info_user = action.payload
        },
        deleteUser: (state) => {
            state.info_user = {}
        }

    }
});

export const { updateUser, resetUser, setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
