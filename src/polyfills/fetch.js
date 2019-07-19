(function (self) {

    var support = {
        searchParams: "URLSearchParams" in self,
        iterable: "Symbol" in self && "iterator" in Symbol,
        blob: "FileReader" in self && "Blob" in self && (function () {
            try {
                new Blob();
                return true;
            } catch (e) {
                return false;
            }
        })(),
        formData: "FormData" in self,
        arrayBuffer: "ArrayBuffer" in self
    };

    if (support.arrayBuffer) {
        var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
        ];

        var isDataView = function (obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        };

        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
    }

    function normalizeName(name) {
        if (typeof name !== "string") {
            name = String(name);
        }
        if (/[^a-z0-9\-#$%&"*+.\^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
        }
        return name.toLowerCase();
    }

    function normalizeValue(value) {
        if (typeof value !== "string") {
            value = String(value);
        }
        return value;
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
        var iterator = {
            next: function () {
                var value = items.shift();
                return {done: value === undefined, value: value};
            }
        };

        if (support.iterable) {
            iterator[Symbol.iterator] = function () {
                return iterator;
            };
        }

        return iterator;
    }

    function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
                this.append(name, value);
            }, this);
        } else if (Array.isArray(headers)) {
            headers.forEach(function (header) {
                this.append(header[0], header[1]);
            }, this);
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name]);
            }, this);
        }
    }

    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + "," + value : value;
    };

    Headers.prototype["delete"] = function (name) {
        delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
    };

    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
            }
        }
    };

    Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push(name);
        });
        return iteratorFor(items);
    };

    Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) {
            items.push(value);
        });
        return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push([name, value]);
        });
        return iteratorFor(items);
    };

    function parseHeaders(rawHeaders) {
        var headers = new Headers();
        // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
        // https://tools.ietf.org/html/rfc7230#section-3.2
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
        preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
                var value = parts.join(":").trim();
                headers.append(key, value);
            }
        });
        return headers;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

    function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method;
    }

    function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (input instanceof Request) {
            if (input.bodyUsed) {
                throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
                this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
            }
        } else {
            this.url = String(input);
        }

        this.credentials = options.credentials || this.credentials || "omit";
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
        }

        this._bodyInit = body;
        if (!body) {
            this._bodyText = "";
        } else if (typeof body === "string") {
            this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = body.buffer;
            // IE 10-11 can"t handle a DataView body.
            this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = body;
        } else {
            throw new Error("unsupported BodyInit type");
        }

        if (!this.headers.get("content-type")) {
            if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
            } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            }
        }
    }

    Request.prototype.clone = function () {
        return new Request(this, {body: this._bodyInit});
    };

    self.___headers = Headers;
    self.___request = Request;

    self.___fetch = function (request, init) {
        return new ___await(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var responseTypeAware = "responseType" in xhr;
            var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
            var iOS = parseFloat(
                ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
                    .replace('undefined', '3_2').replace('_', '.').replace('_', '')
            ) || false;
            var xhrFalure = function () {
                var error = new Error((
                    "XMLHttpRequest failed\nmethod: " +
                    request.method +
                    "\nURL: " +
                    request.url +
                    "\nstatus " +
                    xhr.status +
                    ": " +
                    (xhr.statusText || "unknown")
                ));
                if (xhr.responseType) {
                    error.resonse = xhr.response;
                }
                reject(error);
            };
            // xhr.timeout =

            xhr.onload = function () {
                // var options = {
                //   status: xhr.status,
                //   statusText: xhr.statusText,
                //   headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                // };
                // options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                if (xhr.status > 399) xhrFalure();
                else {
                    if (!responseTypeAware || isIE11 || (iOS && iOS < 8)) resolve(JSON.parse(xhr.responseText));
                    else resolve(xhr.response);
                }
            };

            xhr.onabort = function () {/*Swallow the error*/};
            xhr.onerror = xhrFalure;
            xhr.ontimeout = xhrFalure;

            xhr.open(request.method, request.url, true);

            if (request.credentials === "include") {
                xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
                xhr.withCredentials = false;
            }

            // if ("responseType" in xhr && support.blob) {
            //   xhr.responseType = "blob";
            // }
            if (responseTypeAware) {
                xhr.responseType = "json";
            }

            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value);
            });
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
        });
    };
})(window);
