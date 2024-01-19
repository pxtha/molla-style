export const getToken = () => {
    return localStorage.getItem('token')
}
export const setToken = (jwtToken) => {
    localStorage.setItem('token', jwtToken)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}