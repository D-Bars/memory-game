export const getDataByKey = (key: string) =>{
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}