const SaveSession = (key, value) => {
    sessionStorage.setItem(key, value);
}
const getSession = (key) => {
    return sessionStorage.getItem(key);
}
const deleteSession = (key) => {
    sessionStorage.removeItem(key);
}

const saveAuthSession = (data) => {
    SaveSession("token", data.token)
}
const deleteAuthSession = () => {
    deleteSession("token");
    deleteSession("roles");
}
export {SaveSession, getSession, deleteSession, deleteAuthSession, saveAuthSession}