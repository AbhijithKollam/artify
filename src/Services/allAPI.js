import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

// 1.Register user
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${BASE_URL}/user/register`, user, "")
}

// Login User
export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")
}

// Add art
export const addArtAPI = async (reqBody, reqHeader) => {
    return await commonAPI("post", `${BASE_URL}/art/add`, reqBody, reqHeader)
}

// get home arts
export const homeArtAPI = async () => {
    return await commonAPI("GET", `${BASE_URL}/art/home-art`, "", "")
}

// get all arts
export const allArtAPI = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/art/all-art`, "", reqHeader)
}

export const userArtAPI = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/art/user-art`, "", reqHeader)
}

export const addArtWishlistAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/art/add-wishlist`, user, "")
}

export const editUserArtApi = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/art/edit/${id}`, reqBody, reqHeader)
}

export const deleteArtApi = async (id,reqHeader) => {
    return await commonAPI('DELETE', `${BASE_URL}/art/remove/${id}`, {} , reqHeader)
}

export const addProfileApi = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${BASE_URL}/profile/add`, reqBody, reqHeader)
}

export const getProfileApi = async (reqHeader) => {
    return await commonAPI("get", `${BASE_URL}/profile/get`, "", reqHeader)
}

export const editProfileApi = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/profile/edit/${id}`, reqBody, reqHeader)
}

export const addArtCartAPI = async (reqBody,reqHeader) => {
    return await commonAPI("post", `${BASE_URL}/art/cart`, reqBody, reqHeader)
}
// get carts
export const getCartAPI = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/get-cart`, "", reqHeader)
}

// delete carts
export const deleteCartApi = async (id,reqHeader) => {
    return await commonAPI('DELETE', `${BASE_URL}/cart/remove/${id}`, {} , reqHeader)
}

//get profile
export const getProfileAPI = async (artistName,reqHeader) => {
    return await commonAPI("get", `${BASE_URL}/get-profile/${artistName}`, "", reqHeader)
}

// delete after carts
export const deleteAfterCartApi = async (reqHeader) => {
    return await commonAPI('DELETE', `${BASE_URL}/cart/deleteAfter`, {} , reqHeader)
}