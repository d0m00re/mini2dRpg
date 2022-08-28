const imgUrlToHTMLImageElement = (url : string) => {
    let floor2 = new Image();
    floor2.src = url;
    return floor2;
}

export default imgUrlToHTMLImageElement;