(function (globals) {

    var

    // required, please include port if not 80
    couch_url,
    // optional
    couch_username,
    couch_password,


    get = function (url, params, success, error) {
        var queryStr = "";
        if (params !== null) {
            queryStr = "?"
            Object.keys(params).forEach(function (key, i) {
                if (i !== 0) { queryStr = queryStr + "&"; }
                queryStr = queryStr + key + "=" + encodeURIComponent(params[key]);
            });
        }
        
        WinJS.xhr({ url: url + queryStr }).then(
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

    save = function (method, url, doc, success, error) {
        var dataStr = JSON.stringify(doc);
        WinJS.xhr({
            type: method, url: url,
            headers: { "Content-type": "application/json" },
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

    post = function (url, doc, success, error) {
        _save('post', url, doc, success, error);
    },

    put = function (url, doc, success, error) {
        _save('put', url, doc, success, error);
    },

    couch = globals.couch = {};

    /* These are the wrappers for the Twilio REST API */

    couch.setup = function (url, options) {
        couch_url = url;
        if (options) {
            couch_username = options.username;
            couch_password = options.password;
        }
    };

    couch.database = function (name) {
        if (!(this instanceof couch.database)) {
            return new couch.database(name);
        }       
        this.name = name;
    };

    couch.database.prototype.get = function (id, success, error) {
        get(couch_url + '/' + this.name + '/' + id, {}, success, error);
    };

    couch.database.prototype.view = function (view, success, error) {
        get(couch_url + '/' + this.name + '/' + view, {}, success, error);
    };

    couch.database.prototype.save = function (doc, success, error) {
        post(couch_url + '/' + this.name, doc, success, error);
    };


}(window));
