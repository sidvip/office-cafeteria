export default class CookieHandler {
    constructor(jsonPayload) {
        this.jsonPayload = jsonPayload || {};
    }
    
    addCookies() {
        document.cookie = "";
        // document.cookie = "name=userInfo;";
        let keysArr = Object.keys(this.jsonPayload);
        if (keysArr.length > 0) {
            keysArr.forEach(key => {
                document.cookie = key + "=" + this.jsonPayload[key] + ";";
            });
        }
    }

    getObjectFromCookies() {
        let cookieObject = {};
        if (document.cookie.length > 0) {
            let featureArray = document.cookie.split(";");
            featureArray.forEach(feature => {
                cookieObject[feature.split("=")[0].trim()] = feature.split("=")[1];
            });
        }
        return cookieObject;
    }

    getValueOfSpecificCookie(key) {
        return this.getObjectFromCookies()[key];
    }
}