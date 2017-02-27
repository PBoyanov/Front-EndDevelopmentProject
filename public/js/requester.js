/* globals $*/

let requester = (() => {
    function get(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                success(response) {
                    resolve(response);
                }
            });
        });
        return promise;
    }
    function putJSON(url, body, headers = {}) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(response) {
                    reject(response);
                }
            });
        });
        return promise;
    }
    function postJSON(url, body, headers = {}) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(response) {
                    reject(response);
                }
            });
        });
        return promise;
    }
    function getJSON(url, headers = {}) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                headers,
                method: "GET",
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(response) {
                    reject(response);
                }
            });
        });
        return promise;
    }

    return {
        get,
        putJSON,
        postJSON,
        getJSON
    };
})();

export { requester };