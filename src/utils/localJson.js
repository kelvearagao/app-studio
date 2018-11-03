

export const getPageJson = (pageName) => {
    return JSON.parse(localStorage.getItem(pageName));
}


export const getElFromPage = (pageName, elName) => {
    const page = getPageJson(pageName);
    
    return page[elName];
}