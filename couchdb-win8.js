(function (globals) {

    var

    // required, please include port if not 80
    c_url,
    // optional
    c_username,
    c_password,


    get = function (url, params, success, error) {
        var queryStr = "";
        if (params !== null) {
            queryStr = "?"
            Object.keys(params).forEach(function (key, i) {
                if (i !== 0) { queryStr = queryStr + "&"; }
                queryStr = queryStr + key + "=" + encodeURIComponent(params[key]);
            });
        }
        
        WinJS.xhr({ user: c_username, password: c_password, url: url + queryStr }).then(
            function (request) {
                if (typeof success === "function") {
                    success(JSON.parse(request.responseText));
                }
            },
            function (request) {
                if (typeof error === "function") {
                    error(JSON.parse(request.responseText));
                }
            }
        );
    },

    post = function (url, dataHash, success, error) {
        var dataStr = "";
        Object.keys(dataHash).forEach(function (key, i) {
            if (i !== 0) { dataStr = dataStr + "&"; }
            dataStr = dataStr + key + "=" + encodeURIComponent(dataHash[key]);
        });

        WinJS.xhr({
            type: "post", user: accountSid, password: authKey, url: url,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            data: dataStr
        }).then(
            function (request) {
                if (typeof success === "function") {
                    success(JSON.parse(request.responseText));
                }
            },
            function (request) {
                if (typeof success === "function") {
                    error(JSON.parse(request.responseText));
                }
            }
        );
    },

    couch = globals.couch = {};

    /* These are the wrappers for the Twilio REST API */

    couch.setup = function (url, options) {
        c_url = url;
        if (options) {
            c_username = options.username;
            c_password = options.password;
        }
    };

    couch.database = function (name) {
        if (!(this instanceof couch.database)) {
            return new couch.database(name);
        }       
        this.name = name;
    };

    couch.database.prototype.get = function (doc, success, error) {
        get(c_url + '/' + this.name + '/' + doc, {}, success, error);
    };

    //couch.getSmsMessages = function (to, date, success, error) {
    //    get(apiRoot + "/Accounts/" + accountSid + "/SMS/Messages.json", { To: to, DateSent: date }, success, error);
    //};

}(window));

