export const getToken = () => {
    return localStorage.getItem('accessToken')
}
export const setToken = (jwtToken) => {
    localStorage.setItem('accessToken', jwtToken)
}

export const removeToken = () => {
    localStorage.removeItem('accessToken')
}