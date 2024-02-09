function GetPid() {
    const urlParams = new URL(window.location.href).searchParams;
    let pageId = urlParams.get('pid');
    if (pageId === null) pageId = '1';

    return pageId;
}

export default GetPid;