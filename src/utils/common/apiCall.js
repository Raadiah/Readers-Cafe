const apiCall = async (url)=>{
    const dataJson = await fetch(url);
    const dataObj = await dataJson.json();

    return dataObj;
}

export default apiCall