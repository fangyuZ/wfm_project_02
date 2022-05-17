var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_worker_threads, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_worker_threads = require("worker_threads");
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error3 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error3);
        throw error3;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    const error_ = error3 instanceof FetchBaseError ? error3 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error3) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error3.message}`, "system", error3));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error3) => {
      response.body.destroy(error3);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error3 = new Error("Premature close");
            error3.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error3);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), reject) : (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error3 = new Error("Premature close");
        error3.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error3);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http = __toESM(require("http"), 1);
    import_node_https = __toESM(require("https"), 1);
    import_node_zlib = __toESM(require("zlib"), 1);
    import_node_stream = __toESM(require("stream"), 1);
    import_node_util = require("util");
    import_node_url = require("url");
    import_net = require("net");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry5 = this._queue.shift();
              this._queueTotalSize -= entry5.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry5.buffer, entry5.byteOffset, entry5.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error3) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error3);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error3) {
          stream._inFlightWriteRequest._reject(error3);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error3);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error3) {
          stream._inFlightCloseRequest._reject(error3);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error3);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error3);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error3) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error3);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error3);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error3) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error3);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error3);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error3) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error3);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error3) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error3);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error3 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error3);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error3);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error3);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error3) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error3));
              } else {
                finalize(isError, error3);
              }
            }
            function finalize(isError, error3) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error3);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable3 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable3, "readable", "ReadableWritablePair");
          assertReadableStream(readable3, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable: readable3, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error3 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error3);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable3 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable3._state === "errored") {
              throw readable3._storedError;
            }
            ReadableStreamDefaultControllerClose(readable3._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable3._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error3) {
          process2.emitWarning = emitWarning;
          throw error3;
        }
      } catch (error3) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error3) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error3 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error3;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error3 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error3, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error3;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error3 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error3, "code", { value: "ERR_INVALID_CHAR" });
        throw error3;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-97f4c8ab.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, cancelable, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css7) => css7.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${style_object[key2]};`).join(" ");
}
var current_component, boolean_attributes, invalid_attribute_name_character, escaped, missing_component, on_destroy;
var init_index_97f4c8ab = __esm({
  ".svelte-kit/output/server/chunks/index-97f4c8ab.js"() {
    Promise.resolve();
    boolean_attributes = /* @__PURE__ */ new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/variables-b1eade11.js
var variables;
var init_variables_b1eade11 = __esm({
  ".svelte-kit/output/server/chunks/variables-b1eade11.js"() {
    variables = {
      camundaOauthAddress: "https://login.cloud.camunda.io/oauth/token",
      camundaAddress: "http://localhost:8080/engine-rest",
      camundaClientId: "Git71_szXlGFQOPJRgu7IwTZw8vD-uUo",
      camundaClientSecret: "Ywd~zhJxsnJewUrmqGowXbPbqDAjfSlnMXaaa6tBBuJxE5HiC6PxCLReoBmaEpGd"
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/@sindresorhus/is/dist/index.js
var require_dist = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/@sindresorhus/is/dist/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var { toString } = Object.prototype;
    var isOfType = (type) => (value) => typeof value === type;
    var getObjectType = (value) => {
      const objectName = toString.call(value).slice(8, -1);
      if (objectName) {
        return objectName;
      }
      return void 0;
    };
    var isObjectOfType = (type) => (value) => getObjectType(value) === type;
    function is(value) {
      switch (value) {
        case null:
          return "null";
        case true:
        case false:
          return "boolean";
        default:
      }
      switch (typeof value) {
        case "undefined":
          return "undefined";
        case "string":
          return "string";
        case "number":
          return "number";
        case "bigint":
          return "bigint";
        case "symbol":
          return "symbol";
        default:
      }
      if (is.function_(value)) {
        return "Function";
      }
      if (is.observable(value)) {
        return "Observable";
      }
      if (is.array(value)) {
        return "Array";
      }
      if (is.buffer(value)) {
        return "Buffer";
      }
      const tagType = getObjectType(value);
      if (tagType) {
        return tagType;
      }
      if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError("Please don't use object wrappers for primitive types");
      }
      return "Object";
    }
    is.undefined = isOfType("undefined");
    is.string = isOfType("string");
    var isNumberType = isOfType("number");
    is.number = (value) => isNumberType(value) && !is.nan(value);
    is.bigint = isOfType("bigint");
    is.function_ = isOfType("function");
    is.null_ = (value) => value === null;
    is.class_ = (value) => is.function_(value) && value.toString().startsWith("class ");
    is.boolean = (value) => value === true || value === false;
    is.symbol = isOfType("symbol");
    is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
    is.array = Array.isArray;
    is.buffer = (value) => {
      var _a4, _b, _c, _d2;
      return (_d2 = (_c = (_b = (_a4 = value) === null || _a4 === void 0 ? void 0 : _a4.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d2 !== void 0 ? _d2 : false;
    };
    is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
    is.object = (value) => !is.null_(value) && (typeof value === "object" || is.function_(value));
    is.iterable = (value) => {
      var _a4;
      return is.function_((_a4 = value) === null || _a4 === void 0 ? void 0 : _a4[Symbol.iterator]);
    };
    is.asyncIterable = (value) => {
      var _a4;
      return is.function_((_a4 = value) === null || _a4 === void 0 ? void 0 : _a4[Symbol.asyncIterator]);
    };
    is.generator = (value) => is.iterable(value) && is.function_(value.next) && is.function_(value.throw);
    is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
    is.nativePromise = (value) => isObjectOfType("Promise")(value);
    var hasPromiseAPI = (value) => {
      var _a4, _b;
      return is.function_((_a4 = value) === null || _a4 === void 0 ? void 0 : _a4.then) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
    };
    is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
    is.generatorFunction = isObjectOfType("GeneratorFunction");
    is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction";
    is.asyncFunction = (value) => getObjectType(value) === "AsyncFunction";
    is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty("prototype");
    is.regExp = isObjectOfType("RegExp");
    is.date = isObjectOfType("Date");
    is.error = isObjectOfType("Error");
    is.map = (value) => isObjectOfType("Map")(value);
    is.set = (value) => isObjectOfType("Set")(value);
    is.weakMap = (value) => isObjectOfType("WeakMap")(value);
    is.weakSet = (value) => isObjectOfType("WeakSet")(value);
    is.int8Array = isObjectOfType("Int8Array");
    is.uint8Array = isObjectOfType("Uint8Array");
    is.uint8ClampedArray = isObjectOfType("Uint8ClampedArray");
    is.int16Array = isObjectOfType("Int16Array");
    is.uint16Array = isObjectOfType("Uint16Array");
    is.int32Array = isObjectOfType("Int32Array");
    is.uint32Array = isObjectOfType("Uint32Array");
    is.float32Array = isObjectOfType("Float32Array");
    is.float64Array = isObjectOfType("Float64Array");
    is.bigInt64Array = isObjectOfType("BigInt64Array");
    is.bigUint64Array = isObjectOfType("BigUint64Array");
    is.arrayBuffer = isObjectOfType("ArrayBuffer");
    is.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer");
    is.dataView = isObjectOfType("DataView");
    is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
    is.urlInstance = (value) => isObjectOfType("URL")(value);
    is.urlString = (value) => {
      if (!is.string(value)) {
        return false;
      }
      try {
        new URL(value);
        return true;
      } catch (_a4) {
        return false;
      }
    };
    is.truthy = (value) => Boolean(value);
    is.falsy = (value) => !value;
    is.nan = (value) => Number.isNaN(value);
    var primitiveTypeOfTypes = /* @__PURE__ */ new Set([
      "undefined",
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol"
    ]);
    is.primitive = (value) => is.null_(value) || primitiveTypeOfTypes.has(typeof value);
    is.integer = (value) => Number.isInteger(value);
    is.safeInteger = (value) => Number.isSafeInteger(value);
    is.plainObject = (value) => {
      if (getObjectType(value) !== "Object") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.getPrototypeOf({});
    };
    var typedArrayTypes = /* @__PURE__ */ new Set([
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array"
    ]);
    is.typedArray = (value) => {
      const objectType = getObjectType(value);
      if (objectType === void 0) {
        return false;
      }
      return typedArrayTypes.has(objectType);
    };
    var isValidLength = (value) => is.safeInteger(value) && value >= 0;
    is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
    is.inRange = (value, range) => {
      if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
      }
      if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
      }
      throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
    };
    var NODE_TYPE_ELEMENT = 1;
    var DOM_PROPERTIES_TO_CHECK = [
      "innerHTML",
      "ownerDocument",
      "style",
      "attributes",
      "nodeValue"
    ];
    is.domElement = (value) => is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) && !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
    is.observable = (value) => {
      var _a4, _b, _c, _d2;
      if (!value) {
        return false;
      }
      if (value === ((_b = (_a4 = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a4))) {
        return true;
      }
      if (value === ((_d2 = (_c = value)["@@observable"]) === null || _d2 === void 0 ? void 0 : _d2.call(_c))) {
        return true;
      }
      return false;
    };
    is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
    is.infinite = (value) => value === Infinity || value === -Infinity;
    var isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
    is.evenInteger = isAbsoluteMod2(0);
    is.oddInteger = isAbsoluteMod2(1);
    is.emptyArray = (value) => is.array(value) && value.length === 0;
    is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
    is.emptyString = (value) => is.string(value) && value.length === 0;
    is.nonEmptyString = (value) => is.string(value) && value.length > 0;
    var isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
    is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
    is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
    is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
    is.emptySet = (value) => is.set(value) && value.size === 0;
    is.nonEmptySet = (value) => is.set(value) && value.size > 0;
    is.emptyMap = (value) => is.map(value) && value.size === 0;
    is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
    var predicateOnArray = (method, predicate, values) => {
      if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
      }
      if (values.length === 0) {
        throw new TypeError("Invalid number of values");
      }
      return method.call(values, predicate);
    };
    is.any = (predicate, ...values) => {
      const predicates = is.array(predicate) ? predicate : [predicate];
      return predicates.some((singlePredicate) => predicateOnArray(Array.prototype.some, singlePredicate, values));
    };
    is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
    var assertType = (condition, description, value) => {
      if (!condition) {
        throw new TypeError(`Expected value which is \`${description}\`, received value of type \`${is(value)}\`.`);
      }
    };
    exports.assert = {
      undefined: (value) => assertType(is.undefined(value), "undefined", value),
      string: (value) => assertType(is.string(value), "string", value),
      number: (value) => assertType(is.number(value), "number", value),
      bigint: (value) => assertType(is.bigint(value), "bigint", value),
      function_: (value) => assertType(is.function_(value), "Function", value),
      null_: (value) => assertType(is.null_(value), "null", value),
      class_: (value) => assertType(is.class_(value), "Class", value),
      boolean: (value) => assertType(is.boolean(value), "boolean", value),
      symbol: (value) => assertType(is.symbol(value), "symbol", value),
      numericString: (value) => assertType(is.numericString(value), "string with a number", value),
      array: (value) => assertType(is.array(value), "Array", value),
      buffer: (value) => assertType(is.buffer(value), "Buffer", value),
      nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined", value),
      object: (value) => assertType(is.object(value), "Object", value),
      iterable: (value) => assertType(is.iterable(value), "Iterable", value),
      asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable", value),
      generator: (value) => assertType(is.generator(value), "Generator", value),
      asyncGenerator: (value) => assertType(is.asyncGenerator(value), "AsyncGenerator", value),
      nativePromise: (value) => assertType(is.nativePromise(value), "native Promise", value),
      promise: (value) => assertType(is.promise(value), "Promise", value),
      generatorFunction: (value) => assertType(is.generatorFunction(value), "GeneratorFunction", value),
      asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), "AsyncGeneratorFunction", value),
      asyncFunction: (value) => assertType(is.asyncFunction(value), "AsyncFunction", value),
      boundFunction: (value) => assertType(is.boundFunction(value), "Function", value),
      regExp: (value) => assertType(is.regExp(value), "RegExp", value),
      date: (value) => assertType(is.date(value), "Date", value),
      error: (value) => assertType(is.error(value), "Error", value),
      map: (value) => assertType(is.map(value), "Map", value),
      set: (value) => assertType(is.set(value), "Set", value),
      weakMap: (value) => assertType(is.weakMap(value), "WeakMap", value),
      weakSet: (value) => assertType(is.weakSet(value), "WeakSet", value),
      int8Array: (value) => assertType(is.int8Array(value), "Int8Array", value),
      uint8Array: (value) => assertType(is.uint8Array(value), "Uint8Array", value),
      uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), "Uint8ClampedArray", value),
      int16Array: (value) => assertType(is.int16Array(value), "Int16Array", value),
      uint16Array: (value) => assertType(is.uint16Array(value), "Uint16Array", value),
      int32Array: (value) => assertType(is.int32Array(value), "Int32Array", value),
      uint32Array: (value) => assertType(is.uint32Array(value), "Uint32Array", value),
      float32Array: (value) => assertType(is.float32Array(value), "Float32Array", value),
      float64Array: (value) => assertType(is.float64Array(value), "Float64Array", value),
      bigInt64Array: (value) => assertType(is.bigInt64Array(value), "BigInt64Array", value),
      bigUint64Array: (value) => assertType(is.bigUint64Array(value), "BigUint64Array", value),
      arrayBuffer: (value) => assertType(is.arrayBuffer(value), "ArrayBuffer", value),
      sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), "SharedArrayBuffer", value),
      dataView: (value) => assertType(is.dataView(value), "DataView", value),
      urlInstance: (value) => assertType(is.urlInstance(value), "URL", value),
      urlString: (value) => assertType(is.urlString(value), "string with a URL", value),
      truthy: (value) => assertType(is.truthy(value), "truthy", value),
      falsy: (value) => assertType(is.falsy(value), "falsy", value),
      nan: (value) => assertType(is.nan(value), "NaN", value),
      primitive: (value) => assertType(is.primitive(value), "primitive", value),
      integer: (value) => assertType(is.integer(value), "integer", value),
      safeInteger: (value) => assertType(is.safeInteger(value), "integer", value),
      plainObject: (value) => assertType(is.plainObject(value), "plain object", value),
      typedArray: (value) => assertType(is.typedArray(value), "TypedArray", value),
      arrayLike: (value) => assertType(is.arrayLike(value), "array-like", value),
      domElement: (value) => assertType(is.domElement(value), "Element", value),
      observable: (value) => assertType(is.observable(value), "Observable", value),
      nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream", value),
      infinite: (value) => assertType(is.infinite(value), "infinite number", value),
      emptyArray: (value) => assertType(is.emptyArray(value), "empty array", value),
      nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array", value),
      emptyString: (value) => assertType(is.emptyString(value), "empty string", value),
      nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string", value),
      emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace", value),
      emptyObject: (value) => assertType(is.emptyObject(value), "empty object", value),
      nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object", value),
      emptySet: (value) => assertType(is.emptySet(value), "empty set", value),
      nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set", value),
      emptyMap: (value) => assertType(is.emptyMap(value), "empty map", value),
      nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map", value),
      evenInteger: (value) => assertType(is.evenInteger(value), "even integer", value),
      oddInteger: (value) => assertType(is.oddInteger(value), "odd integer", value),
      directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T", instance),
      inRange: (value, range) => assertType(is.inRange(value, range), "in range", value),
      any: (predicate, ...values) => assertType(is.any(predicate, ...values), "predicate returns truthy for any value", values),
      all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values", values)
    };
    Object.defineProperties(is, {
      class: {
        value: is.class_
      },
      function: {
        value: is.function_
      },
      null: {
        value: is.null_
      }
    });
    Object.defineProperties(exports.assert, {
      class: {
        value: exports.assert.class_
      },
      function: {
        value: exports.assert.function_
      },
      null: {
        value: exports.assert.null_
      }
    });
    exports.default = is;
    module2.exports = is;
    module2.exports.default = is;
    module2.exports.assert = exports.assert;
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f3 = function() {
        if (f3.called)
          return f3.value;
        f3.called = true;
        return f3.value = fn.apply(this, arguments);
      };
      f3.called = false;
      return f3;
    }
    function onceStrict(fn) {
      var f3 = function() {
        if (f3.called)
          throw new Error(f3.onceError);
        f3.called = true;
        return f3.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f3.onceError = name + " shouldn't be called more than once";
      f3.called = false;
      return f3;
    }
  }
});

// node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "node_modules/end-of-stream/index.js"(exports, module2) {
    var once = require_once();
    var noop4 = function() {
    };
    var isRequest2 = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop4);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable3 = opts.readable || opts.readable !== false && stream.readable;
      var writable3 = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable)
          onfinish();
      };
      var onfinish = function() {
        writable3 = false;
        if (!readable3)
          callback.call(stream);
      };
      var onend = function() {
        readable3 = false;
        if (!writable3)
          callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        process.nextTick(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled)
          return;
        if (readable3 && !(rs && (rs.ended && !rs.destroyed)))
          return callback.call(stream, new Error("premature close"));
        if (writable3 && !(ws && (ws.ended && !ws.destroyed)))
          return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest2(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable3 && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream))
        stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module2.exports = eos;
  }
});

// node_modules/pump/index.js
var require_pump = __commonJS({
  "node_modules/pump/index.js"(exports, module2) {
    var once = require_once();
    var eos = require_end_of_stream();
    var fs = require("fs");
    var noop4 = function() {
    };
    var ancient = /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient)
        return false;
      if (!fs)
        return false;
      return (stream instanceof (fs.ReadStream || noop4) || stream instanceof (fs.WriteStream || noop4)) && isFn(stream.close);
    };
    var isRequest2 = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isFS(stream))
          return stream.close(noop4);
        if (isRequest2(stream))
          return stream.abort();
        if (isFn(stream.destroy))
          return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop4) && streams.pop() || noop4;
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2)
        throw new Error("pump requires two streams per minimum");
      var error3;
      var destroys = streams.map(function(stream, i2) {
        var reading = i2 < streams.length - 1;
        var writing = i2 > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error3)
            error3 = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error3);
        });
      });
      return streams.reduce(pipe);
    };
    module2.exports = pump;
  }
});

// node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "node_modules/get-stream/buffer-stream.js"(exports, module2) {
    "use strict";
    var { PassThrough: PassThroughStream } = require("stream");
    module2.exports = (options) => {
      options = __spreadValues({}, options);
      const { array } = options;
      let { encoding } = options;
      const isBuffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || isBuffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (isBuffer) {
        encoding = null;
      }
      const stream = new PassThroughStream({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      let length = 0;
      const chunks = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk);
        if (objectMode) {
          length = chunks.length;
        } else {
          length += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
      };
      stream.getBufferedLength = () => length;
      return stream;
    };
  }
});

// node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "node_modules/get-stream/index.js"(exports, module2) {
    "use strict";
    var { constants: BufferConstants } = require("buffer");
    var pump = require_pump();
    var bufferStream = require_buffer_stream();
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    async function getStream(inputStream, options) {
      if (!inputStream) {
        return Promise.reject(new Error("Expected a stream"));
      }
      options = __spreadValues({
        maxBuffer: Infinity
      }, options);
      const { maxBuffer } = options;
      let stream;
      await new Promise((resolve2, reject) => {
        const rejectPromise = (error3) => {
          if (error3 && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
            error3.bufferedData = stream.getBufferedValue();
          }
          reject(error3);
        };
        stream = pump(inputStream, bufferStream(options), (error3) => {
          if (error3) {
            rejectPromise(error3);
            return;
          }
          resolve2();
        });
        stream.on("data", () => {
          if (stream.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      });
      return stream.getBufferedValue();
    }
    module2.exports = getStream;
    module2.exports.default = getStream;
    module2.exports.buffer = (stream, options) => getStream(stream, __spreadProps(__spreadValues({}, options), { encoding: "buffer" }));
    module2.exports.array = (stream, options) => getStream(stream, __spreadProps(__spreadValues({}, options), { array: true }));
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/p-cancelable/index.js
var require_p_cancelable = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/p-cancelable/index.js"(exports, module2) {
    "use strict";
    var CancelError = class extends Error {
      constructor(reason) {
        super(reason || "Promise was canceled");
        this.name = "CancelError";
      }
      get isCanceled() {
        return true;
      }
    };
    var PCancelable = class {
      static fn(userFn) {
        return (...arguments_) => {
          return new PCancelable((resolve2, reject, onCancel) => {
            arguments_.push(onCancel);
            userFn(...arguments_).then(resolve2, reject);
          });
        };
      }
      constructor(executor) {
        this._cancelHandlers = [];
        this._isPending = true;
        this._isCanceled = false;
        this._rejectOnCancel = true;
        this._promise = new Promise((resolve2, reject) => {
          this._reject = reject;
          const onResolve = (value) => {
            if (!this._isCanceled || !onCancel.shouldReject) {
              this._isPending = false;
              resolve2(value);
            }
          };
          const onReject = (error3) => {
            this._isPending = false;
            reject(error3);
          };
          const onCancel = (handler2) => {
            if (!this._isPending) {
              throw new Error("The `onCancel` handler was attached after the promise settled.");
            }
            this._cancelHandlers.push(handler2);
          };
          Object.defineProperties(onCancel, {
            shouldReject: {
              get: () => this._rejectOnCancel,
              set: (boolean) => {
                this._rejectOnCancel = boolean;
              }
            }
          });
          return executor(onResolve, onReject, onCancel);
        });
      }
      then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this._promise.catch(onRejected);
      }
      finally(onFinally) {
        return this._promise.finally(onFinally);
      }
      cancel(reason) {
        if (!this._isPending || this._isCanceled) {
          return;
        }
        this._isCanceled = true;
        if (this._cancelHandlers.length > 0) {
          try {
            for (const handler2 of this._cancelHandlers) {
              handler2();
            }
          } catch (error3) {
            this._reject(error3);
            return;
          }
        }
        if (this._rejectOnCancel) {
          this._reject(new CancelError(reason));
        }
      }
      get isCanceled() {
        return this._isCanceled;
      }
    };
    Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);
    module2.exports = PCancelable;
    module2.exports.CancelError = CancelError;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/errors.js
var require_errors = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_1 = require_dist();
    var GotError = class extends Error {
      constructor(message, error3, options) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = "GotError";
        if (!is_1.default.undefined(error3.code)) {
          this.code = error3.code;
        }
        Object.defineProperty(this, "options", {
          enumerable: false,
          value: options
        });
        if (!is_1.default.undefined(error3.stack)) {
          const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
          const thisStackTrace = this.stack.slice(indexOfMessage).split("\n").reverse();
          const errorStackTrace = error3.stack.slice(error3.stack.indexOf(error3.message) + error3.message.length).split("\n").reverse();
          while (errorStackTrace.length !== 0 && errorStackTrace[0] === thisStackTrace[0]) {
            thisStackTrace.shift();
          }
          this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join("\n")}${errorStackTrace.reverse().join("\n")}`;
        }
      }
    };
    exports.GotError = GotError;
    var CacheError = class extends GotError {
      constructor(error3, options) {
        super(error3.message, error3, options);
        this.name = "CacheError";
      }
    };
    exports.CacheError = CacheError;
    var RequestError = class extends GotError {
      constructor(error3, options) {
        super(error3.message, error3, options);
        this.name = "RequestError";
      }
    };
    exports.RequestError = RequestError;
    var ReadError = class extends GotError {
      constructor(error3, options) {
        super(error3.message, error3, options);
        this.name = "ReadError";
      }
    };
    exports.ReadError = ReadError;
    var ParseError = class extends GotError {
      constructor(error3, response, options) {
        super(`${error3.message} in "${options.url.toString()}"`, error3, options);
        this.name = "ParseError";
        Object.defineProperty(this, "response", {
          enumerable: false,
          value: response
        });
      }
    };
    exports.ParseError = ParseError;
    var HTTPError = class extends GotError {
      constructor(response, options) {
        super(`Response code ${response.statusCode} (${response.statusMessage})`, {}, options);
        this.name = "HTTPError";
        Object.defineProperty(this, "response", {
          enumerable: false,
          value: response
        });
      }
    };
    exports.HTTPError = HTTPError;
    var MaxRedirectsError = class extends GotError {
      constructor(response, maxRedirects, options) {
        super(`Redirected ${maxRedirects} times. Aborting.`, {}, options);
        this.name = "MaxRedirectsError";
        Object.defineProperty(this, "response", {
          enumerable: false,
          value: response
        });
      }
    };
    exports.MaxRedirectsError = MaxRedirectsError;
    var UnsupportedProtocolError = class extends GotError {
      constructor(options) {
        super(`Unsupported protocol "${options.url.protocol}"`, {}, options);
        this.name = "UnsupportedProtocolError";
      }
    };
    exports.UnsupportedProtocolError = UnsupportedProtocolError;
    var TimeoutError = class extends GotError {
      constructor(error3, timings, options) {
        super(error3.message, error3, options);
        this.name = "TimeoutError";
        this.event = error3.event;
        this.timings = timings;
      }
    };
    exports.TimeoutError = TimeoutError;
    var p_cancelable_1 = require_p_cancelable();
    exports.CancelError = p_cancelable_1.CancelError;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/normalize-url/index.js
var require_normalize_url = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/normalize-url/index.js"(exports, module2) {
    "use strict";
    var DATA_URL_DEFAULT_MIME_TYPE = "text/plain";
    var DATA_URL_DEFAULT_CHARSET = "us-ascii";
    var testParameter = (name, filters) => {
      return filters.some((filter) => filter instanceof RegExp ? filter.test(name) : filter === name);
    };
    var normalizeDataURL = (urlString, { stripHash }) => {
      const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);
      if (!match) {
        throw new Error(`Invalid URL: ${urlString}`);
      }
      let { type, data, hash: hash2 } = match.groups;
      const mediaType = type.split(";");
      hash2 = stripHash ? "" : hash2;
      let isBase64 = false;
      if (mediaType[mediaType.length - 1] === "base64") {
        mediaType.pop();
        isBase64 = true;
      }
      const mimeType = (mediaType.shift() || "").toLowerCase();
      const attributes = mediaType.map((attribute) => {
        let [key2, value = ""] = attribute.split("=").map((string) => string.trim());
        if (key2 === "charset") {
          value = value.toLowerCase();
          if (value === DATA_URL_DEFAULT_CHARSET) {
            return "";
          }
        }
        return `${key2}${value ? `=${value}` : ""}`;
      }).filter(Boolean);
      const normalizedMediaType = [
        ...attributes
      ];
      if (isBase64) {
        normalizedMediaType.push("base64");
      }
      if (normalizedMediaType.length !== 0 || mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE) {
        normalizedMediaType.unshift(mimeType);
      }
      return `data:${normalizedMediaType.join(";")},${isBase64 ? data.trim() : data}${hash2 ? `#${hash2}` : ""}`;
    };
    var normalizeUrl = (urlString, options) => {
      options = __spreadValues({
        defaultProtocol: "http:",
        normalizeProtocol: true,
        forceHttp: false,
        forceHttps: false,
        stripAuthentication: true,
        stripHash: false,
        stripTextFragment: true,
        stripWWW: true,
        removeQueryParameters: [/^utm_\w+/i],
        removeTrailingSlash: true,
        removeSingleSlash: true,
        removeDirectoryIndex: false,
        sortQueryParameters: true
      }, options);
      urlString = urlString.trim();
      if (/^data:/i.test(urlString)) {
        return normalizeDataURL(urlString, options);
      }
      if (/^view-source:/i.test(urlString)) {
        throw new Error("`view-source:` is not supported as it is a non-standard protocol");
      }
      const hasRelativeProtocol = urlString.startsWith("//");
      const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);
      if (!isRelativeUrl) {
        urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
      }
      const urlObj = new URL(urlString);
      if (options.forceHttp && options.forceHttps) {
        throw new Error("The `forceHttp` and `forceHttps` options cannot be used together");
      }
      if (options.forceHttp && urlObj.protocol === "https:") {
        urlObj.protocol = "http:";
      }
      if (options.forceHttps && urlObj.protocol === "http:") {
        urlObj.protocol = "https:";
      }
      if (options.stripAuthentication) {
        urlObj.username = "";
        urlObj.password = "";
      }
      if (options.stripHash) {
        urlObj.hash = "";
      } else if (options.stripTextFragment) {
        urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, "");
      }
      if (urlObj.pathname) {
        urlObj.pathname = urlObj.pathname.replace(/(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g, "/");
      }
      if (urlObj.pathname) {
        try {
          urlObj.pathname = decodeURI(urlObj.pathname);
        } catch (_) {
        }
      }
      if (options.removeDirectoryIndex === true) {
        options.removeDirectoryIndex = [/^index\.[a-z]+$/];
      }
      if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
        let pathComponents = urlObj.pathname.split("/");
        const lastComponent = pathComponents[pathComponents.length - 1];
        if (testParameter(lastComponent, options.removeDirectoryIndex)) {
          pathComponents = pathComponents.slice(0, pathComponents.length - 1);
          urlObj.pathname = pathComponents.slice(1).join("/") + "/";
        }
      }
      if (urlObj.hostname) {
        urlObj.hostname = urlObj.hostname.replace(/\.$/, "");
        if (options.stripWWW && /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(urlObj.hostname)) {
          urlObj.hostname = urlObj.hostname.replace(/^www\./, "");
        }
      }
      if (Array.isArray(options.removeQueryParameters)) {
        for (const key2 of [...urlObj.searchParams.keys()]) {
          if (testParameter(key2, options.removeQueryParameters)) {
            urlObj.searchParams.delete(key2);
          }
        }
      }
      if (options.removeQueryParameters === true) {
        urlObj.search = "";
      }
      if (options.sortQueryParameters) {
        urlObj.searchParams.sort();
      }
      if (options.removeTrailingSlash) {
        urlObj.pathname = urlObj.pathname.replace(/\/$/, "");
      }
      const oldUrlString = urlString;
      urlString = urlObj.toString();
      if (!options.removeSingleSlash && urlObj.pathname === "/" && !oldUrlString.endsWith("/") && urlObj.hash === "") {
        urlString = urlString.replace(/\/$/, "");
      }
      if ((options.removeTrailingSlash || urlObj.pathname === "/") && urlObj.hash === "" && options.removeSingleSlash) {
        urlString = urlString.replace(/\/$/, "");
      }
      if (hasRelativeProtocol && !options.normalizeProtocol) {
        urlString = urlString.replace(/^http:\/\//, "//");
      }
      if (options.stripProtocol) {
        urlString = urlString.replace(/^(?:https?:)?\/\//, "");
      }
      return urlString;
    };
    module2.exports = normalizeUrl;
  }
});

// node_modules/http-cache-semantics/index.js
var require_http_cache_semantics = __commonJS({
  "node_modules/http-cache-semantics/index.js"(exports, module2) {
    "use strict";
    var statusCodeCacheableByDefault = /* @__PURE__ */ new Set([
      200,
      203,
      204,
      206,
      300,
      301,
      404,
      405,
      410,
      414,
      501
    ]);
    var understoodStatuses = /* @__PURE__ */ new Set([
      200,
      203,
      204,
      300,
      301,
      302,
      303,
      307,
      308,
      404,
      405,
      410,
      414,
      501
    ]);
    var errorStatusCodes = /* @__PURE__ */ new Set([
      500,
      502,
      503,
      504
    ]);
    var hopByHopHeaders = {
      date: true,
      connection: true,
      "keep-alive": true,
      "proxy-authenticate": true,
      "proxy-authorization": true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true
    };
    var excludedFromRevalidationUpdate = {
      "content-length": true,
      "content-encoding": true,
      "transfer-encoding": true,
      "content-range": true
    };
    function toNumberOrZero(s3) {
      const n = parseInt(s3, 10);
      return isFinite(n) ? n : 0;
    }
    function isErrorResponse(response) {
      if (!response) {
        return true;
      }
      return errorStatusCodes.has(response.status);
    }
    function parseCacheControl(header) {
      const cc = {};
      if (!header)
        return cc;
      const parts = header.trim().split(/\s*,\s*/);
      for (const part of parts) {
        const [k, v] = part.split(/\s*=\s*/, 2);
        cc[k] = v === void 0 ? true : v.replace(/^"|"$/g, "");
      }
      return cc;
    }
    function formatCacheControl(cc) {
      let parts = [];
      for (const k in cc) {
        const v = cc[k];
        parts.push(v === true ? k : k + "=" + v);
      }
      if (!parts.length) {
        return void 0;
      }
      return parts.join(", ");
    }
    module2.exports = class CachePolicy {
      constructor(req, res, {
        shared,
        cacheHeuristic,
        immutableMinTimeToLive,
        ignoreCargoCult,
        _fromObject
      } = {}) {
        if (_fromObject) {
          this._fromObject(_fromObject);
          return;
        }
        if (!res || !res.headers) {
          throw Error("Response headers missing");
        }
        this._assertRequestHasHeaders(req);
        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._cacheHeuristic = cacheHeuristic !== void 0 ? cacheHeuristic : 0.1;
        this._immutableMinTtl = immutableMinTimeToLive !== void 0 ? immutableMinTimeToLive : 24 * 3600 * 1e3;
        this._status = "status" in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers["cache-control"]);
        this._method = "method" in req ? req.method : "GET";
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null;
        this._reqcc = parseCacheControl(req.headers["cache-control"]);
        if (ignoreCargoCult && "pre-check" in this._rescc && "post-check" in this._rescc) {
          delete this._rescc["pre-check"];
          delete this._rescc["post-check"];
          delete this._rescc["no-cache"];
          delete this._rescc["no-store"];
          delete this._rescc["must-revalidate"];
          this._resHeaders = Object.assign({}, this._resHeaders, {
            "cache-control": formatCacheControl(this._rescc)
          });
          delete this._resHeaders.expires;
          delete this._resHeaders.pragma;
        }
        if (res.headers["cache-control"] == null && /no-cache/.test(res.headers.pragma)) {
          this._rescc["no-cache"] = true;
        }
      }
      now() {
        return Date.now();
      }
      storable() {
        return !!(!this._reqcc["no-store"] && (this._method === "GET" || this._method === "HEAD" || this._method === "POST" && this._hasExplicitExpiration()) && understoodStatuses.has(this._status) && !this._rescc["no-store"] && (!this._isShared || !this._rescc.private) && (!this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) && (this._resHeaders.expires || this._rescc["max-age"] || this._isShared && this._rescc["s-maxage"] || this._rescc.public || statusCodeCacheableByDefault.has(this._status)));
      }
      _hasExplicitExpiration() {
        return this._isShared && this._rescc["s-maxage"] || this._rescc["max-age"] || this._resHeaders.expires;
      }
      _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
          throw Error("Request headers missing");
        }
      }
      satisfiesWithoutRevalidation(req) {
        this._assertRequestHasHeaders(req);
        const requestCC = parseCacheControl(req.headers["cache-control"]);
        if (requestCC["no-cache"] || /no-cache/.test(req.headers.pragma)) {
          return false;
        }
        if (requestCC["max-age"] && this.age() > requestCC["max-age"]) {
          return false;
        }
        if (requestCC["min-fresh"] && this.timeToLive() < 1e3 * requestCC["min-fresh"]) {
          return false;
        }
        if (this.stale()) {
          const allowsStale = requestCC["max-stale"] && !this._rescc["must-revalidate"] && (requestCC["max-stale"] === true || requestCC["max-stale"] > this.age() - this.maxAge());
          if (!allowsStale) {
            return false;
          }
        }
        return this._requestMatches(req, false);
      }
      _requestMatches(req, allowHeadMethod) {
        return (!this._url || this._url === req.url) && this._host === req.headers.host && (!req.method || this._method === req.method || allowHeadMethod && req.method === "HEAD") && this._varyMatches(req);
      }
      _allowsStoringAuthenticated() {
        return this._rescc["must-revalidate"] || this._rescc.public || this._rescc["s-maxage"];
      }
      _varyMatches(req) {
        if (!this._resHeaders.vary) {
          return true;
        }
        if (this._resHeaders.vary === "*") {
          return false;
        }
        const fields = this._resHeaders.vary.trim().toLowerCase().split(/\s*,\s*/);
        for (const name of fields) {
          if (req.headers[name] !== this._reqHeaders[name])
            return false;
        }
        return true;
      }
      _copyWithoutHopByHopHeaders(inHeaders) {
        const headers = {};
        for (const name in inHeaders) {
          if (hopByHopHeaders[name])
            continue;
          headers[name] = inHeaders[name];
        }
        if (inHeaders.connection) {
          const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
          for (const name of tokens) {
            delete headers[name];
          }
        }
        if (headers.warning) {
          const warnings = headers.warning.split(/,/).filter((warning) => {
            return !/^\s*1[0-9][0-9]/.test(warning);
          });
          if (!warnings.length) {
            delete headers.warning;
          } else {
            headers.warning = warnings.join(",").trim();
          }
        }
        return headers;
      }
      responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();
        if (age > 3600 * 24 && !this._hasExplicitExpiration() && this.maxAge() > 3600 * 24) {
          headers.warning = (headers.warning ? `${headers.warning}, ` : "") + '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
      }
      date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
          return serverDate;
        }
        return this._responseTime;
      }
      age() {
        let age = this._ageValue();
        const residentTime = (this.now() - this._responseTime) / 1e3;
        return age + residentTime;
      }
      _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
      }
      maxAge() {
        if (!this.storable() || this._rescc["no-cache"]) {
          return 0;
        }
        if (this._isShared && (this._resHeaders["set-cookie"] && !this._rescc.public && !this._rescc.immutable)) {
          return 0;
        }
        if (this._resHeaders.vary === "*") {
          return 0;
        }
        if (this._isShared) {
          if (this._rescc["proxy-revalidate"]) {
            return 0;
          }
          if (this._rescc["s-maxage"]) {
            return toNumberOrZero(this._rescc["s-maxage"]);
          }
        }
        if (this._rescc["max-age"]) {
          return toNumberOrZero(this._rescc["max-age"]);
        }
        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;
        const serverDate = this.date();
        if (this._resHeaders.expires) {
          const expires = Date.parse(this._resHeaders.expires);
          if (Number.isNaN(expires) || expires < serverDate) {
            return 0;
          }
          return Math.max(defaultMinTtl, (expires - serverDate) / 1e3);
        }
        if (this._resHeaders["last-modified"]) {
          const lastModified = Date.parse(this._resHeaders["last-modified"]);
          if (isFinite(lastModified) && serverDate > lastModified) {
            return Math.max(defaultMinTtl, (serverDate - lastModified) / 1e3 * this._cacheHeuristic);
          }
        }
        return defaultMinTtl;
      }
      timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc["stale-if-error"]);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc["stale-while-revalidate"]);
        return Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1e3;
      }
      stale() {
        return this.maxAge() <= this.age();
      }
      _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc["stale-if-error"]) > this.age();
      }
      useStaleWhileRevalidate() {
        return this.maxAge() + toNumberOrZero(this._rescc["stale-while-revalidate"]) > this.age();
      }
      static fromObject(obj) {
        return new this(void 0, void 0, { _fromObject: obj });
      }
      _fromObject(obj) {
        if (this._responseTime)
          throw Error("Reinitialized");
        if (!obj || obj.v !== 1)
          throw Error("Invalid serialization");
        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl = obj.imm !== void 0 ? obj.imm : 24 * 3600 * 1e3;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
      }
      toObject() {
        return {
          v: 1,
          t: this._responseTime,
          sh: this._isShared,
          ch: this._cacheHeuristic,
          imm: this._immutableMinTtl,
          st: this._status,
          resh: this._resHeaders,
          rescc: this._rescc,
          m: this._method,
          u: this._url,
          h: this._host,
          a: this._noAuthorization,
          reqh: this._reqHeaders,
          reqcc: this._reqcc
        };
      }
      revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);
        delete headers["if-range"];
        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
          delete headers["if-none-match"];
          delete headers["if-modified-since"];
          return headers;
        }
        if (this._resHeaders.etag) {
          headers["if-none-match"] = headers["if-none-match"] ? `${headers["if-none-match"]}, ${this._resHeaders.etag}` : this._resHeaders.etag;
        }
        const forbidsWeakValidators = headers["accept-ranges"] || headers["if-match"] || headers["if-unmodified-since"] || this._method && this._method != "GET";
        if (forbidsWeakValidators) {
          delete headers["if-modified-since"];
          if (headers["if-none-match"]) {
            const etags = headers["if-none-match"].split(/,/).filter((etag) => {
              return !/^\s*W\//.test(etag);
            });
            if (!etags.length) {
              delete headers["if-none-match"];
            } else {
              headers["if-none-match"] = etags.join(",").trim();
            }
          }
        } else if (this._resHeaders["last-modified"] && !headers["if-modified-since"]) {
          headers["if-modified-since"] = this._resHeaders["last-modified"];
        }
        return headers;
      }
      revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if (this._useStaleIfError() && isErrorResponse(response)) {
          return {
            modified: false,
            matches: false,
            policy: this
          };
        }
        if (!response || !response.headers) {
          throw Error("Response headers missing");
        }
        let matches = false;
        if (response.status !== void 0 && response.status != 304) {
          matches = false;
        } else if (response.headers.etag && !/^\s*W\//.test(response.headers.etag)) {
          matches = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
          matches = this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag.replace(/^\s*W\//, "");
        } else if (this._resHeaders["last-modified"]) {
          matches = this._resHeaders["last-modified"] === response.headers["last-modified"];
        } else {
          if (!this._resHeaders.etag && !this._resHeaders["last-modified"] && !response.headers.etag && !response.headers["last-modified"]) {
            matches = true;
          }
        }
        if (!matches) {
          return {
            policy: new this.constructor(request, response),
            modified: response.status != 304,
            matches: false
          };
        }
        const headers = {};
        for (const k in this._resHeaders) {
          headers[k] = k in response.headers && !excludedFromRevalidationUpdate[k] ? response.headers[k] : this._resHeaders[k];
        }
        const newResponse = Object.assign({}, response, {
          status: this._status,
          method: this._method,
          headers
        });
        return {
          policy: new this.constructor(request, newResponse, {
            shared: this._isShared,
            cacheHeuristic: this._cacheHeuristic,
            immutableMinTimeToLive: this._immutableMinTtl
          }),
          modified: false,
          matches: true
        };
      }
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/lowercase-keys/index.js
var require_lowercase_keys = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/lowercase-keys/index.js"(exports, module2) {
    "use strict";
    module2.exports = (object) => {
      const result = {};
      for (const [key2, value] of Object.entries(object)) {
        result[key2.toLowerCase()] = value;
      }
      return result;
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/responselike/src/index.js
var require_src = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/responselike/src/index.js"(exports, module2) {
    "use strict";
    var Readable2 = require("stream").Readable;
    var lowercaseKeys = require_lowercase_keys();
    var Response3 = class extends Readable2 {
      constructor(statusCode, headers, body, url) {
        if (typeof statusCode !== "number") {
          throw new TypeError("Argument `statusCode` should be a number");
        }
        if (typeof headers !== "object") {
          throw new TypeError("Argument `headers` should be an object");
        }
        if (!(body instanceof Buffer)) {
          throw new TypeError("Argument `body` should be a buffer");
        }
        if (typeof url !== "string") {
          throw new TypeError("Argument `url` should be a string");
        }
        super();
        this.statusCode = statusCode;
        this.headers = lowercaseKeys(headers);
        this.body = body;
        this.url = url;
      }
      _read() {
        this.push(this.body);
        this.push(null);
      }
    };
    module2.exports = Response3;
  }
});

// node_modules/mimic-response/index.js
var require_mimic_response = __commonJS({
  "node_modules/mimic-response/index.js"(exports, module2) {
    "use strict";
    var knownProps = [
      "destroy",
      "setTimeout",
      "socket",
      "headers",
      "trailers",
      "rawHeaders",
      "statusCode",
      "httpVersion",
      "httpVersionMinor",
      "httpVersionMajor",
      "rawTrailers",
      "statusMessage"
    ];
    module2.exports = (fromStream, toStream) => {
      const fromProps = new Set(Object.keys(fromStream).concat(knownProps));
      for (const prop of fromProps) {
        if (prop in toStream) {
          continue;
        }
        toStream[prop] = typeof fromStream[prop] === "function" ? fromStream[prop].bind(fromStream) : fromStream[prop];
      }
    };
  }
});

// node_modules/clone-response/src/index.js
var require_src2 = __commonJS({
  "node_modules/clone-response/src/index.js"(exports, module2) {
    "use strict";
    var PassThrough2 = require("stream").PassThrough;
    var mimicResponse = require_mimic_response();
    var cloneResponse = (response) => {
      if (!(response && response.pipe)) {
        throw new TypeError("Parameter `response` must be a response stream.");
      }
      const clone2 = new PassThrough2();
      mimicResponse(response, clone2);
      return response.pipe(clone2);
    };
    module2.exports = cloneResponse;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/json-buffer/index.js
var require_json_buffer = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/json-buffer/index.js"(exports) {
    exports.stringify = function stringify(o) {
      if (typeof o == "undefined")
        return o;
      if (o && Buffer.isBuffer(o))
        return JSON.stringify(":base64:" + o.toString("base64"));
      if (o && o.toJSON)
        o = o.toJSON();
      if (o && typeof o === "object") {
        var s3 = "";
        var array = Array.isArray(o);
        s3 = array ? "[" : "{";
        var first = true;
        for (var k in o) {
          var ignore = typeof o[k] == "function" || !array && typeof o[k] === "undefined";
          if (Object.hasOwnProperty.call(o, k) && !ignore) {
            if (!first)
              s3 += ",";
            first = false;
            if (array) {
              if (o[k] == void 0)
                s3 += "null";
              else
                s3 += stringify(o[k]);
            } else if (o[k] !== void 0) {
              s3 += stringify(k) + ":" + stringify(o[k]);
            }
          }
        }
        s3 += array ? "]" : "}";
        return s3;
      } else if (typeof o === "string") {
        return JSON.stringify(/^:/.test(o) ? ":" + o : o);
      } else if (typeof o === "undefined") {
        return "null";
      } else
        return JSON.stringify(o);
    };
    exports.parse = function(s3) {
      return JSON.parse(s3, function(key2, value) {
        if (typeof value === "string") {
          if (/^:base64:/.test(value))
            return Buffer.from(value.substring(8), "base64");
          else
            return /^:/.test(value) ? value.substring(1) : value;
        }
        return value;
      });
    };
  }
});

// node_modules/compress-brotli/node_modules/json-buffer/index.js
var require_json_buffer2 = __commonJS({
  "node_modules/compress-brotli/node_modules/json-buffer/index.js"(exports) {
    exports.stringify = function stringify(o) {
      if (typeof o == "undefined")
        return o;
      if (o && Buffer.isBuffer(o))
        return JSON.stringify(":base64:" + o.toString("base64"));
      if (o && o.toJSON)
        o = o.toJSON();
      if (o && typeof o === "object") {
        var s3 = "";
        var array = Array.isArray(o);
        s3 = array ? "[" : "{";
        var first = true;
        for (var k in o) {
          var ignore = typeof o[k] == "function" || !array && typeof o[k] === "undefined";
          if (Object.hasOwnProperty.call(o, k) && !ignore) {
            if (!first)
              s3 += ",";
            first = false;
            if (array) {
              if (o[k] == void 0)
                s3 += "null";
              else
                s3 += stringify(o[k]);
            } else if (o[k] !== void 0) {
              s3 += stringify(k) + ":" + stringify(o[k]);
            }
          }
        }
        s3 += array ? "]" : "}";
        return s3;
      } else if (typeof o === "string") {
        return JSON.stringify(/^:/.test(o) ? ":" + o : o);
      } else if (typeof o === "undefined") {
        return "null";
      } else
        return JSON.stringify(o);
    };
    exports.parse = function(s3) {
      return JSON.parse(s3, function(key2, value) {
        if (typeof value === "string") {
          if (/^:base64:/.test(value))
            return Buffer.from(value.substring(8), "base64");
          else
            return /^:/.test(value) ? value.substring(1) : value;
        }
        return value;
      });
    };
  }
});

// node_modules/compress-brotli/src/merge-options.js
var require_merge_options = __commonJS({
  "node_modules/compress-brotli/src/merge-options.js"(exports, module2) {
    "use strict";
    module2.exports = (defaultOptions = {}, options = {}) => {
      const params = __spreadValues(__spreadValues({}, defaultOptions.params || {}), options.params || {});
      return __spreadValues(__spreadValues(__spreadValues({}, defaultOptions), options), Object.keys(params).length ? {
        params
      } : {});
    };
  }
});

// node_modules/compress-brotli/src/index.js
var require_src3 = __commonJS({
  "node_modules/compress-brotli/src/index.js"(exports, module2) {
    "use strict";
    var { promisify } = require("util");
    var JSONB = require_json_buffer2();
    var zlib2 = require("zlib");
    var mergeOptions = require_merge_options();
    var compress = promisify(zlib2.brotliCompress);
    var decompress = promisify(zlib2.brotliDecompress);
    var identity = (val) => val;
    var createCompress = ({
      enable = true,
      serialize: serialize2 = JSONB.stringify,
      deserialize = JSONB.parse,
      compressOptions,
      decompressOptions
    } = {}) => {
      if (!enable) {
        return { serialize: serialize2, deserialize, decompress: identity, compress: identity };
      }
      return {
        serialize: serialize2,
        deserialize,
        compress: async (data, options = {}) => {
          if (data === void 0)
            return data;
          const serializedData = serialize2(data);
          return compress(serializedData, mergeOptions(compressOptions, options));
        },
        decompress: async (data, options = {}) => {
          if (data === void 0)
            return data;
          return deserialize(await decompress(data, mergeOptions(decompressOptions, options)));
        }
      };
    };
    module2.exports = createCompress;
    module2.exports.stringify = JSONB.stringify;
    module2.exports.parse = JSONB.parse;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/keyv/src/index.js
var require_src4 = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/keyv/src/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var JSONB = require_json_buffer();
    var compressBrotli = require_src3();
    var loadStore = (options) => {
      const adapters = {
        redis: "@keyv/redis",
        mongodb: "@keyv/mongo",
        mongo: "@keyv/mongo",
        sqlite: "@keyv/sqlite",
        postgresql: "@keyv/postgres",
        postgres: "@keyv/postgres",
        mysql: "@keyv/mysql",
        etcd: "@keyv/etcd",
        offline: "@keyv/offline",
        tiered: "@keyv/tiered"
      };
      if (options.adapter || options.uri) {
        const adapter = options.adapter || /^[^:+]*/.exec(options.uri)[0];
        return new (require(adapters[adapter]))(options);
      }
      return /* @__PURE__ */ new Map();
    };
    var iterableAdapters = [
      "sqlite",
      "postgres",
      "mysql",
      "mongo",
      "redis",
      "tiered"
    ];
    var Keyv = class extends EventEmitter {
      constructor(uri, options) {
        super();
        this.opts = __spreadValues(__spreadValues({
          namespace: "keyv",
          serialize: JSONB.stringify,
          deserialize: JSONB.parse
        }, typeof uri === "string" ? { uri } : uri), options);
        if (!this.opts.store) {
          const adapterOptions = __spreadValues({}, this.opts);
          this.opts.store = loadStore(adapterOptions);
        }
        if (this.opts.compress) {
          const brotli = compressBrotli(this.opts.compress.opts);
          this.opts.serialize = async ({ value, expires }) => brotli.serialize({ value: await brotli.compress(value), expires });
          this.opts.deserialize = async (data) => {
            const { value, expires } = brotli.deserialize(data);
            return { value: await brotli.decompress(value), expires };
          };
        }
        if (typeof this.opts.store.on === "function") {
          this.opts.store.on("error", (error3) => this.emit("error", error3));
        }
        this.opts.store.namespace = this.opts.namespace;
        const generateIterator = (iterator) => async function* () {
          for await (const [key2, raw] of typeof iterator === "function" ? iterator(this.opts.store.namespace) : iterator) {
            const data = this.opts.deserialize(raw);
            if (this.opts.store.namespace && !key2.includes(this.opts.store.namespace)) {
              continue;
            }
            if (typeof data.expires === "number" && Date.now() > data.expires) {
              this.delete(key2);
              continue;
            }
            yield [this._getKeyUnprefix(key2), data.value];
          }
        };
        if (typeof this.opts.store[Symbol.iterator] === "function" && this.opts.store instanceof Map) {
          this.iterator = generateIterator(this.opts.store);
        } else if (typeof this.opts.store.iterator === "function" && this.opts.store.opts && this._checkIterableAdaptar()) {
          this.iterator = generateIterator(this.opts.store.iterator.bind(this.opts.store));
        }
      }
      _checkIterableAdaptar() {
        return iterableAdapters.includes(this.opts.store.opts.dialect) || iterableAdapters.findIndex((element) => this.opts.store.opts.url.includes(element)) >= 0;
      }
      _getKeyPrefix(key2) {
        return `${this.opts.namespace}:${key2}`;
      }
      _getKeyPrefixArray(keys) {
        return keys.map((key2) => `${this.opts.namespace}:${key2}`);
      }
      _getKeyUnprefix(key2) {
        return key2.split(":").splice(1).join(":");
      }
      get(key2, options) {
        const { store } = this.opts;
        const isArray = Array.isArray(key2);
        const keyPrefixed = isArray ? this._getKeyPrefixArray(key2) : this._getKeyPrefix(key2);
        if (isArray && store.getMany === void 0) {
          const promises = [];
          for (const key3 of keyPrefixed) {
            promises.push(Promise.resolve().then(() => store.get(key3)).then((data) => typeof data === "string" ? this.opts.deserialize(data) : data).then((data) => {
              if (data === void 0 || data === null) {
                return void 0;
              }
              if (typeof data.expires === "number" && Date.now() > data.expires) {
                return this.delete(key3).then(() => void 0);
              }
              return options && options.raw ? data : data.value;
            }));
          }
          return Promise.allSettled(promises).then((values) => {
            const data = [];
            for (const value of values) {
              data.push(value.value);
            }
            return data.every((x2) => x2 === void 0) ? [] : data;
          });
        }
        return Promise.resolve().then(() => isArray ? store.getMany(keyPrefixed) : store.get(keyPrefixed)).then((data) => typeof data === "string" ? this.opts.deserialize(data) : data).then((data) => {
          if (data === void 0 || data === null) {
            return void 0;
          }
          if (isArray) {
            const result = [];
            if (data.length === 0) {
              return [];
            }
            for (let row of data) {
              if (typeof row === "string") {
                row = this.opts.deserialize(row);
              }
              if (row === void 0 || row === null) {
                result.push(void 0);
                continue;
              }
              if (typeof row.expires === "number" && Date.now() > row.expires) {
                this.delete(key2).then(() => void 0);
                result.push(void 0);
              } else {
                result.push(options && options.raw ? row : row.value);
              }
            }
            return result.every((x2) => x2 === void 0) ? [] : result;
          }
          if (typeof data.expires === "number" && Date.now() > data.expires) {
            return this.delete(key2).then(() => void 0);
          }
          return options && options.raw ? data : data.value;
        });
      }
      set(key2, value, ttl) {
        const keyPrefixed = this._getKeyPrefix(key2);
        if (typeof ttl === "undefined") {
          ttl = this.opts.ttl;
        }
        if (ttl === 0) {
          ttl = void 0;
        }
        const { store } = this.opts;
        return Promise.resolve().then(() => {
          const expires = typeof ttl === "number" ? Date.now() + ttl : null;
          if (typeof value === "symbol") {
            this.emit("error", "symbol cannot be serialized");
          }
          value = { value, expires };
          return this.opts.serialize(value);
        }).then((value2) => store.set(keyPrefixed, value2, ttl)).then(() => true);
      }
      delete(key2) {
        const { store } = this.opts;
        if (Array.isArray(key2)) {
          const keyPrefixed2 = this._getKeyPrefixArray(key2);
          if (store.deleteMany === void 0) {
            const promises = [];
            for (const key3 of keyPrefixed2) {
              promises.push(store.delete(key3));
            }
            return Promise.allSettled(promises).then((values) => values.every((x2) => x2.value === true));
          }
          return Promise.resolve().then(() => store.deleteMany(keyPrefixed2));
        }
        const keyPrefixed = this._getKeyPrefix(key2);
        return Promise.resolve().then(() => store.delete(keyPrefixed));
      }
      clear() {
        const { store } = this.opts;
        return Promise.resolve().then(() => store.clear());
      }
      has(key2) {
        const keyPrefixed = this._getKeyPrefix(key2);
        const { store } = this.opts;
        return Promise.resolve().then(async () => {
          if (typeof store.has === "function") {
            return store.has(keyPrefixed);
          }
          const value = await store.get(keyPrefixed);
          return value !== void 0;
        });
      }
      disconnect() {
        const { store } = this.opts;
        if (typeof store.disconnect === "function") {
          return store.disconnect();
        }
      }
    };
    module2.exports = Keyv;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/cacheable-request/src/index.js
var require_src5 = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/cacheable-request/src/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var urlLib = require("url");
    var normalizeUrl = require_normalize_url();
    var getStream = require_get_stream();
    var CachePolicy = require_http_cache_semantics();
    var Response3 = require_src();
    var lowercaseKeys = require_lowercase_keys();
    var cloneResponse = require_src2();
    var Keyv = require_src4();
    var CacheableRequest = class {
      constructor(request, cacheAdapter) {
        if (typeof request !== "function") {
          throw new TypeError("Parameter `request` must be a function");
        }
        this.cache = new Keyv({
          uri: typeof cacheAdapter === "string" && cacheAdapter,
          store: typeof cacheAdapter !== "string" && cacheAdapter,
          namespace: "cacheable-request"
        });
        return this.createCacheableRequest(request);
      }
      createCacheableRequest(request) {
        return (opts, cb) => {
          let url;
          if (typeof opts === "string") {
            url = normalizeUrlObject(urlLib.parse(opts));
            opts = {};
          } else if (opts instanceof urlLib.URL) {
            url = normalizeUrlObject(urlLib.parse(opts.toString()));
            opts = {};
          } else {
            const [pathname, ...searchParts] = (opts.path || "").split("?");
            const search = searchParts.length > 0 ? `?${searchParts.join("?")}` : "";
            url = normalizeUrlObject(__spreadProps(__spreadValues({}, opts), { pathname, search }));
          }
          opts = __spreadValues(__spreadValues({
            headers: {},
            method: "GET",
            cache: true,
            strictTtl: false,
            automaticFailover: false
          }, opts), urlObjectToRequestOptions(url));
          opts.headers = lowercaseKeys(opts.headers);
          const ee = new EventEmitter();
          const normalizedUrlString = normalizeUrl(urlLib.format(url), {
            stripWWW: false,
            removeTrailingSlash: false,
            stripAuthentication: false
          });
          const key2 = `${opts.method}:${normalizedUrlString}`;
          let revalidate = false;
          let madeRequest = false;
          const makeRequest = (opts2) => {
            madeRequest = true;
            let requestErrored = false;
            let requestErrorCallback;
            const requestErrorPromise = new Promise((resolve2) => {
              requestErrorCallback = () => {
                if (!requestErrored) {
                  requestErrored = true;
                  resolve2();
                }
              };
            });
            const handler2 = (response) => {
              if (revalidate && !opts2.forceRefresh) {
                response.status = response.statusCode;
                const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts2, response);
                if (!revalidatedPolicy.modified) {
                  const headers = revalidatedPolicy.policy.responseHeaders();
                  response = new Response3(revalidate.statusCode, headers, revalidate.body, revalidate.url);
                  response.cachePolicy = revalidatedPolicy.policy;
                  response.fromCache = true;
                }
              }
              if (!response.fromCache) {
                response.cachePolicy = new CachePolicy(opts2, response, opts2);
                response.fromCache = false;
              }
              let clonedResponse;
              if (opts2.cache && response.cachePolicy.storable()) {
                clonedResponse = cloneResponse(response);
                (async () => {
                  try {
                    const bodyPromise = getStream.buffer(response);
                    await Promise.race([
                      requestErrorPromise,
                      new Promise((resolve2) => response.once("end", resolve2))
                    ]);
                    if (requestErrored) {
                      return;
                    }
                    const body = await bodyPromise;
                    const value = {
                      cachePolicy: response.cachePolicy.toObject(),
                      url: response.url,
                      statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
                      body
                    };
                    let ttl = opts2.strictTtl ? response.cachePolicy.timeToLive() : void 0;
                    if (opts2.maxTtl) {
                      ttl = ttl ? Math.min(ttl, opts2.maxTtl) : opts2.maxTtl;
                    }
                    await this.cache.set(key2, value, ttl);
                  } catch (error3) {
                    ee.emit("error", new CacheableRequest.CacheError(error3));
                  }
                })();
              } else if (opts2.cache && revalidate) {
                (async () => {
                  try {
                    await this.cache.delete(key2);
                  } catch (error3) {
                    ee.emit("error", new CacheableRequest.CacheError(error3));
                  }
                })();
              }
              ee.emit("response", clonedResponse || response);
              if (typeof cb === "function") {
                cb(clonedResponse || response);
              }
            };
            try {
              const req = request(opts2, handler2);
              req.once("error", requestErrorCallback);
              req.once("abort", requestErrorCallback);
              ee.emit("request", req);
            } catch (error3) {
              ee.emit("error", new CacheableRequest.RequestError(error3));
            }
          };
          (async () => {
            const get = async (opts2) => {
              await Promise.resolve();
              const cacheEntry = opts2.cache ? await this.cache.get(key2) : void 0;
              if (typeof cacheEntry === "undefined") {
                return makeRequest(opts2);
              }
              const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
              if (policy.satisfiesWithoutRevalidation(opts2) && !opts2.forceRefresh) {
                const headers = policy.responseHeaders();
                const response = new Response3(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
                response.cachePolicy = policy;
                response.fromCache = true;
                ee.emit("response", response);
                if (typeof cb === "function") {
                  cb(response);
                }
              } else {
                revalidate = cacheEntry;
                opts2.headers = policy.revalidationHeaders(opts2);
                makeRequest(opts2);
              }
            };
            const errorHandler = (error3) => ee.emit("error", new CacheableRequest.CacheError(error3));
            this.cache.once("error", errorHandler);
            ee.on("response", () => this.cache.removeListener("error", errorHandler));
            try {
              await get(opts);
            } catch (error3) {
              if (opts.automaticFailover && !madeRequest) {
                makeRequest(opts);
              }
              ee.emit("error", new CacheableRequest.CacheError(error3));
            }
          })();
          return ee;
        };
      }
    };
    function urlObjectToRequestOptions(url) {
      const options = __spreadValues({}, url);
      options.path = `${url.pathname || "/"}${url.search || ""}`;
      delete options.pathname;
      delete options.search;
      return options;
    }
    function normalizeUrlObject(url) {
      return {
        protocol: url.protocol,
        auth: url.auth,
        hostname: url.hostname || url.host || "localhost",
        port: url.port,
        pathname: url.pathname,
        search: url.search
      };
    }
    CacheableRequest.RequestError = class extends Error {
      constructor(error3) {
        super(error3.message);
        this.name = "RequestError";
        Object.assign(this, error3);
      }
    };
    CacheableRequest.CacheError = class extends Error {
      constructor(error3) {
        super(error3.message);
        this.name = "CacheError";
        Object.assign(this, error3);
      }
    };
    module2.exports = CacheableRequest;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/to-readable-stream/index.js
var require_to_readable_stream = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/to-readable-stream/index.js"(exports, module2) {
    "use strict";
    var { Readable: ReadableStream2 } = require("stream");
    var toReadableStream = (input) => new ReadableStream2({
      read() {
        this.push(input);
        this.push(null);
      }
    });
    module2.exports = toReadableStream;
    module2.exports.default = toReadableStream;
  }
});

// node_modules/cacheable-lookup/node_modules/json-buffer/index.js
var require_json_buffer3 = __commonJS({
  "node_modules/cacheable-lookup/node_modules/json-buffer/index.js"(exports) {
    exports.stringify = function stringify(o) {
      if (typeof o == "undefined")
        return o;
      if (o && Buffer.isBuffer(o))
        return JSON.stringify(":base64:" + o.toString("base64"));
      if (o && o.toJSON)
        o = o.toJSON();
      if (o && typeof o === "object") {
        var s3 = "";
        var array = Array.isArray(o);
        s3 = array ? "[" : "{";
        var first = true;
        for (var k in o) {
          var ignore = typeof o[k] == "function" || !array && typeof o[k] === "undefined";
          if (Object.hasOwnProperty.call(o, k) && !ignore) {
            if (!first)
              s3 += ",";
            first = false;
            if (array) {
              if (o[k] == void 0)
                s3 += "null";
              else
                s3 += stringify(o[k]);
            } else if (o[k] !== void 0) {
              s3 += stringify(k) + ":" + stringify(o[k]);
            }
          }
        }
        s3 += array ? "]" : "}";
        return s3;
      } else if (typeof o === "string") {
        return JSON.stringify(/^:/.test(o) ? ":" + o : o);
      } else if (typeof o === "undefined") {
        return "null";
      } else
        return JSON.stringify(o);
    };
    exports.parse = function(s3) {
      return JSON.parse(s3, function(key2, value) {
        if (typeof value === "string") {
          if (/^:base64:/.test(value))
            return Buffer.from(value.substring(8), "base64");
          else
            return /^:/.test(value) ? value.substring(1) : value;
        }
        return value;
      });
    };
  }
});

// node_modules/cacheable-lookup/node_modules/keyv/src/index.js
var require_src6 = __commonJS({
  "node_modules/cacheable-lookup/node_modules/keyv/src/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var JSONB = require_json_buffer3();
    var compressBrotli = require_src3();
    var loadStore = (options) => {
      const adapters = {
        redis: "@keyv/redis",
        mongodb: "@keyv/mongo",
        mongo: "@keyv/mongo",
        sqlite: "@keyv/sqlite",
        postgresql: "@keyv/postgres",
        postgres: "@keyv/postgres",
        mysql: "@keyv/mysql",
        etcd: "@keyv/etcd",
        offline: "@keyv/offline",
        tiered: "@keyv/tiered"
      };
      if (options.adapter || options.uri) {
        const adapter = options.adapter || /^[^:+]*/.exec(options.uri)[0];
        return new (require(adapters[adapter]))(options);
      }
      return /* @__PURE__ */ new Map();
    };
    var iterableAdapters = [
      "sqlite",
      "postgres",
      "mysql",
      "mongo",
      "redis",
      "tiered"
    ];
    var Keyv = class extends EventEmitter {
      constructor(uri, options) {
        super();
        this.opts = __spreadValues(__spreadValues({
          namespace: "keyv",
          serialize: JSONB.stringify,
          deserialize: JSONB.parse
        }, typeof uri === "string" ? { uri } : uri), options);
        if (!this.opts.store) {
          const adapterOptions = __spreadValues({}, this.opts);
          this.opts.store = loadStore(adapterOptions);
        }
        if (this.opts.compress) {
          const brotli = compressBrotli(this.opts.compress.opts);
          this.opts.serialize = async ({ value, expires }) => brotli.serialize({ value: await brotli.compress(value), expires });
          this.opts.deserialize = async (data) => {
            const { value, expires } = brotli.deserialize(data);
            return { value: await brotli.decompress(value), expires };
          };
        }
        if (typeof this.opts.store.on === "function") {
          this.opts.store.on("error", (error3) => this.emit("error", error3));
        }
        this.opts.store.namespace = this.opts.namespace;
        const generateIterator = (iterator) => async function* () {
          for await (const [key2, raw] of typeof iterator === "function" ? iterator(this.opts.store.namespace) : iterator) {
            const data = this.opts.deserialize(raw);
            if (this.opts.store.namespace && !key2.includes(this.opts.store.namespace)) {
              continue;
            }
            if (typeof data.expires === "number" && Date.now() > data.expires) {
              this.delete(key2);
              continue;
            }
            yield [this._getKeyUnprefix(key2), data.value];
          }
        };
        if (typeof this.opts.store[Symbol.iterator] === "function" && this.opts.store instanceof Map) {
          this.iterator = generateIterator(this.opts.store);
        } else if (typeof this.opts.store.iterator === "function" && this.opts.store.opts && this._checkIterableAdaptar()) {
          this.iterator = generateIterator(this.opts.store.iterator.bind(this.opts.store));
        }
      }
      _checkIterableAdaptar() {
        return iterableAdapters.includes(this.opts.store.opts.dialect) || iterableAdapters.findIndex((element) => this.opts.store.opts.url.includes(element)) >= 0;
      }
      _getKeyPrefix(key2) {
        return `${this.opts.namespace}:${key2}`;
      }
      _getKeyPrefixArray(keys) {
        return keys.map((key2) => `${this.opts.namespace}:${key2}`);
      }
      _getKeyUnprefix(key2) {
        return key2.split(":").splice(1).join(":");
      }
      get(key2, options) {
        const { store } = this.opts;
        const isArray = Array.isArray(key2);
        const keyPrefixed = isArray ? this._getKeyPrefixArray(key2) : this._getKeyPrefix(key2);
        if (isArray && store.getMany === void 0) {
          const promises = [];
          for (const key3 of keyPrefixed) {
            promises.push(Promise.resolve().then(() => store.get(key3)).then((data) => typeof data === "string" ? this.opts.deserialize(data) : data).then((data) => {
              if (data === void 0 || data === null) {
                return void 0;
              }
              if (typeof data.expires === "number" && Date.now() > data.expires) {
                return this.delete(key3).then(() => void 0);
              }
              return options && options.raw ? data : data.value;
            }));
          }
          return Promise.allSettled(promises).then((values) => {
            const data = [];
            for (const value of values) {
              data.push(value.value);
            }
            return data.every((x2) => x2 === void 0) ? [] : data;
          });
        }
        return Promise.resolve().then(() => isArray ? store.getMany(keyPrefixed) : store.get(keyPrefixed)).then((data) => typeof data === "string" ? this.opts.deserialize(data) : data).then((data) => {
          if (data === void 0 || data === null) {
            return void 0;
          }
          if (isArray) {
            const result = [];
            if (data.length === 0) {
              return [];
            }
            for (let row of data) {
              if (typeof row === "string") {
                row = this.opts.deserialize(row);
              }
              if (row === void 0 || row === null) {
                result.push(void 0);
                continue;
              }
              if (typeof row.expires === "number" && Date.now() > row.expires) {
                this.delete(key2).then(() => void 0);
                result.push(void 0);
              } else {
                result.push(options && options.raw ? row : row.value);
              }
            }
            return result.every((x2) => x2 === void 0) ? [] : result;
          }
          if (typeof data.expires === "number" && Date.now() > data.expires) {
            return this.delete(key2).then(() => void 0);
          }
          return options && options.raw ? data : data.value;
        });
      }
      set(key2, value, ttl) {
        const keyPrefixed = this._getKeyPrefix(key2);
        if (typeof ttl === "undefined") {
          ttl = this.opts.ttl;
        }
        if (ttl === 0) {
          ttl = void 0;
        }
        const { store } = this.opts;
        return Promise.resolve().then(() => {
          const expires = typeof ttl === "number" ? Date.now() + ttl : null;
          if (typeof value === "symbol") {
            this.emit("error", "symbol cannot be serialized");
          }
          value = { value, expires };
          return this.opts.serialize(value);
        }).then((value2) => store.set(keyPrefixed, value2, ttl)).then(() => true);
      }
      delete(key2) {
        const { store } = this.opts;
        if (Array.isArray(key2)) {
          const keyPrefixed2 = this._getKeyPrefixArray(key2);
          if (store.deleteMany === void 0) {
            const promises = [];
            for (const key3 of keyPrefixed2) {
              promises.push(store.delete(key3));
            }
            return Promise.allSettled(promises).then((values) => values.every((x2) => x2.value === true));
          }
          return Promise.resolve().then(() => store.deleteMany(keyPrefixed2));
        }
        const keyPrefixed = this._getKeyPrefix(key2);
        return Promise.resolve().then(() => store.delete(keyPrefixed));
      }
      clear() {
        const { store } = this.opts;
        return Promise.resolve().then(() => store.clear());
      }
      has(key2) {
        const keyPrefixed = this._getKeyPrefix(key2);
        const { store } = this.opts;
        return Promise.resolve().then(async () => {
          if (typeof store.has === "function") {
            return store.has(keyPrefixed);
          }
          const value = await store.get(keyPrefixed);
          return value !== void 0;
        });
      }
      disconnect() {
        const { store } = this.opts;
        if (typeof store.disconnect === "function") {
          return store.disconnect();
        }
      }
    };
    module2.exports = Keyv;
  }
});

// node_modules/cacheable-lookup/index.js
var require_cacheable_lookup = __commonJS({
  "node_modules/cacheable-lookup/index.js"(exports, module2) {
    "use strict";
    var { Resolver, V4MAPPED, ADDRCONFIG } = require("dns");
    var { promisify } = require("util");
    var os = require("os");
    var Keyv = require_src6();
    var kCacheableLookupData = Symbol("cacheableLookupData");
    var kCacheableLookupInstance = Symbol("cacheableLookupInstance");
    var verifyAgent = (agent) => {
      if (!(agent && typeof agent.createConnection === "function")) {
        throw new Error("Expected an Agent instance as the first argument");
      }
    };
    var map4to6 = (entries) => {
      for (const entry5 of entries) {
        entry5.address = `::ffff:${entry5.address}`;
        entry5.family = 6;
      }
    };
    var getIfaceInfo = () => {
      let has4 = false;
      let has6 = false;
      for (const device of Object.values(os.networkInterfaces())) {
        for (const iface of device) {
          if (iface.internal) {
            continue;
          }
          if (iface.family === "IPv6") {
            has6 = true;
          } else {
            has4 = true;
          }
          if (has4 && has6) {
            break;
          }
        }
      }
      return { has4, has6 };
    };
    var CacheableLookup = class {
      constructor({ cacheAdapter, maxTtl = Infinity, resolver } = {}) {
        this.cache = new Keyv({
          uri: typeof cacheAdapter === "string" && cacheAdapter,
          store: typeof cacheAdapter !== "string" && cacheAdapter,
          namespace: "cached-lookup"
        });
        this.maxTtl = maxTtl;
        this._resolver = resolver || new Resolver();
        this._resolve4 = promisify(this._resolver.resolve4.bind(this._resolver));
        this._resolve6 = promisify(this._resolver.resolve6.bind(this._resolver));
        this._iface = getIfaceInfo();
        this.lookup = this.lookup.bind(this);
        this.lookupAsync = this.lookupAsync.bind(this);
      }
      set servers(servers) {
        this._resolver.setServers(servers);
      }
      get servers() {
        return this._resolver.getServers();
      }
      lookup(hostname, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        this.lookupAsync(hostname, __spreadProps(__spreadValues({}, options), { throwNotFound: true })).then((result) => {
          if (options.all) {
            callback(null, result);
          } else {
            callback(null, result.address, result.family, result.expires, result.ttl);
          }
        }).catch(callback);
      }
      async lookupAsync(hostname, options = {}) {
        let cached;
        if (!options.family && options.all) {
          const [cached4, cached6] = await Promise.all([this.lookupAsync(hostname, { all: true, family: 4 }), this.lookupAsync(hostname, { all: true, family: 6 })]);
          cached = [...cached4, ...cached6];
        } else {
          cached = await this.query(hostname, options.family || 4);
          if (cached.length === 0 && options.family === 6 && options.hints & V4MAPPED) {
            cached = await this.query(hostname, 4);
            map4to6(cached);
          }
        }
        if (options.hints & ADDRCONFIG) {
          const { _iface } = this;
          cached = cached.filter((entry5) => entry5.family === 6 ? _iface.has6 : _iface.has4);
        }
        if (cached.length === 0 && options.throwNotFound) {
          const error3 = new Error(`ENOTFOUND ${hostname}`);
          error3.code = "ENOTFOUND";
          error3.hostname = hostname;
          throw error3;
        }
        const now = Date.now();
        cached = cached.filter((entry5) => entry5.ttl === 0 || now < entry5.expires);
        if (options.all) {
          return cached;
        }
        if (cached.length === 1) {
          return cached[0];
        }
        if (cached.length === 0) {
          return void 0;
        }
        return this._getEntry(cached);
      }
      async query(hostname, family) {
        let cached = await this.cache.get(`${hostname}:${family}`);
        if (!cached) {
          cached = await this.queryAndCache(hostname, family);
        }
        return cached;
      }
      async queryAndCache(hostname, family) {
        const resolve2 = family === 4 ? this._resolve4 : this._resolve6;
        const entries = await resolve2(hostname, { ttl: true });
        if (entries === void 0) {
          return [];
        }
        const now = Date.now();
        let cacheTtl = 0;
        for (const entry5 of entries) {
          cacheTtl = Math.max(cacheTtl, entry5.ttl);
          entry5.family = family;
          entry5.expires = now + entry5.ttl * 1e3;
        }
        cacheTtl = Math.min(this.maxTtl, cacheTtl) * 1e3;
        if (this.maxTtl !== 0 && cacheTtl !== 0) {
          await this.cache.set(`${hostname}:${family}`, entries, cacheTtl);
        }
        return entries;
      }
      _getEntry(entries) {
        return entries[Math.floor(Math.random() * entries.length)];
      }
      install(agent) {
        verifyAgent(agent);
        if (kCacheableLookupData in agent) {
          throw new Error("CacheableLookup has been already installed");
        }
        agent[kCacheableLookupData] = agent.createConnection;
        agent[kCacheableLookupInstance] = this;
        agent.createConnection = (options, callback) => {
          if (!("lookup" in options)) {
            options.lookup = this.lookup;
          }
          return agent[kCacheableLookupData](options, callback);
        };
      }
      uninstall(agent) {
        verifyAgent(agent);
        if (agent[kCacheableLookupData]) {
          if (agent[kCacheableLookupInstance] !== this) {
            throw new Error("The agent is not owned by this CacheableLookup instance");
          }
          agent.createConnection = agent[kCacheableLookupData];
          delete agent[kCacheableLookupData];
          delete agent[kCacheableLookupInstance];
        }
      }
      updateInterfaceInfo() {
        this._iface = getIfaceInfo();
      }
    };
    module2.exports = CacheableLookup;
    module2.exports.default = CacheableLookup;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/known-hook-events.js
var require_known_hook_events = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/known-hook-events.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var knownHookEvents = [
      "beforeError",
      "init",
      "beforeRequest",
      "beforeRedirect",
      "beforeRetry",
      "afterResponse"
    ];
    exports.default = knownHookEvents;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/dynamic-require.js
var require_dynamic_require = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/dynamic-require.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (moduleObject, moduleId) => moduleObject.require(moduleId);
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/is-form-data.js
var require_is_form_data = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/is-form-data.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_1 = require_dist();
    exports.default = (body) => is_1.default.nodeStream(body) && is_1.default.function_(body.getBoundary);
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/get-body-size.js
var require_get_body_size = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/get-body-size.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = require("fs");
    var util_1 = require("util");
    var is_1 = require_dist();
    var is_form_data_1 = require_is_form_data();
    var statAsync = util_1.promisify(fs_1.stat);
    exports.default = async (options) => {
      const { body, headers } = options;
      if (headers && "content-length" in headers) {
        return Number(headers["content-length"]);
      }
      if (!body) {
        return 0;
      }
      if (is_1.default.string(body)) {
        return Buffer.byteLength(body);
      }
      if (is_1.default.buffer(body)) {
        return body.length;
      }
      if (is_form_data_1.default(body)) {
        return util_1.promisify(body.getLength.bind(body))();
      }
      if (body instanceof fs_1.ReadStream) {
        const { size } = await statAsync(body.path);
        return size;
      }
      return void 0;
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/merge.js
var require_merge = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var url_1 = require("url");
    var is_1 = require_dist();
    function merge(target, ...sources) {
      for (const source of sources) {
        for (const [key2, sourceValue] of Object.entries(source)) {
          const targetValue = target[key2];
          if (is_1.default.urlInstance(targetValue) && is_1.default.string(sourceValue)) {
            target[key2] = new url_1.URL(sourceValue, targetValue);
          } else if (is_1.default.plainObject(sourceValue)) {
            if (is_1.default.plainObject(targetValue)) {
              target[key2] = merge({}, targetValue, sourceValue);
            } else {
              target[key2] = merge({}, sourceValue);
            }
          } else if (is_1.default.array(sourceValue)) {
            target[key2] = sourceValue.slice();
          } else {
            target[key2] = sourceValue;
          }
        }
      }
      return target;
    }
    exports.default = merge;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/options-to-url.js
var require_options_to_url = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/options-to-url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var url_1 = require("url");
    function validateSearchParams(searchParams) {
      for (const value of Object.values(searchParams)) {
        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean" && value !== null) {
          throw new TypeError(`The \`searchParams\` value '${String(value)}' must be a string, number, boolean or null`);
        }
      }
    }
    var keys = [
      "protocol",
      "username",
      "password",
      "host",
      "hostname",
      "port",
      "pathname",
      "search",
      "hash"
    ];
    exports.default = (options) => {
      var _a4, _b;
      let origin;
      if (options.path) {
        if (options.pathname) {
          throw new TypeError("Parameters `path` and `pathname` are mutually exclusive.");
        }
        if (options.search) {
          throw new TypeError("Parameters `path` and `search` are mutually exclusive.");
        }
        if (options.searchParams) {
          throw new TypeError("Parameters `path` and `searchParams` are mutually exclusive.");
        }
      }
      if (Reflect.has(options, "auth")) {
        throw new TypeError("Parameter `auth` is deprecated. Use `username` / `password` instead.");
      }
      if (options.search && options.searchParams) {
        throw new TypeError("Parameters `search` and `searchParams` are mutually exclusive.");
      }
      if (options.href) {
        return new url_1.URL(options.href);
      }
      if (options.origin) {
        origin = options.origin;
      } else {
        if (!options.protocol) {
          throw new TypeError("No URL protocol specified");
        }
        origin = `${options.protocol}//${_b = (_a4 = options.hostname, _a4 !== null && _a4 !== void 0 ? _a4 : options.host), _b !== null && _b !== void 0 ? _b : ""}`;
      }
      const url = new url_1.URL(origin);
      if (options.path) {
        const searchIndex = options.path.indexOf("?");
        if (searchIndex === -1) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.slice(0, searchIndex);
          options.search = options.path.slice(searchIndex + 1);
        }
      }
      if (Reflect.has(options, "path")) {
        delete options.path;
      }
      for (const key2 of keys) {
        if (Reflect.has(options, key2)) {
          url[key2] = options[key2].toString();
        }
      }
      if (options.searchParams) {
        if (typeof options.searchParams !== "string" && !(options.searchParams instanceof url_1.URLSearchParams)) {
          validateSearchParams(options.searchParams);
        }
        new url_1.URLSearchParams(options.searchParams).forEach((value, key2) => {
          url.searchParams.append(key2, value);
        });
      }
      return url;
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/supports-brotli.js
var require_supports_brotli = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/supports-brotli.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var zlib2 = require("zlib");
    exports.default = typeof zlib2.createBrotliDecompress === "function";
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/types.js
var require_types = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requestSymbol = Symbol("request");
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/normalize-arguments.js
var require_normalize_arguments = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/normalize-arguments.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var url_1 = require("url");
    var util_1 = require("util");
    var CacheableRequest = require_src5();
    var http2 = require("http");
    var https2 = require("https");
    var lowercaseKeys = require_lowercase_keys();
    var toReadableStream = require_to_readable_stream();
    var is_1 = require_dist();
    var cacheable_lookup_1 = require_cacheable_lookup();
    var errors_1 = require_errors();
    var known_hook_events_1 = require_known_hook_events();
    var dynamic_require_1 = require_dynamic_require();
    var get_body_size_1 = require_get_body_size();
    var is_form_data_1 = require_is_form_data();
    var merge_1 = require_merge();
    var options_to_url_1 = require_options_to_url();
    var supports_brotli_1 = require_supports_brotli();
    var types_1 = require_types();
    var nonEnumerableProperties = [
      "context",
      "body",
      "json",
      "form"
    ];
    var isAgentByProtocol = (agent) => is_1.default.object(agent);
    exports.preNormalizeArguments = (options, defaults2) => {
      var _a4, _b, _c, _d2, _e, _f;
      if (is_1.default.undefined(options.headers)) {
        options.headers = {};
      } else {
        options.headers = lowercaseKeys(options.headers);
      }
      for (const [key2, value] of Object.entries(options.headers)) {
        if (is_1.default.null_(value)) {
          throw new TypeError(`Use \`undefined\` instead of \`null\` to delete the \`${key2}\` header`);
        }
      }
      if (is_1.default.urlInstance(options.prefixUrl) || is_1.default.string(options.prefixUrl)) {
        options.prefixUrl = options.prefixUrl.toString();
        if (options.prefixUrl.length !== 0 && !options.prefixUrl.endsWith("/")) {
          options.prefixUrl += "/";
        }
      } else {
        options.prefixUrl = defaults2 ? defaults2.prefixUrl : "";
      }
      if (is_1.default.undefined(options.hooks)) {
        options.hooks = {};
      }
      if (is_1.default.object(options.hooks)) {
        for (const event of known_hook_events_1.default) {
          if (Reflect.has(options.hooks, event)) {
            if (!is_1.default.array(options.hooks[event])) {
              throw new TypeError(`Parameter \`${event}\` must be an Array, not ${is_1.default(options.hooks[event])}`);
            }
          } else {
            options.hooks[event] = [];
          }
        }
      } else {
        throw new TypeError(`Parameter \`hooks\` must be an Object, not ${is_1.default(options.hooks)}`);
      }
      if (defaults2) {
        for (const event of known_hook_events_1.default) {
          if (!(Reflect.has(options.hooks, event) && is_1.default.undefined(options.hooks[event]))) {
            options.hooks[event] = [
              ...defaults2.hooks[event],
              ...options.hooks[event]
            ];
          }
        }
      }
      if (is_1.default.number(options.timeout)) {
        options.timeout = { request: options.timeout };
      } else if (!is_1.default.object(options.timeout)) {
        options.timeout = {};
      }
      const { retry: retry2 } = options;
      if (defaults2) {
        options.retry = __spreadValues({}, defaults2.retry);
      } else {
        options.retry = {
          calculateDelay: (retryObject) => retryObject.computedValue,
          limit: 0,
          methods: [],
          statusCodes: [],
          errorCodes: [],
          maxRetryAfter: void 0
        };
      }
      if (is_1.default.object(retry2)) {
        options.retry = __spreadValues(__spreadValues({}, options.retry), retry2);
      } else if (is_1.default.number(retry2)) {
        options.retry.limit = retry2;
      }
      if (options.retry.maxRetryAfter === void 0) {
        options.retry.maxRetryAfter = Math.min(...[options.timeout.request, options.timeout.connect].filter((n) => !is_1.default.nullOrUndefined(n)));
      }
      options.retry.methods = [...new Set(options.retry.methods.map((method) => method.toUpperCase()))];
      options.retry.statusCodes = [...new Set(options.retry.statusCodes)];
      options.retry.errorCodes = [...new Set(options.retry.errorCodes)];
      if (options.dnsCache && !(options.dnsCache instanceof cacheable_lookup_1.default)) {
        options.dnsCache = new cacheable_lookup_1.default({ cacheAdapter: options.dnsCache });
      }
      if (is_1.default.string(options.method)) {
        options.method = options.method.toUpperCase();
      } else {
        options.method = (_b = (_a4 = defaults2) === null || _a4 === void 0 ? void 0 : _a4.method, _b !== null && _b !== void 0 ? _b : "GET");
      }
      if (options.cache) {
        options.cacheableRequest = new CacheableRequest((requestOptions, handler2) => requestOptions[types_1.requestSymbol](requestOptions, handler2), options.cache);
      }
      if (is_1.default.object(options.cookieJar)) {
        let { setCookie: setCookie2, getCookieString } = options.cookieJar;
        if (setCookie2.length === 4 && getCookieString.length === 0) {
          if (!Reflect.has(setCookie2, util_1.promisify.custom)) {
            setCookie2 = util_1.promisify(setCookie2.bind(options.cookieJar));
            getCookieString = util_1.promisify(getCookieString.bind(options.cookieJar));
          }
        } else if (setCookie2.length !== 2) {
          throw new TypeError("`options.cookieJar.setCookie` needs to be an async function with 2 arguments");
        } else if (getCookieString.length !== 1) {
          throw new TypeError("`options.cookieJar.getCookieString` needs to be an async function with 1 argument");
        }
        options.cookieJar = { setCookie: setCookie2, getCookieString };
      }
      if (is_1.default.null_(options.encoding)) {
        throw new TypeError("To get a Buffer, set `options.responseType` to `buffer` instead");
      }
      if (!Reflect.has(options, "maxRedirects") && !(defaults2 && Reflect.has(defaults2, "maxRedirects"))) {
        options.maxRedirects = 0;
      }
      if (defaults2) {
        options = merge_1.default({}, defaults2, options);
      }
      if (is_1.default.object(options._pagination)) {
        const { _pagination: pagination } = options;
        if (!is_1.default.function_(pagination.transform)) {
          throw new TypeError("`options._pagination.transform` must be implemented");
        }
        if (!is_1.default.function_(pagination.shouldContinue)) {
          throw new TypeError("`options._pagination.shouldContinue` must be implemented");
        }
        if (!is_1.default.function_(pagination.filter)) {
          throw new TypeError("`options._pagination.filter` must be implemented");
        }
        if (!is_1.default.function_(pagination.paginate)) {
          throw new TypeError("`options._pagination.paginate` must be implemented");
        }
      }
      options.decompress = Boolean(options.decompress);
      options.isStream = Boolean(options.isStream);
      options.throwHttpErrors = Boolean(options.throwHttpErrors);
      options.ignoreInvalidCookies = Boolean(options.ignoreInvalidCookies);
      options.cache = (_c = options.cache, _c !== null && _c !== void 0 ? _c : false);
      options.responseType = (_d2 = options.responseType, _d2 !== null && _d2 !== void 0 ? _d2 : "text");
      options.resolveBodyOnly = Boolean(options.resolveBodyOnly);
      options.followRedirect = Boolean(options.followRedirect);
      options.dnsCache = (_e = options.dnsCache, _e !== null && _e !== void 0 ? _e : false);
      options.useElectronNet = Boolean(options.useElectronNet);
      options.methodRewriting = Boolean(options.methodRewriting);
      options.allowGetBody = Boolean(options.allowGetBody);
      options.context = (_f = options.context, _f !== null && _f !== void 0 ? _f : {});
      return options;
    };
    exports.mergeOptions = (...sources) => {
      let mergedOptions = exports.preNormalizeArguments({});
      const properties = {};
      for (const source of sources) {
        mergedOptions = exports.preNormalizeArguments(merge_1.default({}, source), mergedOptions);
        for (const name of nonEnumerableProperties) {
          if (!Reflect.has(source, name)) {
            continue;
          }
          properties[name] = {
            writable: true,
            configurable: true,
            enumerable: false,
            value: source[name]
          };
        }
      }
      Object.defineProperties(mergedOptions, properties);
      return mergedOptions;
    };
    exports.normalizeArguments = (url, options, defaults2) => {
      var _a4, _b, _c, _d2, _e, _f, _g, _h, _j, _k;
      if (typeof url === "undefined") {
        throw new TypeError("Missing `url` argument");
      }
      const runInitHooks = (hooks, options2) => {
        if (hooks && options2) {
          for (const hook of hooks) {
            const result = hook(options2);
            if (is_1.default.promise(result)) {
              throw new TypeError("The `init` hook must be a synchronous function");
            }
          }
        }
      };
      const hasUrl = is_1.default.urlInstance(url) || is_1.default.string(url);
      if (hasUrl) {
        if (options) {
          if (Reflect.has(options, "url")) {
            throw new TypeError("The `url` option cannot be used if the input is a valid URL.");
          }
        } else {
          options = {};
        }
        options.url = url;
        runInitHooks((_a4 = defaults2) === null || _a4 === void 0 ? void 0 : _a4.options.hooks.init, options);
        runInitHooks((_b = options.hooks) === null || _b === void 0 ? void 0 : _b.init, options);
      } else if (Reflect.has(url, "resolve")) {
        throw new Error("The legacy `url.Url` is deprecated. Use `URL` instead.");
      } else {
        runInitHooks((_c = defaults2) === null || _c === void 0 ? void 0 : _c.options.hooks.init, url);
        runInitHooks((_d2 = url.hooks) === null || _d2 === void 0 ? void 0 : _d2.init, url);
        if (options) {
          runInitHooks((_e = defaults2) === null || _e === void 0 ? void 0 : _e.options.hooks.init, options);
          runInitHooks((_f = options.hooks) === null || _f === void 0 ? void 0 : _f.init, options);
        }
      }
      if (hasUrl) {
        options = exports.mergeOptions((_h = (_g = defaults2) === null || _g === void 0 ? void 0 : _g.options, _h !== null && _h !== void 0 ? _h : {}), options !== null && options !== void 0 ? options : {});
      } else {
        options = exports.mergeOptions((_k = (_j = defaults2) === null || _j === void 0 ? void 0 : _j.options, _k !== null && _k !== void 0 ? _k : {}), url, options !== null && options !== void 0 ? options : {});
      }
      if (is_1.default.string(options.url)) {
        options.url = options.prefixUrl + options.url;
        options.url = options.url.replace(/^unix:/, "http://$&");
        if (options.searchParams || options.search) {
          options.url = options.url.split("?")[0];
        }
        options.url = options_to_url_1.default(__spreadValues({
          origin: options.url
        }, options));
      } else if (!is_1.default.urlInstance(options.url)) {
        options.url = options_to_url_1.default(__spreadValues({ origin: options.prefixUrl }, options));
      }
      const normalizedOptions = options;
      let prefixUrl = options.prefixUrl;
      Object.defineProperty(normalizedOptions, "prefixUrl", {
        set: (value) => {
          if (!normalizedOptions.url.href.startsWith(value)) {
            throw new Error(`Cannot change \`prefixUrl\` from ${prefixUrl} to ${value}: ${normalizedOptions.url.href}`);
          }
          normalizedOptions.url = new url_1.URL(value + normalizedOptions.url.href.slice(prefixUrl.length));
          prefixUrl = value;
        },
        get: () => prefixUrl
      });
      for (const [key2, value] of Object.entries(normalizedOptions.headers)) {
        if (is_1.default.undefined(value)) {
          delete normalizedOptions.headers[key2];
        }
      }
      return normalizedOptions;
    };
    var withoutBody = /* @__PURE__ */ new Set(["HEAD"]);
    var withoutBodyUnlessSpecified = "GET";
    exports.normalizeRequestArguments = async (options) => {
      var _a4, _b, _c;
      options = exports.mergeOptions(options);
      const { headers } = options;
      const hasNoContentType = is_1.default.undefined(headers["content-type"]);
      {
        const isForm = !is_1.default.undefined(options.form);
        const isJson = !is_1.default.undefined(options.json);
        const isBody = !is_1.default.undefined(options.body);
        if ((isBody || isForm || isJson) && withoutBody.has(options.method)) {
          throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        }
        if (!options.allowGetBody && (isBody || isForm || isJson) && withoutBodyUnlessSpecified === options.method) {
          throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        }
        if ([isBody, isForm, isJson].filter((isTrue) => isTrue).length > 1) {
          throw new TypeError("The `body`, `json` and `form` options are mutually exclusive");
        }
        if (isBody && !is_1.default.nodeStream(options.body) && !is_1.default.string(options.body) && !is_1.default.buffer(options.body) && !(is_1.default.object(options.body) && is_form_data_1.default(options.body))) {
          throw new TypeError("The `body` option must be a stream.Readable, string or Buffer");
        }
        if (isForm && !is_1.default.object(options.form)) {
          throw new TypeError("The `form` option must be an Object");
        }
      }
      if (options.body) {
        if (is_1.default.object(options.body) && is_form_data_1.default(options.body) && hasNoContentType) {
          headers["content-type"] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
        }
      } else if (options.form) {
        if (hasNoContentType) {
          headers["content-type"] = "application/x-www-form-urlencoded";
        }
        options.body = new url_1.URLSearchParams(options.form).toString();
      } else if (options.json) {
        if (hasNoContentType) {
          headers["content-type"] = "application/json";
        }
        options.body = JSON.stringify(options.json);
      }
      const uploadBodySize = await get_body_size_1.default(options);
      if (!is_1.default.nodeStream(options.body)) {
        options.body = toReadableStream(options.body);
      }
      if (is_1.default.undefined(headers["content-length"]) && is_1.default.undefined(headers["transfer-encoding"])) {
        if ((options.method === "POST" || options.method === "PUT" || options.method === "PATCH" || options.method === "DELETE" || options.allowGetBody && options.method === "GET") && !is_1.default.undefined(uploadBodySize)) {
          headers["content-length"] = String(uploadBodySize);
        }
      }
      if (!options.isStream && options.responseType === "json" && is_1.default.undefined(headers.accept)) {
        headers.accept = "application/json";
      }
      if (options.decompress && is_1.default.undefined(headers["accept-encoding"])) {
        headers["accept-encoding"] = supports_brotli_1.default ? "gzip, deflate, br" : "gzip, deflate";
      }
      if (options.url.protocol !== "http:" && options.url.protocol !== "https:") {
        throw new errors_1.UnsupportedProtocolError(options);
      }
      decodeURI(options.url.toString());
      if (is_1.default.function_(options.request)) {
        options[types_1.requestSymbol] = options.request;
        delete options.request;
      } else {
        options[types_1.requestSymbol] = options.url.protocol === "https:" ? https2.request : http2.request;
      }
      if (options.url.hostname === "unix") {
        const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(options.url.pathname);
        if ((_a4 = matches) === null || _a4 === void 0 ? void 0 : _a4.groups) {
          const { socketPath, path } = matches.groups;
          options = __spreadProps(__spreadValues({}, options), {
            socketPath,
            path,
            host: ""
          });
        }
      }
      if (isAgentByProtocol(options.agent)) {
        options.agent = (_b = options.agent[options.url.protocol.slice(0, -1)], _b !== null && _b !== void 0 ? _b : options.agent);
      }
      if (options.dnsCache) {
        options.lookup = options.dnsCache.lookup;
      }
      if (options.useElectronNet && process.versions.electron) {
        const electron = dynamic_require_1.default(module2, "electron");
        options.request = util_1.deprecate((_c = electron.net.request, _c !== null && _c !== void 0 ? _c : electron.remote.net.request), "Electron support has been deprecated and will be removed in Got 11.\nSee https://github.com/sindresorhus/got/issues/899 for further information.", "GOT_ELECTRON");
      }
      delete options.timeout;
      if (options.cookieJar) {
        const cookieString = await options.cookieJar.getCookieString(options.url.toString());
        if (is_1.default.nonEmptyString(cookieString)) {
          options.headers.cookie = cookieString;
        } else {
          delete options.headers.cookie;
        }
      }
      delete options.url;
      return options;
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/defer-to-connect/dist/source/index.js
var require_source = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/defer-to-connect/dist/source/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isTLSSocket(socket) {
      return socket.encrypted;
    }
    var deferToConnect = (socket, fn) => {
      let listeners;
      if (typeof fn === "function") {
        const connect = fn;
        listeners = { connect };
      } else {
        listeners = fn;
      }
      const hasConnectListener = typeof listeners.connect === "function";
      const hasSecureConnectListener = typeof listeners.secureConnect === "function";
      const hasCloseListener = typeof listeners.close === "function";
      const onConnect = () => {
        if (hasConnectListener) {
          listeners.connect();
        }
        if (isTLSSocket(socket) && hasSecureConnectListener) {
          if (socket.authorized) {
            listeners.secureConnect();
          } else if (!socket.authorizationError) {
            socket.once("secureConnect", listeners.secureConnect);
          }
        }
        if (hasCloseListener) {
          socket.once("close", listeners.close);
        }
      };
      if (socket.writable && !socket.connecting) {
        onConnect();
      } else if (socket.connecting) {
        socket.once("connect", onConnect);
      } else if (socket.destroyed && hasCloseListener) {
        listeners.close(socket._hadError);
      }
    };
    exports.default = deferToConnect;
    module2.exports = deferToConnect;
    module2.exports.default = deferToConnect;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/@szmarczak/http-timer/dist/source/index.js
var require_source2 = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/@szmarczak/http-timer/dist/source/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defer_to_connect_1 = require_source();
    var util_1 = require("util");
    var nodejsMajorVersion = Number(process.versions.node.split(".")[0]);
    var timer = (request) => {
      if (request.timings) {
        return request.timings;
      }
      const timings = {
        start: Date.now(),
        socket: void 0,
        lookup: void 0,
        connect: void 0,
        secureConnect: void 0,
        upload: void 0,
        response: void 0,
        end: void 0,
        error: void 0,
        abort: void 0,
        phases: {
          wait: void 0,
          dns: void 0,
          tcp: void 0,
          tls: void 0,
          request: void 0,
          firstByte: void 0,
          download: void 0,
          total: void 0
        }
      };
      request.timings = timings;
      const handleError = (origin) => {
        const emit = origin.emit.bind(origin);
        origin.emit = (event, ...args) => {
          if (event === "error") {
            timings.error = Date.now();
            timings.phases.total = timings.error - timings.start;
            origin.emit = emit;
          }
          return emit(event, ...args);
        };
      };
      handleError(request);
      const onAbort = () => {
        timings.abort = Date.now();
        if (!timings.response || nodejsMajorVersion >= 13) {
          timings.phases.total = Date.now() - timings.start;
        }
      };
      request.prependOnceListener("abort", onAbort);
      const onSocket = (socket) => {
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        if (util_1.types.isProxy(socket)) {
          return;
        }
        const lookupListener = () => {
          timings.lookup = Date.now();
          timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener("lookup", lookupListener);
        defer_to_connect_1.default(socket, {
          connect: () => {
            timings.connect = Date.now();
            if (timings.lookup === void 0) {
              socket.removeListener("lookup", lookupListener);
              timings.lookup = timings.connect;
              timings.phases.dns = timings.lookup - timings.socket;
            }
            timings.phases.tcp = timings.connect - timings.lookup;
          },
          secureConnect: () => {
            timings.secureConnect = Date.now();
            timings.phases.tls = timings.secureConnect - timings.connect;
          }
        });
      };
      if (request.socket) {
        onSocket(request.socket);
      } else {
        request.prependOnceListener("socket", onSocket);
      }
      const onUpload = () => {
        var _a4;
        timings.upload = Date.now();
        timings.phases.request = timings.upload - ((_a4 = timings.secureConnect) !== null && _a4 !== void 0 ? _a4 : timings.connect);
      };
      const writableFinished = () => {
        if (typeof request.writableFinished === "boolean") {
          return request.writableFinished;
        }
        return request.finished && request.outputSize === 0 && (!request.socket || request.socket.writableLength === 0);
      };
      if (writableFinished()) {
        onUpload();
      } else {
        request.prependOnceListener("finish", onUpload);
      }
      request.prependOnceListener("response", (response) => {
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener("end", () => {
          timings.end = Date.now();
          timings.phases.download = timings.end - timings.response;
          timings.phases.total = timings.end - timings.start;
        });
        response.prependOnceListener("aborted", onAbort);
      });
      return timings;
    };
    exports.default = timer;
    module2.exports = timer;
    module2.exports.default = timer;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/calculate-retry-delay.js
var require_calculate_retry_delay = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/calculate-retry-delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_1 = require_dist();
    var errors_1 = require_errors();
    var retryAfterStatusCodes = /* @__PURE__ */ new Set([413, 429, 503]);
    var isErrorWithResponse = (error3) => error3 instanceof errors_1.HTTPError || error3 instanceof errors_1.ParseError || error3 instanceof errors_1.MaxRedirectsError;
    var calculateRetryDelay = ({ attemptCount, retryOptions, error: error3 }) => {
      if (attemptCount > retryOptions.limit) {
        return 0;
      }
      const hasMethod = retryOptions.methods.includes(error3.options.method);
      const hasErrorCode = Reflect.has(error3, "code") && retryOptions.errorCodes.includes(error3.code);
      const hasStatusCode = isErrorWithResponse(error3) && retryOptions.statusCodes.includes(error3.response.statusCode);
      if (!hasMethod || !hasErrorCode && !hasStatusCode) {
        return 0;
      }
      if (isErrorWithResponse(error3)) {
        const { response } = error3;
        if (response && Reflect.has(response.headers, "retry-after") && retryAfterStatusCodes.has(response.statusCode)) {
          let after = Number(response.headers["retry-after"]);
          if (is_1.default.nan(after)) {
            after = Date.parse(response.headers["retry-after"]) - Date.now();
          } else {
            after *= 1e3;
          }
          if (after > retryOptions.maxRetryAfter) {
            return 0;
          }
          return after;
        }
        if (response.statusCode === 413) {
          return 0;
        }
      }
      const noise = Math.random() * 100;
      return 2 ** (attemptCount - 1) * 1e3 + noise;
    };
    exports.default = calculateRetryDelay;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/mimic-response/index.js
var require_mimic_response2 = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/mimic-response/index.js"(exports, module2) {
    "use strict";
    var knownProperties = [
      "aborted",
      "complete",
      "destroy",
      "headers",
      "httpVersion",
      "httpVersionMinor",
      "httpVersionMajor",
      "method",
      "rawHeaders",
      "rawTrailers",
      "setTimeout",
      "socket",
      "statusCode",
      "statusMessage",
      "trailers",
      "url"
    ];
    module2.exports = (fromStream, toStream) => {
      const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));
      for (const property of fromProperties) {
        if (property in toStream) {
          continue;
        }
        toStream[property] = typeof fromStream[property] === "function" ? fromStream[property].bind(fromStream) : fromStream[property];
      }
      return toStream;
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/decompress-response/index.js
var require_decompress_response = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/decompress-response/index.js"(exports, module2) {
    "use strict";
    var {
      pipeline: streamPipeline,
      PassThrough: PassThroughStream
    } = require("stream");
    var zlib2 = require("zlib");
    var mimicResponse = require_mimic_response2();
    var decompressResponse = (response) => {
      const contentEncoding = (response.headers["content-encoding"] || "").toLowerCase();
      if (!["gzip", "deflate", "br"].includes(contentEncoding)) {
        return response;
      }
      const isBrotli = contentEncoding === "br";
      if (isBrotli && typeof zlib2.createBrotliDecompress !== "function") {
        return response;
      }
      const decompress = isBrotli ? zlib2.createBrotliDecompress() : zlib2.createUnzip();
      const stream = new PassThroughStream();
      decompress.on("error", (error3) => {
        if (error3.code === "Z_BUF_ERROR") {
          stream.end();
          return;
        }
        stream.emit("error", error3);
      });
      const finalStream = streamPipeline(response, decompress, stream, () => {
      });
      mimicResponse(response, finalStream);
      return finalStream;
    };
    module2.exports = decompressResponse;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/progress.js
var require_progress = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/progress.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stream_1 = require("stream");
    var is_1 = require_dist();
    function createProgressStream(name, emitter, totalBytes) {
      let transformedBytes = 0;
      if (is_1.default.string(totalBytes)) {
        totalBytes = Number(totalBytes);
      }
      const progressStream = new stream_1.Transform({
        transform(chunk, _encoding, callback) {
          transformedBytes += chunk.length;
          const percent = totalBytes ? transformedBytes / totalBytes : 0;
          if (percent < 1) {
            emitter.emit(name, {
              percent,
              transferred: transformedBytes,
              total: totalBytes
            });
          }
          callback(void 0, chunk);
        },
        flush(callback) {
          emitter.emit(name, {
            percent: 1,
            transferred: transformedBytes,
            total: totalBytes
          });
          callback();
        }
      });
      emitter.emit(name, {
        percent: 0,
        transferred: 0,
        total: totalBytes
      });
      return progressStream;
    }
    exports.createProgressStream = createProgressStream;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/get-response.js
var require_get_response = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/get-response.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var decompressResponse = require_decompress_response();
    var mimicResponse = require_mimic_response2();
    var stream = require("stream");
    var util_1 = require("util");
    var progress_1 = require_progress();
    var pipeline2 = util_1.promisify(stream.pipeline);
    exports.default = async (response, options, emitter) => {
      var _a4;
      const downloadBodySize = Number(response.headers["content-length"]) || void 0;
      const progressStream = progress_1.createProgressStream("downloadProgress", emitter, downloadBodySize);
      mimicResponse(response, progressStream);
      const newResponse = options.decompress && options.method !== "HEAD" ? decompressResponse(progressStream) : progressStream;
      if (!options.decompress && ["gzip", "deflate", "br"].includes((_a4 = newResponse.headers["content-encoding"], _a4 !== null && _a4 !== void 0 ? _a4 : ""))) {
        options.responseType = "buffer";
      }
      emitter.emit("response", newResponse);
      return pipeline2(response, progressStream).catch((error3) => {
        if (error3.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          throw error3;
        }
      });
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/unhandle.js
var require_unhandle = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/unhandle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = () => {
      const handlers = [];
      return {
        once(origin, event, fn) {
          origin.once(event, fn);
          handlers.push({ origin, event, fn });
        },
        unhandleAll() {
          for (const handler2 of handlers) {
            const { origin, event, fn } = handler2;
            origin.removeListener(event, fn);
          }
          handlers.length = 0;
        }
      };
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/timed-out.js
var require_timed_out = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/timed-out.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var net = require("net");
    var unhandle_1 = require_unhandle();
    var reentry = Symbol("reentry");
    var noop4 = () => {
    };
    var TimeoutError = class extends Error {
      constructor(threshold, event) {
        super(`Timeout awaiting '${event}' for ${threshold}ms`);
        this.event = event;
        this.name = "TimeoutError";
        this.code = "ETIMEDOUT";
      }
    };
    exports.TimeoutError = TimeoutError;
    exports.default = (request, delays, options) => {
      if (Reflect.has(request, reentry)) {
        return noop4;
      }
      request[reentry] = true;
      const cancelers = [];
      const { once, unhandleAll } = unhandle_1.default();
      const addTimeout = (delay, callback, event) => {
        var _a4, _b;
        const timeout = setTimeout(callback, delay, delay, event);
        (_b = (_a4 = timeout).unref) === null || _b === void 0 ? void 0 : _b.call(_a4);
        const cancel = () => {
          clearTimeout(timeout);
        };
        cancelers.push(cancel);
        return cancel;
      };
      const { host, hostname } = options;
      const timeoutHandler = (delay, event) => {
        if (request.socket) {
          request.socket._hadError = true;
        }
        request.abort();
        request.emit("error", new TimeoutError(delay, event));
      };
      const cancelTimeouts = () => {
        for (const cancel of cancelers) {
          cancel();
        }
        unhandleAll();
      };
      request.once("error", (error3) => {
        cancelTimeouts();
        if (request.listenerCount("error") === 0) {
          throw error3;
        }
      });
      request.once("abort", cancelTimeouts);
      once(request, "response", (response) => {
        once(response, "end", cancelTimeouts);
      });
      if (typeof delays.request !== "undefined") {
        addTimeout(delays.request, timeoutHandler, "request");
      }
      if (typeof delays.socket !== "undefined") {
        const socketTimeoutHandler = () => {
          timeoutHandler(delays.socket, "socket");
        };
        request.setTimeout(delays.socket, socketTimeoutHandler);
        cancelers.push(() => {
          request.removeListener("timeout", socketTimeoutHandler);
        });
      }
      once(request, "socket", (socket) => {
        var _a4;
        const { socketPath } = request;
        if (socket.connecting) {
          const hasPath = Boolean(socketPath !== null && socketPath !== void 0 ? socketPath : net.isIP((_a4 = hostname !== null && hostname !== void 0 ? hostname : host, _a4 !== null && _a4 !== void 0 ? _a4 : "")) !== 0);
          if (typeof delays.lookup !== "undefined" && !hasPath && typeof socket.address().address === "undefined") {
            const cancelTimeout = addTimeout(delays.lookup, timeoutHandler, "lookup");
            once(socket, "lookup", cancelTimeout);
          }
          if (typeof delays.connect !== "undefined") {
            const timeConnect = () => addTimeout(delays.connect, timeoutHandler, "connect");
            if (hasPath) {
              once(socket, "connect", timeConnect());
            } else {
              once(socket, "lookup", (error3) => {
                if (error3 === null) {
                  once(socket, "connect", timeConnect());
                }
              });
            }
          }
          if (typeof delays.secureConnect !== "undefined" && options.protocol === "https:") {
            once(socket, "connect", () => {
              const cancelTimeout = addTimeout(delays.secureConnect, timeoutHandler, "secureConnect");
              once(socket, "secureConnect", cancelTimeout);
            });
          }
        }
        if (typeof delays.send !== "undefined") {
          const timeRequest = () => addTimeout(delays.send, timeoutHandler, "send");
          if (socket.connecting) {
            once(socket, "connect", () => {
              once(request, "upload-complete", timeRequest());
            });
          } else {
            once(request, "upload-complete", timeRequest());
          }
        }
      });
      if (typeof delays.response !== "undefined") {
        once(request, "upload-complete", () => {
          const cancelTimeout = addTimeout(delays.response, timeoutHandler, "response");
          once(request, "response", cancelTimeout);
        });
      }
      return cancelTimeouts;
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/url-to-options.js
var require_url_to_options = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/url-to-options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_1 = require_dist();
    exports.default = (url) => {
      url = url;
      const options = {
        protocol: url.protocol,
        hostname: is_1.default.string(url.hostname) && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ""}${url.search || ""}`
      };
      if (is_1.default.string(url.port) && url.port.length !== 0) {
        options.port = Number(url.port);
      }
      if (url.username || url.password) {
        options.auth = `${url.username || ""}:${url.password || ""}`;
      }
      return options;
    };
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then((val) => new Promise((resolve2) => {
        resolve2(onFinally());
      }).then(() => val), (err) => new Promise((resolve2) => {
        resolve2(onFinally());
      }).then(() => {
        throw err;
      }));
    };
  }
});

// node_modules/p-timeout/index.js
var require_p_timeout = __commonJS({
  "node_modules/p-timeout/index.js"(exports, module2) {
    "use strict";
    var pFinally = require_p_finally();
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    };
    var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve2, reject) => {
      if (typeof milliseconds !== "number" || milliseconds < 0) {
        throw new TypeError("Expected `milliseconds` to be a positive number");
      }
      if (milliseconds === Infinity) {
        resolve2(promise);
        return;
      }
      const timer = setTimeout(() => {
        if (typeof fallback === "function") {
          try {
            resolve2(fallback());
          } catch (error3) {
            reject(error3);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      pFinally(promise.then(resolve2, reject), () => {
        clearTimeout(timer);
      });
    });
    module2.exports = pTimeout;
    module2.exports.default = pTimeout;
    module2.exports.TimeoutError = TimeoutError;
  }
});

// node_modules/p-event/index.js
var require_p_event = __commonJS({
  "node_modules/p-event/index.js"(exports, module2) {
    "use strict";
    var pTimeout = require_p_timeout();
    var symbolAsyncIterator = Symbol.asyncIterator || "@@asyncIterator";
    var normalizeEmitter = (emitter) => {
      const addListener = emitter.on || emitter.addListener || emitter.addEventListener;
      const removeListener = emitter.off || emitter.removeListener || emitter.removeEventListener;
      if (!addListener || !removeListener) {
        throw new TypeError("Emitter is not compatible");
      }
      return {
        addListener: addListener.bind(emitter),
        removeListener: removeListener.bind(emitter)
      };
    };
    var toArray = (value) => Array.isArray(value) ? value : [value];
    var multiple = (emitter, event, options) => {
      let cancel;
      const ret = new Promise((resolve2, reject) => {
        options = __spreadValues({
          rejectionEvents: ["error"],
          multiArgs: false,
          resolveImmediately: false
        }, options);
        if (!(options.count >= 0 && (options.count === Infinity || Number.isInteger(options.count)))) {
          throw new TypeError("The `count` option should be at least 0 or more");
        }
        const events = toArray(event);
        const items = [];
        const { addListener, removeListener } = normalizeEmitter(emitter);
        const onItem = (...args) => {
          const value = options.multiArgs ? args : args[0];
          if (options.filter && !options.filter(value)) {
            return;
          }
          items.push(value);
          if (options.count === items.length) {
            cancel();
            resolve2(items);
          }
        };
        const rejectHandler = (error3) => {
          cancel();
          reject(error3);
        };
        cancel = () => {
          for (const event2 of events) {
            removeListener(event2, onItem);
          }
          for (const rejectionEvent of options.rejectionEvents) {
            removeListener(rejectionEvent, rejectHandler);
          }
        };
        for (const event2 of events) {
          addListener(event2, onItem);
        }
        for (const rejectionEvent of options.rejectionEvents) {
          addListener(rejectionEvent, rejectHandler);
        }
        if (options.resolveImmediately) {
          resolve2(items);
        }
      });
      ret.cancel = cancel;
      if (typeof options.timeout === "number") {
        const timeout = pTimeout(ret, options.timeout);
        timeout.cancel = cancel;
        return timeout;
      }
      return ret;
    };
    var pEvent = (emitter, event, options) => {
      if (typeof options === "function") {
        options = { filter: options };
      }
      options = __spreadProps(__spreadValues({}, options), {
        count: 1,
        resolveImmediately: false
      });
      const arrayPromise = multiple(emitter, event, options);
      const promise = arrayPromise.then((array) => array[0]);
      promise.cancel = arrayPromise.cancel;
      return promise;
    };
    module2.exports = pEvent;
    module2.exports.default = pEvent;
    module2.exports.multiple = multiple;
    module2.exports.iterator = (emitter, event, options) => {
      if (typeof options === "function") {
        options = { filter: options };
      }
      const events = toArray(event);
      options = __spreadValues({
        rejectionEvents: ["error"],
        resolutionEvents: [],
        limit: Infinity,
        multiArgs: false
      }, options);
      const { limit } = options;
      const isValidLimit = limit >= 0 && (limit === Infinity || Number.isInteger(limit));
      if (!isValidLimit) {
        throw new TypeError("The `limit` option should be a non-negative integer or Infinity");
      }
      if (limit === 0) {
        return {
          [Symbol.asyncIterator]() {
            return this;
          },
          async next() {
            return {
              done: true,
              value: void 0
            };
          }
        };
      }
      const { addListener, removeListener } = normalizeEmitter(emitter);
      let isDone = false;
      let error3;
      let hasPendingError = false;
      const nextQueue = [];
      const valueQueue = [];
      let eventCount = 0;
      let isLimitReached = false;
      const valueHandler = (...args) => {
        eventCount++;
        isLimitReached = eventCount === limit;
        const value = options.multiArgs ? args : args[0];
        if (nextQueue.length > 0) {
          const { resolve: resolve2 } = nextQueue.shift();
          resolve2({ done: false, value });
          if (isLimitReached) {
            cancel();
          }
          return;
        }
        valueQueue.push(value);
        if (isLimitReached) {
          cancel();
        }
      };
      const cancel = () => {
        isDone = true;
        for (const event2 of events) {
          removeListener(event2, valueHandler);
        }
        for (const rejectionEvent of options.rejectionEvents) {
          removeListener(rejectionEvent, rejectHandler);
        }
        for (const resolutionEvent of options.resolutionEvents) {
          removeListener(resolutionEvent, resolveHandler);
        }
        while (nextQueue.length > 0) {
          const { resolve: resolve2 } = nextQueue.shift();
          resolve2({ done: true, value: void 0 });
        }
      };
      const rejectHandler = (...args) => {
        error3 = options.multiArgs ? args : args[0];
        if (nextQueue.length > 0) {
          const { reject } = nextQueue.shift();
          reject(error3);
        } else {
          hasPendingError = true;
        }
        cancel();
      };
      const resolveHandler = (...args) => {
        const value = options.multiArgs ? args : args[0];
        if (options.filter && !options.filter(value)) {
          return;
        }
        if (nextQueue.length > 0) {
          const { resolve: resolve2 } = nextQueue.shift();
          resolve2({ done: true, value });
        } else {
          valueQueue.push(value);
        }
        cancel();
      };
      for (const event2 of events) {
        addListener(event2, valueHandler);
      }
      for (const rejectionEvent of options.rejectionEvents) {
        addListener(rejectionEvent, rejectHandler);
      }
      for (const resolutionEvent of options.resolutionEvents) {
        addListener(resolutionEvent, resolveHandler);
      }
      return {
        [symbolAsyncIterator]() {
          return this;
        },
        async next() {
          if (valueQueue.length > 0) {
            const value = valueQueue.shift();
            return {
              done: isDone && valueQueue.length === 0 && !isLimitReached,
              value
            };
          }
          if (hasPendingError) {
            hasPendingError = false;
            throw error3;
          }
          if (isDone) {
            return {
              done: true,
              value: void 0
            };
          }
          return new Promise((resolve2, reject) => nextQueue.push({ resolve: resolve2, reject }));
        },
        async return(value) {
          cancel();
          return {
            done: isDone,
            value
          };
        }
      };
    };
    module2.exports.TimeoutError = pTimeout.TimeoutError;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/request-as-event-emitter.js
var require_request_as_event_emitter = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/request-as-event-emitter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = require("fs");
    var CacheableRequest = require_src5();
    var EventEmitter = require("events");
    var http2 = require("http");
    var stream = require("stream");
    var url_1 = require("url");
    var util_1 = require("util");
    var is_1 = require_dist();
    var http_timer_1 = require_source2();
    var calculate_retry_delay_1 = require_calculate_retry_delay();
    var errors_1 = require_errors();
    var get_response_1 = require_get_response();
    var normalize_arguments_1 = require_normalize_arguments();
    var progress_1 = require_progress();
    var timed_out_1 = require_timed_out();
    var types_1 = require_types();
    var url_to_options_1 = require_url_to_options();
    var pEvent = require_p_event();
    var setImmediateAsync = async () => new Promise((resolve2) => setImmediate(resolve2));
    var pipeline2 = util_1.promisify(stream.pipeline);
    var redirectCodes = /* @__PURE__ */ new Set([300, 301, 302, 303, 304, 307, 308]);
    exports.default = (options) => {
      const emitter = new EventEmitter();
      const requestUrl = options.url.toString();
      const redirects = [];
      let retryCount = 0;
      let currentRequest;
      const isAborted = () => typeof currentRequest.aborted === "number" || currentRequest.aborted;
      const emitError = async (error3) => {
        try {
          for (const hook of options.hooks.beforeError) {
            error3 = await hook(error3);
          }
          emitter.emit("error", error3);
        } catch (error_) {
          emitter.emit("error", error_);
        }
      };
      const get = async () => {
        let httpOptions = await normalize_arguments_1.normalizeRequestArguments(options);
        const handleResponse = async (response) => {
          var _a4;
          try {
            if (options.useElectronNet) {
              response = new Proxy(response, {
                get: (target, name) => {
                  if (name === "trailers" || name === "rawTrailers") {
                    return [];
                  }
                  const value = target[name];
                  return is_1.default.function_(value) ? value.bind(target) : value;
                }
              });
            }
            const typedResponse = response;
            const { statusCode } = typedResponse;
            typedResponse.statusMessage = is_1.default.nonEmptyString(typedResponse.statusMessage) ? typedResponse.statusMessage : http2.STATUS_CODES[statusCode];
            typedResponse.url = options.url.toString();
            typedResponse.requestUrl = requestUrl;
            typedResponse.retryCount = retryCount;
            typedResponse.redirectUrls = redirects;
            typedResponse.request = { options };
            typedResponse.isFromCache = (_a4 = typedResponse.fromCache, _a4 !== null && _a4 !== void 0 ? _a4 : false);
            delete typedResponse.fromCache;
            if (!typedResponse.isFromCache) {
              typedResponse.ip = response.socket.remoteAddress;
            }
            const rawCookies = typedResponse.headers["set-cookie"];
            if (Reflect.has(options, "cookieJar") && rawCookies) {
              let promises = rawCookies.map(async (rawCookie) => options.cookieJar.setCookie(rawCookie, typedResponse.url));
              if (options.ignoreInvalidCookies) {
                promises = promises.map(async (p) => p.catch(() => {
                }));
              }
              await Promise.all(promises);
            }
            if (options.followRedirect && Reflect.has(typedResponse.headers, "location") && redirectCodes.has(statusCode)) {
              typedResponse.resume();
              if (statusCode === 303 || options.methodRewriting === false) {
                if (options.method !== "GET" && options.method !== "HEAD") {
                  options.method = "GET";
                }
                if (Reflect.has(options, "body")) {
                  delete options.body;
                }
                if (Reflect.has(options, "json")) {
                  delete options.json;
                }
                if (Reflect.has(options, "form")) {
                  delete options.form;
                }
              }
              if (redirects.length >= options.maxRedirects) {
                throw new errors_1.MaxRedirectsError(typedResponse, options.maxRedirects, options);
              }
              const redirectBuffer = Buffer.from(typedResponse.headers.location, "binary").toString();
              const redirectUrl = new url_1.URL(redirectBuffer, options.url);
              if (redirectUrl.hostname !== options.url.hostname && Reflect.has(options.headers, "cookie")) {
                delete options.headers.cookie;
              }
              redirects.push(redirectUrl.toString());
              options.url = redirectUrl;
              for (const hook of options.hooks.beforeRedirect) {
                await hook(options, typedResponse);
              }
              emitter.emit("redirect", response, options);
              await get();
              return;
            }
            await get_response_1.default(typedResponse, options, emitter);
          } catch (error3) {
            emitError(error3);
          }
        };
        const handleRequest = async (request) => {
          let isPiped = false;
          let isFinished = false;
          request.once("finish", () => {
            isFinished = true;
          });
          currentRequest = request;
          const onError = (error3) => {
            if (error3 instanceof timed_out_1.TimeoutError) {
              error3 = new errors_1.TimeoutError(error3, request.timings, options);
            } else {
              error3 = new errors_1.RequestError(error3, options);
            }
            if (!emitter.retry(error3)) {
              emitError(error3);
            }
          };
          request.on("error", (error3) => {
            if (isPiped) {
              if (!isFinished) {
                return;
              }
              if (isAborted() && !(error3 instanceof timed_out_1.TimeoutError)) {
                return;
              }
            }
            onError(error3);
          });
          try {
            http_timer_1.default(request);
            timed_out_1.default(request, options.timeout, options.url);
            emitter.emit("request", request);
            const uploadStream = progress_1.createProgressStream("uploadProgress", emitter, httpOptions.headers["content-length"]);
            isPiped = true;
            await pipeline2(httpOptions.body, uploadStream, request);
            request.emit("upload-complete");
          } catch (error3) {
            if (isAborted() && error3.message === "Premature close") {
              return;
            }
            onError(error3);
          }
        };
        if (options.cache) {
          httpOptions = __spreadValues(__spreadValues({}, httpOptions), url_to_options_1.default(options.url));
          const cacheRequest = options.cacheableRequest(httpOptions, handleResponse);
          cacheRequest.once("error", (error3) => {
            if (error3 instanceof CacheableRequest.RequestError) {
              emitError(new errors_1.RequestError(error3, options));
            } else {
              emitError(new errors_1.CacheError(error3, options));
            }
          });
          cacheRequest.once("request", handleRequest);
        } else {
          try {
            handleRequest(httpOptions[types_1.requestSymbol](options.url, httpOptions, handleResponse));
          } catch (error3) {
            emitError(new errors_1.RequestError(error3, options));
          }
        }
      };
      emitter.retry = (error3) => {
        let backoff;
        retryCount++;
        try {
          backoff = options.retry.calculateDelay({
            attemptCount: retryCount,
            retryOptions: options.retry,
            error: error3,
            computedValue: calculate_retry_delay_1.default({
              attemptCount: retryCount,
              retryOptions: options.retry,
              error: error3,
              computedValue: 0
            })
          });
        } catch (error_) {
          emitError(error_);
          return false;
        }
        if (backoff) {
          const retry2 = async (options2) => {
            try {
              for (const hook of options2.hooks.beforeRetry) {
                await hook(options2, error3, retryCount);
              }
              await get();
            } catch (error_) {
              emitError(error_);
            }
          };
          setTimeout(retry2, backoff, __spreadProps(__spreadValues({}, options), { forceRefresh: true }));
          return true;
        }
        return false;
      };
      emitter.abort = () => {
        emitter.prependListener("request", (request) => {
          request.abort();
        });
        if (currentRequest) {
          currentRequest.abort();
        }
      };
      (async () => {
        try {
          if (options.body instanceof fs_1.ReadStream) {
            await pEvent(options.body, "open");
          }
          await setImmediateAsync();
          for (const hook of options.hooks.beforeRequest) {
            await hook(options);
          }
          await get();
        } catch (error3) {
          emitError(error3);
        }
      })();
      return emitter;
    };
    exports.proxyEvents = (proxy, emitter) => {
      const events = [
        "request",
        "redirect",
        "uploadProgress",
        "downloadProgress"
      ];
      for (const event of events) {
        emitter.on(event, (...args) => {
          proxy.emit(event, ...args);
        });
      }
    };
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/as-promise.js
var require_as_promise = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/as-promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventEmitter = require("events");
    var getStream = require_get_stream();
    var PCancelable = require_p_cancelable();
    var is_1 = require_dist();
    var errors_1 = require_errors();
    var normalize_arguments_1 = require_normalize_arguments();
    var request_as_event_emitter_1 = require_request_as_event_emitter();
    var parseBody = (body, responseType, encoding) => {
      if (responseType === "json") {
        return body.length === 0 ? "" : JSON.parse(body.toString());
      }
      if (responseType === "buffer") {
        return Buffer.from(body);
      }
      if (responseType === "text") {
        return body.toString(encoding);
      }
      throw new TypeError(`Unknown body type '${responseType}'`);
    };
    function createRejection(error3) {
      const promise = Promise.reject(error3);
      const returnPromise = () => promise;
      promise.json = returnPromise;
      promise.text = returnPromise;
      promise.buffer = returnPromise;
      promise.on = returnPromise;
      return promise;
    }
    exports.createRejection = createRejection;
    function asPromise(options) {
      const proxy = new EventEmitter();
      let body;
      const promise = new PCancelable((resolve2, reject, onCancel) => {
        const emitter = request_as_event_emitter_1.default(options);
        onCancel(emitter.abort);
        const emitError = async (error3) => {
          try {
            for (const hook of options.hooks.beforeError) {
              error3 = await hook(error3);
            }
            reject(error3);
          } catch (error_) {
            reject(error_);
          }
        };
        emitter.on("response", async (response) => {
          var _a4;
          proxy.emit("response", response);
          try {
            body = await getStream.buffer(response, { encoding: "binary" });
          } catch (error3) {
            emitError(new errors_1.ReadError(error3, options));
            return;
          }
          if ((_a4 = response.req) === null || _a4 === void 0 ? void 0 : _a4.aborted) {
            return;
          }
          const isOk = () => {
            const { statusCode } = response;
            const limitStatusCode = options.followRedirect ? 299 : 399;
            return statusCode >= 200 && statusCode <= limitStatusCode || statusCode === 304;
          };
          try {
            response.body = parseBody(body, options.responseType, options.encoding);
          } catch (error3) {
            response.body = body.toString();
            if (isOk()) {
              const parseError = new errors_1.ParseError(error3, response, options);
              emitError(parseError);
              return;
            }
          }
          try {
            for (const [index, hook] of options.hooks.afterResponse.entries()) {
              response = await hook(response, async (updatedOptions) => {
                const typedOptions = normalize_arguments_1.normalizeArguments(normalize_arguments_1.mergeOptions(options, __spreadProps(__spreadValues({}, updatedOptions), {
                  retry: {
                    calculateDelay: () => 0
                  },
                  throwHttpErrors: false,
                  resolveBodyOnly: false
                })));
                typedOptions.hooks.afterResponse = options.hooks.afterResponse.slice(0, index);
                for (const hook2 of options.hooks.beforeRetry) {
                  await hook2(typedOptions);
                }
                const promise2 = asPromise(typedOptions);
                onCancel(() => {
                  promise2.catch(() => {
                  });
                  promise2.cancel();
                });
                return promise2;
              });
            }
          } catch (error3) {
            emitError(error3);
            return;
          }
          if (!isOk()) {
            const error3 = new errors_1.HTTPError(response, options);
            if (emitter.retry(error3)) {
              return;
            }
            if (options.throwHttpErrors) {
              emitError(error3);
              return;
            }
          }
          resolve2(options.resolveBodyOnly ? response.body : response);
        });
        emitter.once("error", reject);
        request_as_event_emitter_1.proxyEvents(proxy, emitter);
      });
      promise.on = (name, fn) => {
        proxy.on(name, fn);
        return promise;
      };
      const shortcut = (responseType) => {
        const newPromise = promise.then(() => parseBody(body, responseType, options.encoding));
        Object.defineProperties(newPromise, Object.getOwnPropertyDescriptors(promise));
        return newPromise;
      };
      promise.json = () => {
        if (is_1.default.undefined(body) && is_1.default.undefined(options.headers.accept)) {
          options.headers.accept = "application/json";
        }
        return shortcut("json");
      };
      promise.buffer = () => shortcut("buffer");
      promise.text = () => shortcut("text");
      return promise;
    }
    exports.default = asPromise;
  }
});

// node_modules/duplexer3/index.js
var require_duplexer3 = __commonJS({
  "node_modules/duplexer3/index.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    function DuplexWrapper(options, writable3, readable3) {
      if (typeof readable3 === "undefined") {
        readable3 = writable3;
        writable3 = options;
        options = null;
      }
      stream.Duplex.call(this, options);
      if (typeof readable3.read !== "function") {
        readable3 = new stream.Readable(options).wrap(readable3);
      }
      this._writable = writable3;
      this._readable = readable3;
      this._waiting = false;
      var self2 = this;
      writable3.once("finish", function() {
        self2.end();
      });
      this.once("finish", function() {
        writable3.end();
      });
      readable3.on("readable", function() {
        if (self2._waiting) {
          self2._waiting = false;
          self2._read();
        }
      });
      readable3.once("end", function() {
        self2.push(null);
      });
      if (!options || typeof options.bubbleErrors === "undefined" || options.bubbleErrors) {
        writable3.on("error", function(err) {
          self2.emit("error", err);
        });
        readable3.on("error", function(err) {
          self2.emit("error", err);
        });
      }
    }
    DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, { constructor: { value: DuplexWrapper } });
    DuplexWrapper.prototype._write = function _write(input, encoding, done) {
      this._writable.write(input, encoding, done);
    };
    DuplexWrapper.prototype._read = function _read() {
      var buf;
      var reads = 0;
      while ((buf = this._readable.read()) !== null) {
        this.push(buf);
        reads++;
      }
      if (reads === 0) {
        this._waiting = true;
      }
    };
    module2.exports = function duplex2(options, writable3, readable3) {
      return new DuplexWrapper(options, writable3, readable3);
    };
    module2.exports.DuplexWrapper = DuplexWrapper;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/as-stream.js
var require_as_stream = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/as-stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var duplexer3 = require_duplexer3();
    var http_1 = require("http");
    var stream_1 = require("stream");
    var errors_1 = require_errors();
    var request_as_event_emitter_1 = require_request_as_event_emitter();
    var ProxyStream = class extends stream_1.Duplex {
    };
    exports.ProxyStream = ProxyStream;
    function asStream(options) {
      const input = new stream_1.PassThrough();
      const output = new stream_1.PassThrough();
      const proxy = duplexer3(input, output);
      const piped = /* @__PURE__ */ new Set();
      let isFinished = false;
      options.retry.calculateDelay = () => 0;
      if (options.body || options.json || options.form) {
        proxy.write = () => {
          proxy.destroy();
          throw new Error("Got's stream is not writable when the `body`, `json` or `form` option is used");
        };
      } else if (options.method === "POST" || options.method === "PUT" || options.method === "PATCH" || options.allowGetBody && options.method === "GET") {
        options.body = input;
      } else {
        proxy.write = () => {
          proxy.destroy();
          throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        };
      }
      const emitter = request_as_event_emitter_1.default(options);
      const emitError = async (error3) => {
        try {
          for (const hook of options.hooks.beforeError) {
            error3 = await hook(error3);
          }
          proxy.emit("error", error3);
        } catch (error_) {
          proxy.emit("error", error_);
        }
      };
      proxy._destroy = (error3, callback) => {
        callback(error3);
        emitter.abort();
      };
      emitter.on("response", (response) => {
        const { statusCode, isFromCache } = response;
        proxy.isFromCache = isFromCache;
        if (options.throwHttpErrors && statusCode !== 304 && (statusCode < 200 || statusCode > 299)) {
          emitError(new errors_1.HTTPError(response, options));
          return;
        }
        {
          const read2 = proxy._read;
          proxy._read = (...args) => {
            isFinished = true;
            proxy._read = read2;
            return read2.apply(proxy, args);
          };
        }
        if (options.encoding) {
          proxy.setEncoding(options.encoding);
        }
        response.pipe(output);
        response.once("error", (error3) => {
          emitError(new errors_1.ReadError(error3, options));
        });
        for (const destination of piped) {
          if (destination.headersSent) {
            continue;
          }
          for (const [key2, value] of Object.entries(response.headers)) {
            const isAllowed = options.decompress ? key2 !== "content-encoding" : true;
            if (isAllowed) {
              destination.setHeader(key2, value);
            }
          }
          destination.statusCode = response.statusCode;
        }
        proxy.emit("response", response);
      });
      request_as_event_emitter_1.proxyEvents(proxy, emitter);
      emitter.on("error", (error3) => proxy.emit("error", error3));
      const pipe = proxy.pipe.bind(proxy);
      const unpipe = proxy.unpipe.bind(proxy);
      proxy.pipe = (destination, options2) => {
        if (isFinished) {
          throw new Error("Failed to pipe. The response has been emitted already.");
        }
        pipe(destination, options2);
        if (destination instanceof http_1.ServerResponse) {
          piped.add(destination);
        }
        return destination;
      };
      proxy.unpipe = (stream) => {
        piped.delete(stream);
        return unpipe(stream);
      };
      proxy.on("pipe", (source) => {
        if (source instanceof http_1.IncomingMessage) {
          options.headers = __spreadValues(__spreadValues({}, source.headers), options.headers);
        }
      });
      proxy.isFromCache = void 0;
      return proxy;
    }
    exports.default = asStream;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/deep-freeze.js
var require_deep_freeze = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/utils/deep-freeze.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_1 = require_dist();
    function deepFreeze(object) {
      for (const value of Object.values(object)) {
        if (is_1.default.plainObject(value) || is_1.default.array(value)) {
          deepFreeze(value);
        }
      }
      return Object.freeze(object);
    }
    exports.default = deepFreeze;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/create.js
var require_create = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/create.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_1 = require_dist();
    var as_promise_1 = require_as_promise();
    var as_stream_1 = require_as_stream();
    var errors = require_errors();
    var normalize_arguments_1 = require_normalize_arguments();
    var deep_freeze_1 = require_deep_freeze();
    var getPromiseOrStream = (options) => options.isStream ? as_stream_1.default(options) : as_promise_1.default(options);
    var isGotInstance = (value) => Reflect.has(value, "defaults") && Reflect.has(value.defaults, "options");
    var aliases = [
      "get",
      "post",
      "put",
      "patch",
      "head",
      "delete"
    ];
    exports.defaultHandler = (options, next) => next(options);
    var create = (defaults2) => {
      defaults2._rawHandlers = defaults2.handlers;
      defaults2.handlers = defaults2.handlers.map((fn) => (options, next) => {
        let root;
        const result = fn(options, (newOptions) => {
          root = next(newOptions);
          return root;
        });
        if (result !== root && !options.isStream && root) {
          const typedResult = result;
          const { then: promiseThen, catch: promiseCatch, finally: promiseFianlly } = typedResult;
          Object.setPrototypeOf(typedResult, Object.getPrototypeOf(root));
          Object.defineProperties(typedResult, Object.getOwnPropertyDescriptors(root));
          typedResult.then = promiseThen;
          typedResult.catch = promiseCatch;
          typedResult.finally = promiseFianlly;
        }
        return result;
      });
      const got = (url, options) => {
        var _a4;
        let iteration = 0;
        const iterateHandlers = (newOptions) => {
          return defaults2.handlers[iteration++](newOptions, iteration === defaults2.handlers.length ? getPromiseOrStream : iterateHandlers);
        };
        try {
          return iterateHandlers(normalize_arguments_1.normalizeArguments(url, options, defaults2));
        } catch (error3) {
          if ((_a4 = options) === null || _a4 === void 0 ? void 0 : _a4.isStream) {
            throw error3;
          } else {
            return as_promise_1.createRejection(error3);
          }
        }
      };
      got.extend = (...instancesOrOptions) => {
        const optionsArray = [defaults2.options];
        let handlers = [...defaults2._rawHandlers];
        let isMutableDefaults;
        for (const value of instancesOrOptions) {
          if (isGotInstance(value)) {
            optionsArray.push(value.defaults.options);
            handlers.push(...value.defaults._rawHandlers);
            isMutableDefaults = value.defaults.mutableDefaults;
          } else {
            optionsArray.push(value);
            if (Reflect.has(value, "handlers")) {
              handlers.push(...value.handlers);
            }
            isMutableDefaults = value.mutableDefaults;
          }
        }
        handlers = handlers.filter((handler2) => handler2 !== exports.defaultHandler);
        if (handlers.length === 0) {
          handlers.push(exports.defaultHandler);
        }
        return create({
          options: normalize_arguments_1.mergeOptions(...optionsArray),
          handlers,
          mutableDefaults: Boolean(isMutableDefaults)
        });
      };
      got.stream = (url, options) => got(url, __spreadProps(__spreadValues({}, options), { isStream: true }));
      for (const method of aliases) {
        got[method] = (url, options) => got(url, __spreadProps(__spreadValues({}, options), { method }));
        got.stream[method] = (url, options) => got.stream(url, __spreadProps(__spreadValues({}, options), { method }));
      }
      got.paginate = async function* (url, options) {
        let normalizedOptions = normalize_arguments_1.normalizeArguments(url, options, defaults2);
        const pagination = normalizedOptions._pagination;
        if (!is_1.default.object(pagination)) {
          throw new Error("`options._pagination` must be implemented");
        }
        const all = [];
        while (true) {
          const result = await got(normalizedOptions);
          const parsed = await pagination.transform(result);
          const current = [];
          for (const item of parsed) {
            if (pagination.filter(item, all, current)) {
              if (!pagination.shouldContinue(item, all, current)) {
                return;
              }
              yield item;
              all.push(item);
              current.push(item);
              if (all.length === pagination.countLimit) {
                return;
              }
            }
          }
          const optionsToMerge = pagination.paginate(result, all, current);
          if (optionsToMerge === false) {
            return;
          }
          if (optionsToMerge !== void 0) {
            normalizedOptions = normalize_arguments_1.normalizeArguments(normalizedOptions, optionsToMerge);
          }
        }
      };
      got.paginate.all = async (url, options) => {
        const results = [];
        for await (const item of got.paginate(url, options)) {
          results.push(item);
        }
        return results;
      };
      Object.assign(got, __spreadProps(__spreadValues({}, errors), { mergeOptions: normalize_arguments_1.mergeOptions }));
      Object.defineProperty(got, "defaults", {
        value: defaults2.mutableDefaults ? defaults2 : deep_freeze_1.default(defaults2),
        writable: defaults2.mutableDefaults,
        configurable: defaults2.mutableDefaults,
        enumerable: true
      });
      return got;
    };
    exports.default = create;
  }
});

// node_modules/camunda-external-task-client-js/node_modules/got/dist/source/index.js
var require_source3 = __commonJS({
  "node_modules/camunda-external-task-client-js/node_modules/got/dist/source/index.js"(exports, module2) {
    "use strict";
    function __export2(m2) {
      for (var p in m2)
        if (!exports.hasOwnProperty(p))
          exports[p] = m2[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    var url_1 = require("url");
    var create_1 = require_create();
    var defaults2 = {
      options: {
        method: "GET",
        retry: {
          limit: 2,
          methods: [
            "GET",
            "PUT",
            "HEAD",
            "DELETE",
            "OPTIONS",
            "TRACE"
          ],
          statusCodes: [
            408,
            413,
            429,
            500,
            502,
            503,
            504,
            521,
            522,
            524
          ],
          errorCodes: [
            "ETIMEDOUT",
            "ECONNRESET",
            "EADDRINUSE",
            "ECONNREFUSED",
            "EPIPE",
            "ENOTFOUND",
            "ENETUNREACH",
            "EAI_AGAIN"
          ],
          maxRetryAfter: void 0,
          calculateDelay: ({ computedValue }) => computedValue
        },
        timeout: {},
        headers: {
          "user-agent": "got (https://github.com/sindresorhus/got)"
        },
        hooks: {
          init: [],
          beforeRequest: [],
          beforeRedirect: [],
          beforeRetry: [],
          beforeError: [],
          afterResponse: []
        },
        decompress: true,
        throwHttpErrors: true,
        followRedirect: true,
        isStream: false,
        cache: false,
        dnsCache: false,
        useElectronNet: false,
        responseType: "text",
        resolveBodyOnly: false,
        maxRedirects: 10,
        prefixUrl: "",
        methodRewriting: true,
        allowGetBody: false,
        ignoreInvalidCookies: false,
        context: {},
        _pagination: {
          transform: (response) => {
            if (response.request.options.responseType === "json") {
              return response.body;
            }
            return JSON.parse(response.body);
          },
          paginate: (response) => {
            if (!Reflect.has(response.headers, "link")) {
              return false;
            }
            const items = response.headers.link.split(",");
            let next;
            for (const item of items) {
              const parsed = item.split(";");
              if (parsed[1].includes("next")) {
                next = parsed[0].trimStart().trim();
                next = next.slice(1, -1);
                break;
              }
            }
            if (next) {
              const options = {
                url: new url_1.URL(next)
              };
              return options;
            }
            return false;
          },
          filter: () => true,
          shouldContinue: () => true,
          countLimit: Infinity
        }
      },
      handlers: [create_1.defaultHandler],
      mutableDefaults: false
    };
    var got = create_1.default(defaults2);
    exports.default = got;
    module2.exports = got;
    module2.exports.default = got;
    __export2(require_types());
    var as_stream_1 = require_as_stream();
    exports.ResponseStream = as_stream_1.ProxyStream;
    var errors_1 = require_errors();
    exports.GotError = errors_1.GotError;
    exports.CacheError = errors_1.CacheError;
    exports.RequestError = errors_1.RequestError;
    exports.ReadError = errors_1.ReadError;
    exports.ParseError = errors_1.ParseError;
    exports.HTTPError = errors_1.HTTPError;
    exports.MaxRedirectsError = errors_1.MaxRedirectsError;
    exports.UnsupportedProtocolError = errors_1.UnsupportedProtocolError;
    exports.TimeoutError = errors_1.TimeoutError;
    exports.CancelError = errors_1.CancelError;
  }
});

// node_modules/camunda-external-task-client-js/lib/__internal/EngineError.js
var require_EngineError = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/__internal/EngineError.js"(exports, module2) {
    var { GotError } = require_source3();
    var EngineError = class extends GotError {
      constructor(httpError) {
        const { response, options } = httpError;
        let error3, type;
        if (response.body && response.body.message && response.body.type) {
          error3 = response.body.message;
          type = response.body.type;
        } else {
          error3 = response.body;
          type = "undefined";
        }
        super(`Response code ${response.statusCode} (${response.statusMessage}); Error: ${error3}; Type: ${type}`, {}, options);
        this.name = "EngineError";
        Object.defineProperty(this, "response", {
          enumerable: false,
          value: response
        });
      }
    };
    module2.exports = EngineError;
  }
});

// node_modules/camunda-external-task-client-js/lib/__internal/EngineService.js
var require_EngineService = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/__internal/EngineService.js"(exports, module2) {
    var got = require_source3();
    var EngineError = require_EngineError();
    var EngineService = class {
      constructor({ workerId, baseUrl, interceptors }) {
        this.workerId = workerId;
        this.baseUrl = `${baseUrl.replace(/\/$/, "")}`;
        this.interceptors = interceptors;
        this.request = this.request.bind(this);
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.fetchAndLock = this.fetchAndLock.bind(this);
        this.complete = this.complete.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
        this.lock = this.lock.bind(this);
      }
      async request(method, path, options) {
        const url = `${this.baseUrl}${path}`;
        let newOptions = __spreadValues({ method }, options);
        if (this.interceptors) {
          newOptions = this.interceptors.reduce((config2, interceptor) => {
            return interceptor(config2);
          }, newOptions);
        }
        try {
          const { body, headers } = await got(url, __spreadProps(__spreadValues({}, newOptions), {
            responseType: "buffer"
          }));
          if (headers["content-type"] === "application/json") {
            return JSON.parse(body.toString("utf-8"));
          } else {
            return body;
          }
        } catch (e2) {
          if (e2 instanceof got.HTTPError) {
            throw new EngineError(e2);
          }
          throw e2;
        }
      }
      post(path, options) {
        return this.request("POST", path, options);
      }
      get(path, options) {
        return this.request("GET", path, options);
      }
      fetchAndLock(requestBody) {
        return this.post("/external-task/fetchAndLock", {
          json: __spreadProps(__spreadValues({}, requestBody), { workerId: this.workerId })
        });
      }
      complete({ id, variables: variables2, localVariables }) {
        return this.post(`/external-task/${id}/complete`, {
          json: { workerId: this.workerId, variables: variables2, localVariables }
        });
      }
      handleFailure({ id }, options) {
        return this.post(`/external-task/${id}/failure`, {
          json: __spreadProps(__spreadValues({}, options), { workerId: this.workerId })
        });
      }
      handleBpmnError({ id }, errorCode, errorMessage, variables2) {
        return this.post(`/external-task/${id}/bpmnError`, {
          json: { errorCode, workerId: this.workerId, errorMessage, variables: variables2 }
        });
      }
      lock({ id }, lockDuration) {
        return this.post(`/external-task/${id}/lock`, {
          json: {
            lockDuration,
            workerId: this.workerId
          }
        });
      }
      extendLock({ id }, newDuration) {
        return this.post(`/external-task/${id}/extendLock`, {
          json: { newDuration, workerId: this.workerId }
        });
      }
      unlock({ id }) {
        return this.post(`/external-task/${id}/unlock`, {});
      }
    };
    module2.exports = EngineService;
  }
});

// node_modules/camunda-external-task-client-js/lib/__internal/errors.js
var require_errors2 = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/__internal/errors.js"(exports, module2) {
    var MISSING_BASE_URL = "Couldn't instantiate Client, missing configuration parameter 'baseUrl'";
    var WRONG_INTERCEPTOR = "Interceptors should be a function or an array of functions";
    var WRONG_MIDDLEWARES = "Middleware(s) should be a function or an array of functions";
    var ALREADY_REGISTERED = "Subscription failed, already subscribed to topic";
    var MISSING_HANDLER = "Subscription failed, missing handler function";
    var MISSING_TASK = "Couldn't complete task, task id is missing";
    var MISSING_ERROR_CODE = "Couldn't throw BPMN Error, no error code was provided";
    var MISSING_DURATION = "Couldn't lock task, no duration was provided";
    var MISSING_NEW_DURATION = "Couldn't extend lock time, no new duration was provided";
    var MISSING_BASIC_AUTH_PARAMS = "Couldn't instantiate BasicAuthInterceptor, missing configuration parameter 'username' or 'password'";
    var MISSING_KEYCLOAK_AUTH_PARAMS = "Couldn't instantiate KeycloakAuthInterceptor, missing configuration parameter 'tokenEndpoint', 'clientId' or 'clientSecret'";
    var UNEXPECTED_KEYCLOAK_TOKEN_RESULT = "Couldn't get access token from Keycloak provider; got";
    var MISSING_FILE_OPTIONS = "Couldn't create a File, make sure to provide one of the following parameters: \n- path \ntypedValue";
    module2.exports = {
      MISSING_BASE_URL,
      ALREADY_REGISTERED,
      MISSING_HANDLER,
      MISSING_TASK,
      WRONG_INTERCEPTOR,
      MISSING_ERROR_CODE,
      MISSING_DURATION,
      MISSING_NEW_DURATION,
      MISSING_BASIC_AUTH_PARAMS,
      MISSING_KEYCLOAK_AUTH_PARAMS,
      UNEXPECTED_KEYCLOAK_TOKEN_RESULT,
      WRONG_MIDDLEWARES,
      MISSING_FILE_OPTIONS
    };
  }
});

// node_modules/camunda-external-task-client-js/lib/File.js
var require_File = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/File.js"(exports, module2) {
    var fs = require("fs");
    var util = require("util");
    var path = require("path");
    var { MISSING_FILE_OPTIONS } = require_errors2();
    var File2 = class {
      constructor(options = {}) {
        this.load = this.load.bind(this);
        this.createTypedValue = this.createTypedValue.bind(this);
        this.__readFile = util.promisify(fs.readFile);
        const { localPath, remotePath, typedValue } = options;
        if (!localPath && !remotePath && !typedValue) {
          throw new Error(MISSING_FILE_OPTIONS);
        }
        Object.assign(this, options);
        if (typedValue) {
          Object.assign(this, typedValue.valueInfo);
          delete this.typedValue;
        }
        this.filename = this.filename || path.basename(remotePath || localPath);
        this.content = "";
      }
      async load() {
        this.content = this.remotePath ? await this.engineService.get(this.remotePath) : await this.__readFile(this.localPath);
        return this;
      }
      createTypedValue() {
        const valueInfo = { filename: this.filename };
        if (this.encoding) {
          valueInfo.encoding = this.encoding;
        }
        if (this.mimetype) {
          valueInfo.mimetype = this.mimetype;
        }
        return {
          type: "file",
          value: this.content.toString("base64"),
          valueInfo
        };
      }
    };
    module2.exports = File2;
  }
});

// node_modules/camunda-external-task-client-js/lib/__internal/utils.js
var require_utils = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/__internal/utils.js"(exports, module2) {
    var File2 = require_File();
    var isFunction = (f3) => typeof f3 === "function";
    var andArrayWith = (arr, test) => arr.reduce((boolean, current) => boolean && test(current), true);
    var isArrayOfFunctions = (a) => Array.isArray(a) && a.length > 0 && andArrayWith(a, isFunction);
    var isUndefinedOrNull = (a) => typeof a === "undefined" || a === null;
    var typeMatchers = {
      null: isUndefinedOrNull,
      integer(a) {
        return Number.isInteger(a) && a >= -Math.pow(2, 31) && a <= Math.pow(2, 31) - 1;
      },
      long(a) {
        return Number.isInteger(a) && !typeMatchers.integer(a);
      },
      double(a) {
        return typeof a === "number" && !Number.isInteger(a);
      },
      boolean(a) {
        return typeof a === "boolean";
      },
      string(a) {
        return typeof a === "string";
      },
      file(a) {
        return a instanceof File2;
      },
      date(a) {
        return a instanceof Date;
      },
      json(a) {
        return typeof a === "object";
      }
    };
    var getVariableType = (variable) => {
      const match = Object.entries(typeMatchers).filter(([matcherKey, matcherFunction]) => matcherFunction(variable))[0];
      return match[0];
    };
    var mapEntries = (object, mapper) => Object.entries(object).reduce((accumulator, [key2, value]) => {
      return __spreadValues(__spreadValues({}, accumulator), mapper({ key: key2, value }));
    }, {});
    var deserializeVariable = ({
      key: key2,
      typedValue,
      processInstanceId,
      engineService
    }) => {
      let { value, type } = __spreadValues({}, typedValue);
      type = type.toLowerCase();
      if (type === "json") {
        value = JSON.parse(value);
      }
      if (type === "file") {
        let remotePath = `/execution/${processInstanceId}/localVariables/${key2}/data`;
        value = new File2({ typedValue, remotePath, engineService });
      }
      if (type === "date") {
        value = new Date(value);
      }
      return __spreadProps(__spreadValues({}, typedValue), { value, type });
    };
    var serializeVariable = ({ key: key2, typedValue }) => {
      let { value, type } = __spreadValues({}, typedValue);
      type = type.toLowerCase();
      if (type === "file" && value instanceof File2) {
        return value.createTypedValue();
      }
      if (type === "json" && typeof value !== "string") {
        value = JSON.stringify(value);
      }
      if (type === "date" && value instanceof Date) {
        value = value.toISOString().replace(/Z$/, "+0000");
      }
      return __spreadProps(__spreadValues({}, typedValue), { value, type });
    };
    module2.exports = {
      isFunction,
      andArrayWith,
      isArrayOfFunctions,
      isUndefinedOrNull,
      getVariableType,
      mapEntries,
      serializeVariable,
      deserializeVariable
    };
  }
});

// node_modules/camunda-external-task-client-js/lib/Variables.js
var require_Variables = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/Variables.js"(exports, module2) {
    var {
      getVariableType,
      mapEntries,
      serializeVariable,
      deserializeVariable
    } = require_utils();
    function Variables(initialVariables = {}, options = {}) {
      const { readOnly, processInstanceId, engineService } = options;
      let dirtyVariables = {};
      this.getTyped = (variableName) => {
        let typedValue = initialVariables[variableName];
        if (!typedValue) {
          return null;
        }
        return deserializeVariable({
          key: variableName,
          typedValue,
          processInstanceId,
          engineService
        });
      };
      this.get = (variableName) => {
        const { value } = __spreadValues({}, this.getTyped(variableName));
        return value;
      };
      this.getAll = () => mapEntries(initialVariables, ({ key: key2 }) => ({ [key2]: this.get(key2) }));
      this.getAllTyped = () => mapEntries(initialVariables, ({ key: key2 }) => ({ [key2]: this.getTyped(key2) }));
      this.getDirtyVariables = () => {
        return dirtyVariables;
      };
      if (!readOnly) {
        this.setTyped = (variableName, typedValue) => {
          initialVariables[variableName] = dirtyVariables[variableName] = serializeVariable({
            key: variableName,
            typedValue
          });
          return this;
        };
        this.set = (variableName, value) => {
          const type = getVariableType(value);
          return this.setTyped(variableName, { type, value, valueInfo: {} });
        };
        this.setTransient = (variableName, value) => {
          const type = getVariableType(value);
          return this.setTyped(variableName, {
            type,
            value,
            valueInfo: { transient: true }
          });
        };
        this.setAll = (values) => {
          const self2 = this;
          Object.entries(values).forEach(([key2, value]) => {
            self2.set(key2, value);
          });
          return self2;
        };
        this.setAllTyped = (typedValues) => {
          const self2 = this;
          Object.entries(typedValues).forEach(([key2, typedValue]) => {
            self2.setTyped(key2, typedValue);
          });
          return self2;
        };
      }
    }
    module2.exports = Variables;
  }
});

// node_modules/camunda-external-task-client-js/lib/TaskService.js
var require_TaskService = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/TaskService.js"(exports, module2) {
    var {
      MISSING_TASK,
      MISSING_ERROR_CODE,
      MISSING_DURATION,
      MISSING_NEW_DURATION
    } = require_errors2();
    var { isUndefinedOrNull } = require_utils();
    var Variables = require_Variables();
    var TaskService = class {
      constructor(events, api) {
        this.events = events;
        this.api = api;
        this.sanitizeTask = this.sanitizeTask.bind(this);
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.complete = this.complete.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
        this.handleBpmnError = this.handleBpmnError.bind(this);
        this.lock = this.lock.bind(this);
        this.extendLock = this.extendLock.bind(this);
      }
      sanitizeTask(task) {
        if (typeof task === "object") {
          return { id: task.id };
        } else {
          return { id: task };
        }
      }
      success(event, ...args) {
        this.events.emit(`${event}:success`, ...args);
      }
      error(event, ...args) {
        this.events.emit(`${event}:error`, ...args);
      }
      async complete(task, variables2, localVariables) {
        if (isUndefinedOrNull(task)) {
          throw new Error(MISSING_TASK);
        }
        const sanitizedTask = this.sanitizeTask(task);
        try {
          const requestBody = __spreadValues({}, sanitizedTask);
          if (variables2 instanceof Variables) {
            requestBody.variables = variables2.getDirtyVariables();
          }
          if (localVariables instanceof Variables) {
            requestBody.localVariables = localVariables.getDirtyVariables();
          }
          await this.api.complete(requestBody);
          this.success("complete", task);
        } catch (e2) {
          this.error("complete", task, e2);
        }
      }
      async handleFailure(task, options) {
        if (isUndefinedOrNull(task)) {
          throw new Error(MISSING_TASK);
        }
        const sanitizedTask = this.sanitizeTask(task);
        try {
          await this.api.handleFailure(sanitizedTask, options);
          this.success("handleFailure", task);
        } catch (e2) {
          this.error("handleFailure", task, e2);
        }
      }
      async handleBpmnError(task, errorCode, errorMessage, variables2) {
        if (isUndefinedOrNull(task)) {
          throw new Error(MISSING_TASK);
        }
        if (!errorCode) {
          throw new Error(MISSING_ERROR_CODE);
        }
        const sanitizedTask = this.sanitizeTask(task);
        try {
          await this.api.handleBpmnError(sanitizedTask, errorCode, errorMessage, variables2 instanceof Variables ? variables2.getDirtyVariables() : void 0);
          this.success("handleBpmnError", task);
        } catch (e2) {
          this.error("handleBpmnError", task, e2);
        }
      }
      async lock(task, duration2) {
        if (isUndefinedOrNull(task)) {
          throw new Error(MISSING_TASK);
        }
        if (!duration2) {
          throw new Error(MISSING_DURATION);
        }
        const sanitizedTask = this.sanitizeTask(task);
        try {
          await this.api.lock(sanitizedTask, duration2);
          this.success("lock", task);
        } catch (e2) {
          this.error("lock", task, e2);
        }
      }
      async extendLock(task, newDuration) {
        if (isUndefinedOrNull(task)) {
          throw new Error(MISSING_TASK);
        }
        if (!newDuration) {
          throw new Error(MISSING_NEW_DURATION);
        }
        const sanitizedTask = this.sanitizeTask(task);
        try {
          await this.api.extendLock(sanitizedTask, newDuration);
          this.success("extendLock", task);
        } catch (e2) {
          this.error("extendLock", task, e2);
        }
      }
      async unlock(task) {
        if (isUndefinedOrNull(task)) {
          throw new Error(MISSING_TASK);
        }
        const sanitizedTask = this.sanitizeTask(task);
        try {
          await this.api.unlock(sanitizedTask);
          this.success("unlock", task);
        } catch (e2) {
          this.error("unlock", task, e2);
        }
      }
    };
    module2.exports = TaskService;
  }
});

// node_modules/camunda-external-task-client-js/lib/Client.js
var require_Client = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/Client.js"(exports, module2) {
    var events = require("events");
    var EngineService = require_EngineService();
    var TaskService = require_TaskService();
    var Variables = require_Variables();
    var {
      MISSING_BASE_URL,
      ALREADY_REGISTERED,
      MISSING_HANDLER,
      WRONG_INTERCEPTOR,
      WRONG_MIDDLEWARES
    } = require_errors2();
    var {
      isFunction,
      isArrayOfFunctions,
      isUndefinedOrNull
    } = require_utils();
    var defaultOptions = {
      workerId: "some-random-id",
      maxTasks: 10,
      usePriority: true,
      interval: 300,
      lockDuration: 5e4,
      autoPoll: true
    };
    var Client2 = class extends events {
      constructor(customOptions) {
        super();
        this.sanitizeOptions = this.sanitizeOptions.bind(this);
        this.start = this.start.bind(this);
        this.poll = this.poll.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.executeTask = this.executeTask.bind(this);
        this.stop = this.stop.bind(this);
        this.activeTasksCount = 0;
        this.sanitizeOptions(customOptions);
        this.topicSubscriptions = {};
        this.engineService = new EngineService(this.options);
        this.taskService = new TaskService(this, this.engineService);
        if (this.options.use) {
          this.options.use.forEach((f3) => f3(this));
        }
        if (this.options.autoPoll) {
          this.start();
        }
      }
      sanitizeOptions(customOptions) {
        this.options = __spreadValues(__spreadValues({}, defaultOptions), customOptions);
        if (!customOptions || !customOptions.baseUrl || !customOptions.baseUrl.length) {
          throw new Error(MISSING_BASE_URL);
        }
        const { interceptors, use } = customOptions;
        if (interceptors && !isFunction(interceptors) && !isArrayOfFunctions(interceptors)) {
          throw new Error(WRONG_INTERCEPTOR);
        }
        if (isFunction(interceptors)) {
          this.options.interceptors = [interceptors];
        }
        if (use && !isFunction(use) && !isArrayOfFunctions(use)) {
          throw new Error(WRONG_MIDDLEWARES);
        }
        if (isFunction(use)) {
          this.options.use = [use];
        }
      }
      start() {
        this._isPollAllowed = true;
        this.poll();
      }
      async poll() {
        if (!this._isPollAllowed) {
          return;
        }
        this.emit("poll:start");
        const { topicSubscriptions, engineService, executeTask, poll } = this;
        const {
          maxTasks,
          usePriority,
          interval: interval2,
          asyncResponseTimeout,
          maxParallelExecutions
        } = this.options;
        const requiredTasksCount = isUndefinedOrNull(maxParallelExecutions) ? maxTasks : Math.min(maxTasks, maxParallelExecutions - this.activeTasksCount);
        if (requiredTasksCount <= 0) {
          return setTimeout(poll, interval2);
        }
        let pollingOptions = {
          maxTasks: requiredTasksCount,
          usePriority
        };
        if (asyncResponseTimeout) {
          pollingOptions = __spreadProps(__spreadValues({}, pollingOptions), { asyncResponseTimeout });
        }
        if (!Object.keys(topicSubscriptions).length) {
          return setTimeout(poll, interval2);
        }
        const topics = Object.entries(topicSubscriptions).map(([
          topicName,
          {
            businessKey,
            lockDuration,
            variables: variables2,
            processDefinitionId,
            processDefinitionIdIn,
            processDefinitionKey,
            processDefinitionKeyIn,
            processDefinitionVersionTag,
            processVariables,
            tenantIdIn,
            withoutTenantId,
            localVariables
          }
        ]) => {
          let topic = { topicName, lockDuration };
          if (!isUndefinedOrNull(variables2)) {
            topic.variables = variables2;
          }
          if (!isUndefinedOrNull(businessKey)) {
            topic.businessKey = businessKey;
          }
          if (!isUndefinedOrNull(processDefinitionId)) {
            topic.processDefinitionId = processDefinitionId;
          }
          if (!isUndefinedOrNull(processDefinitionIdIn)) {
            topic.processDefinitionIdIn = processDefinitionIdIn;
          }
          if (!isUndefinedOrNull(processDefinitionKey)) {
            topic.processDefinitionKey = processDefinitionKey;
          }
          if (!isUndefinedOrNull(processDefinitionKeyIn)) {
            topic.processDefinitionKeyIn = processDefinitionKeyIn;
          }
          if (!isUndefinedOrNull(processDefinitionVersionTag)) {
            topic.processDefinitionVersionTag = processDefinitionVersionTag;
          }
          if (!isUndefinedOrNull(processVariables)) {
            topic.processVariables = processVariables;
          }
          if (!isUndefinedOrNull(tenantIdIn)) {
            topic.tenantIdIn = tenantIdIn;
          }
          if (!isUndefinedOrNull(withoutTenantId)) {
            topic.withoutTenantId = withoutTenantId;
          }
          if (!isUndefinedOrNull(localVariables)) {
            topic.localVariables = localVariables;
          }
          return topic;
        });
        const requestBody = __spreadProps(__spreadValues({}, pollingOptions), { topics });
        try {
          const tasks2 = await engineService.fetchAndLock(requestBody);
          this.emit("poll:success", tasks2);
          tasks2.forEach(executeTask);
        } catch (e2) {
          this.emit("poll:error", e2);
        }
        setTimeout(poll, interval2);
      }
      subscribe(topic, customOptions, handler2) {
        const topicSubscriptions = this.topicSubscriptions;
        const options = this.options;
        const lockDuration = options.lockDuration;
        if (topicSubscriptions[topic]) {
          throw new Error(ALREADY_REGISTERED);
        }
        if (typeof customOptions === "function") {
          handler2 = customOptions;
          customOptions = null;
        }
        if (!handler2) {
          throw new Error(MISSING_HANDLER);
        }
        const unsubscribe = () => {
          delete topicSubscriptions[topic];
          this.emit("unsubscribe");
        };
        const topicSubscription = __spreadValues({
          handler: handler2,
          unsubscribe,
          lockDuration
        }, customOptions);
        topicSubscriptions[topic] = topicSubscription;
        this.emit("subscribe", topic, topicSubscription);
        return topicSubscription;
      }
      async executeTask(task) {
        const taskService = this.taskService;
        const topicSubscription = this.topicSubscriptions[task.topicName];
        const variables2 = new Variables(task.variables, {
          readOnly: true,
          processInstanceId: task.processInstanceId,
          engineService: this.engineService
        });
        this.activeTasksCount++;
        const newTask = __spreadProps(__spreadValues({}, task), { variables: variables2 });
        try {
          await topicSubscription.handler({ task: newTask, taskService });
          this.emit("handler:success", task);
        } catch (e2) {
          this.emit("handler:error", e2);
        } finally {
          this.activeTasksCount--;
        }
      }
      stop() {
        this._isPollAllowed = false;
        this.emit("poll:stop");
      }
    };
    module2.exports = Client2;
  }
});

// node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/escape-string-regexp/index.js"(exports, module2) {
    "use strict";
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color-convert/conversions.js"(exports, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (key2 in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key2)) {
        reverseKeywords[cssKeywords[key2]] = key2;
      }
    }
    var key2;
    var convert = module2.exports = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    for (model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        channels = convert[model].channels;
        labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
    }
    var channels;
    var labels;
    var model;
    convert.rgb.hsl = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min = Math.min(r2, g, b);
      var max = Math.max(r2, g, b);
      var delta = max - min;
      var h2;
      var s3;
      var l;
      if (max === min) {
        h2 = 0;
      } else if (r2 === max) {
        h2 = (g - b) / delta;
      } else if (g === max) {
        h2 = 2 + (b - r2) / delta;
      } else if (b === max) {
        h2 = 4 + (r2 - g) / delta;
      }
      h2 = Math.min(h2 * 60, 360);
      if (h2 < 0) {
        h2 += 360;
      }
      l = (min + max) / 2;
      if (max === min) {
        s3 = 0;
      } else if (l <= 0.5) {
        s3 = delta / (max + min);
      } else {
        s3 = delta / (2 - max - min);
      }
      return [h2, s3 * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h2;
      var s3;
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r2, g, b);
      var diff = v - Math.min(r2, g, b);
      var diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h2 = s3 = 0;
      } else {
        s3 = diff / v;
        rdif = diffc(r2);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r2 === v) {
          h2 = bdif - gdif;
        } else if (g === v) {
          h2 = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h2 = 2 / 3 + gdif - rdif;
        }
        if (h2 < 0) {
          h2 += 1;
        } else if (h2 > 1) {
          h2 -= 1;
        }
      }
      return [
        h2 * 360,
        s3 * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      var r2 = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h2 = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r2, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r2, Math.max(g, b));
      return [h2, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m2;
      var y;
      var k;
      k = Math.min(1 - r2, 1 - g, 1 - b);
      c = (1 - r2 - k) / (1 - k) || 0;
      m2 = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m2 * 100, y * 100, k * 100];
    };
    function comparativeDistance(x2, y) {
      return Math.pow(x2[0] - y[0], 2) + Math.pow(x2[1] - y[1], 2) + Math.pow(x2[2] - y[2], 2);
    }
    convert.rgb.keyword = function(rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      r2 = r2 > 0.04045 ? Math.pow((r2 + 0.055) / 1.055, 2.4) : r2 / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x2 = r2 * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r2 * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r2 * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x2 * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x2 = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x2 /= 95.047;
      y /= 100;
      z /= 108.883;
      x2 = x2 > 8856e-6 ? Math.pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x2 - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      var h2 = hsl[0] / 360;
      var s3 = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;
      if (s3 === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s3);
      } else {
        t2 = l + s3 - l * s3;
      }
      t1 = 2 * l - t2;
      rgb = [0, 0, 0];
      for (var i2 = 0; i2 < 3; i2++) {
        t3 = h2 + 1 / 3 * -(i2 - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i2] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      var h2 = hsl[0];
      var s3 = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s3;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s3 *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s3) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s3 / (l + s3);
      return [h2, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      var h2 = hsv[0] / 60;
      var s3 = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h2) % 6;
      var f3 = h2 - Math.floor(h2);
      var p = 255 * v * (1 - s3);
      var q = 255 * v * (1 - s3 * f3);
      var t2 = 255 * v * (1 - s3 * (1 - f3));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t2, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t2];
        case 3:
          return [p, q, v];
        case 4:
          return [t2, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      var h2 = hsv[0];
      var s3 = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l;
      l = (2 - s3) * v;
      lmin = (2 - s3) * vmin;
      sl = s3 * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h2, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      var h2 = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i2;
      var v;
      var f3;
      var n;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      i2 = Math.floor(6 * h2);
      v = 1 - bl;
      f3 = 6 * h2 - i2;
      if ((i2 & 1) !== 0) {
        f3 = 1 - f3;
      }
      n = wh + f3 * (v - wh);
      var r2;
      var g;
      var b;
      switch (i2) {
        default:
        case 6:
        case 0:
          r2 = v;
          g = n;
          b = wh;
          break;
        case 1:
          r2 = n;
          g = v;
          b = wh;
          break;
        case 2:
          r2 = wh;
          g = v;
          b = n;
          break;
        case 3:
          r2 = wh;
          g = n;
          b = v;
          break;
        case 4:
          r2 = n;
          g = wh;
          b = v;
          break;
        case 5:
          r2 = v;
          g = wh;
          b = n;
          break;
      }
      return [r2 * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      var c = cmyk[0] / 100;
      var m2 = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r2;
      var g;
      var b;
      r2 = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m2 * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r2 * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      var x2 = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r2;
      var g;
      var b;
      r2 = x2 * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x2 * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x2 * 0.0557 + y * -0.204 + z * 1.057;
      r2 = r2 > 31308e-7 ? 1.055 * Math.pow(r2, 1 / 2.4) - 0.055 : r2 * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r2 = Math.min(Math.max(0, r2), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r2 * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      var x2 = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x2 /= 95.047;
      y /= 100;
      z /= 108.883;
      x2 = x2 > 8856e-6 ? Math.pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x2 - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x2;
      var y;
      var z;
      y = (l + 16) / 116;
      x2 = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x22 = Math.pow(x2, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x2 = x22 > 8856e-6 ? x22 : (x2 - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x2 *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x2, y, z];
    };
    convert.lab.lch = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h2;
      var c;
      hr = Math.atan2(b, a);
      h2 = hr * 360 / 2 / Math.PI;
      if (h2 < 0) {
        h2 += 360;
      }
      c = Math.sqrt(a * a + b * b);
      return [l, c, h2];
    };
    convert.lch.lab = function(lch) {
      var l = lch[0];
      var c = lch[1];
      var h2 = lch[2];
      var a;
      var b;
      var hr;
      hr = h2 / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args) {
      var r2 = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r2 / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      var r2 = args[0];
      var g = args[1];
      var b = args[2];
      if (r2 === g && g === b) {
        if (r2 < 8) {
          return 16;
        }
        if (r2 > 248) {
          return 231;
        }
        return Math.round((r2 - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r2 / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      var color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r2 = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r2, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r2 = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r2, g, b];
    };
    convert.rgb.hex = function(args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      var colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map(function(char) {
          return char + char;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r2 = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b = integer & 255;
      return [r2, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r2, g), b);
      var min = Math.min(Math.min(r2, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r2) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r2) / chroma;
      } else {
        hue = 4 + (r2 - g) / chroma + 4;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      var s3 = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f3 = 0;
      if (l < 0.5) {
        c = 2 * s3 * l;
      } else {
        c = 2 * s3 * (1 - l);
      }
      if (c < 1) {
        f3 = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f3 * 100];
    };
    convert.hsv.hcg = function(hsv) {
      var s3 = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s3 * v;
      var f3 = 0;
      if (c < 1) {
        f3 = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f3 * 100];
    };
    convert.hcg.rgb = function(hcg) {
      var h2 = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h2 % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f3 = 0;
      if (v > 0) {
        f3 = c / v;
      }
      return [hcg[0], f3 * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c) + 0.5 * c;
      var s3 = 0;
      if (l > 0 && l < 0.5) {
        s3 = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s3 = c / (2 * (1 - l));
      }
      return [hcg[0], s3 * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      var val = Math.round(gray[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color-convert/route.js"(exports, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i2 = 0; i2 < len; i2++) {
        graph[models[i2]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i2 = 0; i2 < len; i2++) {
          var adjacent = adjacents[i2];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module2.exports = function(fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i2 = 0; i2 < len; i2++) {
        var toModel = models[i2];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color-convert/index.js"(exports, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        if (typeof result === "object") {
          for (var len = result.length, i2 = 0; i2 < len; i2++) {
            result[i2] = Math.round(result[i2]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function(fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function(toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/ansi-styles/index.js"(exports, module2) {
    "use strict";
    var colorConvert = require_color_convert();
    var wrapAnsi16 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => function() {
      const rgb = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          gray: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.grey = styles.color.gray;
      for (const groupName of Object.keys(styles)) {
        const group = styles[groupName];
        for (const styleName of Object.keys(group)) {
          const style = group[styleName];
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
      }
      const ansi2ansi = (n) => n;
      const rgb2rgb = (r2, g, b) => [r2, g, b];
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 0)
      };
      styles.color.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 0)
      };
      styles.color.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 0)
      };
      styles.bgColor.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 10)
      };
      styles.bgColor.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 10)
      };
      styles.bgColor.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 10)
      };
      for (let key2 of Object.keys(colorConvert)) {
        if (typeof colorConvert[key2] !== "object") {
          continue;
        }
        const suite = colorConvert[key2];
        if (key2 === "ansi16") {
          key2 = "ansi";
        }
        if ("ansi16" in suite) {
          styles.color.ansi[key2] = wrapAnsi16(suite.ansi16, 0);
          styles.bgColor.ansi[key2] = wrapAnsi16(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles.color.ansi256[key2] = wrapAnsi256(suite.ansi256, 0);
          styles.bgColor.ansi256[key2] = wrapAnsi256(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles.color.ansi16m[key2] = wrapAnsi16m(suite.rgb, 0);
          styles.bgColor.ansi16m[key2] = wrapAnsi16m(suite.rgb, 10);
        }
      }
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/chalk/templates.js
var require_templates = __commonJS({
  "node_modules/chalk/templates.js"(exports, module2) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape2(c) {
      if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, args) {
      const results = [];
      const chunks = args.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        if (!isNaN(chunk)) {
          results.push(Number(chunk));
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m2, escape2, chr) => escape2 ? unescape2(escape2) : chr));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk;
      for (const styleName of Object.keys(enabled)) {
        if (Array.isArray(enabled[styleName])) {
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          if (enabled[styleName].length > 0) {
            current = current[styleName].apply(current, enabled[styleName]);
          } else {
            current = current[styleName];
          }
        }
      }
      return current;
    }
    module2.exports = (chalk, tmp) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m2, escapeChar, inverse, style, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape2(escapeChar));
        } else if (style) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMsg);
      }
      return chunks.join("");
    };
  }
});

// node_modules/chalk/index.js
var require_chalk = __commonJS({
  "node_modules/chalk/index.js"(exports, module2) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    var ansiStyles = require_ansi_styles();
    var stdoutColor = require_supports_color().stdout;
    var template2 = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */ new Set(["gray"]);
    var styles = /* @__PURE__ */ Object.create(null);
    function applyOptions(obj, options) {
      options = options || {};
      const scLevel = stdoutColor ? stdoutColor.level : 0;
      obj.level = options.level === void 0 ? scLevel : options.level;
      obj.enabled = "enabled" in options ? options.enabled : obj.level > 0;
    }
    function Chalk(options) {
      if (!this || !(this instanceof Chalk) || this.template) {
        const chalk = {};
        applyOptions(chalk, options);
        chalk.template = function() {
          const args = [].slice.call(arguments);
          return chalkTag.apply(null, [chalk.template].concat(args));
        };
        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);
        chalk.template.constructor = Chalk;
        return chalk.template;
      }
      applyOptions(this, options);
    }
    if (isSimpleWindowsTerm) {
      ansiStyles.blue.open = "\x1B[94m";
    }
    for (const key2 of Object.keys(ansiStyles)) {
      ansiStyles[key2].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key2].close), "g");
      styles[key2] = {
        get() {
          const codes = ansiStyles[key2];
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key2);
        }
      };
    }
    styles.visible = {
      get() {
        return build.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), "g");
    for (const model of Object.keys(ansiStyles.color.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      styles[model] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.color.close,
              closeRe: ansiStyles.color.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), "g");
    for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.bgColor.close,
              closeRe: ansiStyles.bgColor.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, styles);
    function build(_styles, _empty, key2) {
      const builder = function() {
        return applyStyle.apply(builder, arguments);
      };
      builder._styles = _styles;
      builder._empty = _empty;
      const self2 = this;
      Object.defineProperty(builder, "level", {
        enumerable: true,
        get() {
          return self2.level;
        },
        set(level) {
          self2.level = level;
        }
      });
      Object.defineProperty(builder, "enabled", {
        enumerable: true,
        get() {
          return self2.enabled;
        },
        set(enabled) {
          self2.enabled = enabled;
        }
      });
      builder.hasGrey = this.hasGrey || key2 === "gray" || key2 === "grey";
      builder.__proto__ = proto;
      return builder;
    }
    function applyStyle() {
      const args = arguments;
      const argsLen = args.length;
      let str = String(arguments[0]);
      if (argsLen === 0) {
        return "";
      }
      if (argsLen > 1) {
        for (let a = 1; a < argsLen; a++) {
          str += " " + args[a];
        }
      }
      if (!this.enabled || this.level <= 0 || !str) {
        return this._empty ? "" : str;
      }
      const originalDim = ansiStyles.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles.dim.open = "";
      }
      for (const code of this._styles.slice().reverse()) {
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
      }
      ansiStyles.dim.open = originalDim;
      return str;
    }
    function chalkTag(chalk, strings) {
      if (!Array.isArray(strings)) {
        return [].slice.call(arguments, 1).join(" ");
      }
      const args = [].slice.call(arguments, 2);
      const parts = [strings.raw[0]];
      for (let i2 = 1; i2 < strings.length; i2++) {
        parts.push(String(args[i2 - 1]).replace(/[{}\\]/g, "\\$&"));
        parts.push(String(strings.raw[i2]));
      }
      return template2(chalk, parts.join(""));
    }
    Object.defineProperties(Chalk.prototype, styles);
    module2.exports = Chalk();
    module2.exports.supportsColor = stdoutColor;
    module2.exports.default = module2.exports;
  }
});

// node_modules/camunda-external-task-client-js/lib/logger.js
var require_logger = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/logger.js"(exports, module2) {
    var { red, green } = require_chalk();
    var success = (message) => `${green("\u2713")} ${green(message)}`;
    var error3 = (message) => `${red("\u2716")} ${red(message)}`;
    var levels = {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5
    };
    var logger2 = (client, clientLogLevel) => {
      const log = (messageLogLevel, message) => {
        if (!message) {
          console.log(messageLogLevel);
          return;
        }
        if (levels[messageLogLevel] <= clientLogLevel) {
          console.log(message);
        }
      };
      switch (typeof clientLogLevel) {
        case "string":
          clientLogLevel = levels[clientLogLevel];
          break;
        case "number":
          break;
        default:
          clientLogLevel = levels["info"];
          break;
      }
      client.on("subscribe", (topic) => {
        log("info", success(`subscribed to topic ${topic}`));
      });
      client.on("unsubscribe", (topic) => {
        log("info", success(`unsubscribed from topic ${topic}`));
      });
      client.on("poll:start", () => {
        log("debug", "polling");
      });
      client.on("poll:stop", () => {
        log("debug", error3("polling stopped"));
      });
      client.on("poll:success", (tasks2) => {
        const output = success(`polled ${tasks2.length} tasks`);
        log("debug", output);
      });
      client.on("poll:error", (e2) => {
        const output = error3(`polling failed with ${e2}`);
        log("error", output);
      });
      client.on("complete:success", ({ id }) => {
        log("info", success(`completed task ${id}`));
      });
      client.on("complete:error", ({ id }, e2) => {
        log("error", error3(`couldn't complete task ${id}, ${e2}`));
      });
      client.on("handleFailure:success", ({ id }) => {
        log("info", success(`handled failure of task ${id}`));
      });
      client.on("handleFailure:error", ({ id }, e2) => {
        log("error", error3(`couldn't handle failure of task ${id}, ${e2}`));
      });
      client.on("handleBpmnError:success", ({ id }) => {
        log("info", success(`handled BPMN error of task ${id}`));
      });
      client.on("handleBpmnError:error", ({ id }, e2) => {
        log("error", error3(`couldn't handle BPMN error of task ${id}, ${e2}`));
      });
      client.on("extendLock:success", ({ id }) => {
        log("info", success(`handled extend lock of task ${id}`));
      });
      client.on("extendLock:error", ({ id }, e2) => {
        log("error", error3(`couldn't handle extend lock of task ${id}, ${e2}`));
      });
      client.on("unlock:success", ({ id }) => {
        log("info", success(`unlocked task ${id}`));
      });
      client.on("unlock:error", ({ id }, e2) => {
        log("error", error3(`couldn't unlock task ${id}, ${e2}`));
      });
      client.on("lock:success", ({ id }) => {
        log("info", success(`locked task ${id}`));
      });
      client.on("lock:error", ({ id }, e2) => {
        log("error", error3(`couldn't lock task ${id}, ${e2}`));
      });
    };
    var level = (level2) => {
      return function(client) {
        logger2(client, level2);
      };
    };
    module2.exports = Object.assign(logger2, { success, error: error3, level });
  }
});

// node_modules/camunda-external-task-client-js/lib/BasicAuthInterceptor.js
var require_BasicAuthInterceptor = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/BasicAuthInterceptor.js"(exports, module2) {
    var { MISSING_BASIC_AUTH_PARAMS } = require_errors2();
    var BasicAuthInterceptor = class {
      constructor(options) {
        if (!options || !options.username || !options.password) {
          throw new Error(MISSING_BASIC_AUTH_PARAMS);
        }
        this.getHeader = this.getHeader.bind(this);
        this.interceptor = this.interceptor.bind(this);
        this.header = this.getHeader(options);
        return this.interceptor;
      }
      getHeader({ username, password }) {
        const encoded = Buffer.from(`${username}:${password}`).toString("base64");
        return { Authorization: `Basic ${encoded}` };
      }
      interceptor(config2) {
        return __spreadProps(__spreadValues({}, config2), { headers: __spreadValues(__spreadValues({}, config2.headers), this.header) });
      }
    };
    module2.exports = BasicAuthInterceptor;
  }
});

// node_modules/camunda-external-task-client-js/lib/KeycloakAuthInterceptor.js
var require_KeycloakAuthInterceptor = __commonJS({
  "node_modules/camunda-external-task-client-js/lib/KeycloakAuthInterceptor.js"(exports, module2) {
    var got = require_source3();
    var {
      MISSING_KEYCLOAK_AUTH_PARAMS,
      UNEXPECTED_KEYCLOAK_TOKEN_RESULT
    } = require_errors2();
    var KeycloakAuthInterceptor = class {
      constructor(options) {
        if (!options || !options.tokenEndpoint || !options.clientId || !options.clientSecret) {
          throw new Error(MISSING_KEYCLOAK_AUTH_PARAMS);
        }
        this.getAccessToken = this.getAccessToken.bind(this);
        this.cacheToken = this.cacheToken.bind(this);
        this.interceptor = this.interceptor.bind(this);
        this.cacheOffset = options.cacheOffset !== void 0 ? options.cacheOffset : 10;
        this.tokenEndpoint = options.tokenEndpoint;
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        return this.interceptor;
      }
      async getAccessToken(tokenEndpoint, clientID, clientSecret) {
        const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
        try {
          return await got(tokenEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic: ${credentials}`
            },
            body: "grant_type=client_credentials"
          }).json();
        } catch (e2) {
          throw new Error(`${UNEXPECTED_KEYCLOAK_TOKEN_RESULT} status: ${e2.response.statusCode}; body: ${e2.response.body}`);
        }
      }
      cacheToken(token) {
        const expiresIn = token.expires_in || 0;
        if (expiresIn > this.cacheOffset) {
          this.tokenCache = token;
          const tokenCleaner = () => {
            this.tokenCache = null;
          };
          setTimeout(tokenCleaner.bind(this), (expiresIn - this.cacheOffset) * 1e3);
        }
      }
      interceptor(config2) {
        const hooks = {
          beforeRequest: [
            async (options) => {
              let token = this.tokenCache;
              if (!token) {
                token = await this.getAccessToken(this.tokenEndpoint, this.clientId, this.clientSecret);
                this.cacheToken(token);
              }
              if (token && token.access_token) {
                const defaultHeaders = options.headers || {};
                const headers = {
                  Authorization: `Bearer ${token.access_token}`
                };
                options.headers = __spreadValues(__spreadValues({}, defaultHeaders), headers);
              } else {
                throw new Error(`${UNEXPECTED_KEYCLOAK_TOKEN_RESULT} token without access_token property: ${JSON.stringify(token)}`);
              }
            }
          ]
        };
        return __spreadProps(__spreadValues({}, config2), { hooks: __spreadValues(__spreadValues({}, config2.hooks), hooks) });
      }
    };
    module2.exports = KeycloakAuthInterceptor;
  }
});

// node_modules/camunda-external-task-client-js/index.js
var require_camunda_external_task_client_js = __commonJS({
  "node_modules/camunda-external-task-client-js/index.js"(exports, module2) {
    module2.exports = {
      Client: require_Client(),
      logger: require_logger(),
      BasicAuthInterceptor: require_BasicAuthInterceptor(),
      KeycloakAuthInterceptor: require_KeycloakAuthInterceptor(),
      Variables: require_Variables(),
      File: require_File()
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-ccac934e.js
var hooks_ccac934e_exports = {};
async function handler$1({ task, taskService }) {
  console.log("Printing");
  await new Promise(function(resolve2, reject) {
    setTimeout(function() {
      resolve2(taskService.complete(task));
    }, 5e3);
  });
}
async function handler({ task, taskService }) {
  console.log("Sending customer notification");
  await new Promise(function(resolve2, reject) {
    setTimeout(function() {
      resolve2(taskService.complete(task));
    }, 5e3);
  });
}
var import_camunda_external_task_client_js, Client, logger, config, camunda;
var init_hooks_ccac934e = __esm({
  ".svelte-kit/output/server/chunks/hooks-ccac934e.js"() {
    init_variables_b1eade11();
    import_camunda_external_task_client_js = __toESM(require_camunda_external_task_client_js(), 1);
    ({ Client, logger } = import_camunda_external_task_client_js.default);
    config = { baseUrl: variables.camundaAddress, use: logger };
    camunda = new Client(config);
    camunda.subscribe("printDeliveryNote", handler$1);
    camunda.subscribe("informCustomer", handler);
  }
});

// .svelte-kit/output/server/chunks/HeaderSearch.svelte_svelte_type_style_lang-e51739eb.js
function debounce(fn, wait) {
  let t2;
  return function() {
    clearTimeout(t2);
    t2 = setTimeout(() => fn.apply(this, arguments), wait);
  };
}
function toggleClass(elem, className, bool) {
  if (bool === true)
    return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  const e2 = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e2.className = className;
  if (content !== void 0)
    e2.textContent = content;
  return e2;
}
function clearNode(node) {
  while (node.firstChild)
    node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node))
    return node;
  else if (node.parentNode)
    return findParent(node.parentNode, condition);
  return void 0;
}
function createNumberInput(inputClassName, opts) {
  const wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== void 0)
    for (const key2 in opts)
      numInput.setAttribute(key2, opts[key2]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      const path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error3) {
    return event.target;
  }
}
function compareDates(date1, date2, timeless = true) {
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
function getDefaultHours(config2) {
  let hours = config2.defaultHour;
  let minutes = config2.defaultMinute;
  let seconds = config2.defaultSeconds;
  if (config2.minDate !== void 0) {
    const minHour = config2.minDate.getHours();
    const minMinutes = config2.minDate.getMinutes();
    const minSeconds = config2.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
      seconds = config2.minDate.getSeconds();
  }
  if (config2.maxDate !== void 0) {
    const maxHr = config2.maxDate.getHours();
    const maxMinutes = config2.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr)
      minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes)
      seconds = config2.maxDate.getSeconds();
  }
  return { hours, minutes, seconds };
}
function FlatpickrInstance(element, instanceConfig) {
  const self2 = {
    config: Object.assign(Object.assign({}, defaults), flatpickr.defaultConfig),
    l10n: english
  };
  self2.parseDate = createDateParser({ config: self2.config, l10n: self2.l10n });
  self2._handlers = [];
  self2.pluginElements = [];
  self2.loadedPlugins = [];
  self2._bind = bind;
  self2._setHoursFromDate = setHoursFromDate;
  self2._positionCalendar = positionCalendar;
  self2.changeMonth = changeMonth;
  self2.changeYear = changeYear;
  self2.clear = clear;
  self2.close = close;
  self2._createElement = createElement;
  self2.destroy = destroy;
  self2.isEnabled = isEnabled;
  self2.jumpToDate = jumpToDate;
  self2.open = open;
  self2.redraw = redraw;
  self2.set = set;
  self2.setDate = setDate;
  self2.toggle = toggle;
  function setupHelperFunctions() {
    self2.utils = {
      getDaysInMonth(month = self2.currentMonth, yr = self2.currentYear) {
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
          return 29;
        return self2.l10n.daysInMonth[month];
      }
    };
  }
  function init2() {
    self2.element = self2.input = element;
    self2.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self2.isMobile)
      build();
    bindEvents();
    if (self2.selectedDates.length || self2.config.noCalendar) {
      if (self2.config.enableTime) {
        setHoursFromDate(self2.config.noCalendar ? self2.latestSelectedDateObj : void 0);
      }
      updateValue(false);
    }
    setCalendarWidth();
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self2.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function bindToInstance(fn) {
    return fn.bind(self2);
  }
  function setCalendarWidth() {
    const config2 = self2.config;
    if (config2.weekNumbers === false && config2.showMonths === 1) {
      return;
    } else if (config2.noCalendar !== true) {
      window.requestAnimationFrame(function() {
        if (self2.calendarContainer !== void 0) {
          self2.calendarContainer.style.visibility = "hidden";
          self2.calendarContainer.style.display = "block";
        }
        if (self2.daysContainer !== void 0) {
          const daysWidth = (self2.days.offsetWidth + 1) * config2.showMonths;
          self2.daysContainer.style.width = daysWidth + "px";
          self2.calendarContainer.style.width = daysWidth + (self2.weekWrapper !== void 0 ? self2.weekWrapper.offsetWidth : 0) + "px";
          self2.calendarContainer.style.removeProperty("visibility");
          self2.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e2) {
    if (self2.selectedDates.length === 0) {
      const defaultDate = self2.config.minDate === void 0 || compareDates(new Date(), self2.config.minDate) >= 0 ? new Date() : new Date(self2.config.minDate.getTime());
      const defaults2 = getDefaultHours(self2.config);
      defaultDate.setHours(defaults2.hours, defaults2.minutes, defaults2.seconds, defaultDate.getMilliseconds());
      self2.selectedDates = [defaultDate];
      self2.latestSelectedDateObj = defaultDate;
    }
    if (e2 !== void 0 && e2.type !== "blur") {
      timeWrapper(e2);
    }
    const prevValue = self2._input.value;
    setHoursFromInputs();
    updateValue();
    if (self2._input.value !== prevValue) {
      self2._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * int(amPM === self2.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self2.hourElement === void 0 || self2.minuteElement === void 0)
      return;
    let hours = (parseInt(self2.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self2.minuteElement.value, 10) || 0) % 60, seconds = self2.secondElement !== void 0 ? (parseInt(self2.secondElement.value, 10) || 0) % 60 : 0;
    if (self2.amPM !== void 0) {
      hours = ampm2military(hours, self2.amPM.textContent);
    }
    const limitMinHours = self2.config.minTime !== void 0 || self2.config.minDate && self2.minDateHasTime && self2.latestSelectedDateObj && compareDates(self2.latestSelectedDateObj, self2.config.minDate, true) === 0;
    const limitMaxHours = self2.config.maxTime !== void 0 || self2.config.maxDate && self2.maxDateHasTime && self2.latestSelectedDateObj && compareDates(self2.latestSelectedDateObj, self2.config.maxDate, true) === 0;
    if (limitMaxHours) {
      const maxTime = self2.config.maxTime !== void 0 ? self2.config.maxTime : self2.config.maxDate;
      hours = Math.min(hours, maxTime.getHours());
      if (hours === maxTime.getHours())
        minutes = Math.min(minutes, maxTime.getMinutes());
      if (minutes === maxTime.getMinutes())
        seconds = Math.min(seconds, maxTime.getSeconds());
    }
    if (limitMinHours) {
      const minTime = self2.config.minTime !== void 0 ? self2.config.minTime : self2.config.minDate;
      hours = Math.max(hours, minTime.getHours());
      if (hours === minTime.getHours() && minutes < minTime.getMinutes())
        minutes = minTime.getMinutes();
      if (minutes === minTime.getMinutes())
        seconds = Math.max(seconds, minTime.getSeconds());
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    const date = dateObj || self2.latestSelectedDateObj;
    if (date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self2.latestSelectedDateObj !== void 0) {
      self2.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self2.hourElement || !self2.minuteElement || self2.isMobile)
      return;
    self2.hourElement.value = pad(!self2.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
    self2.minuteElement.value = pad(minutes);
    if (self2.amPM !== void 0)
      self2.amPM.textContent = self2.l10n.amPM[int(hours >= 12)];
    if (self2.secondElement !== void 0)
      self2.secondElement.value = pad(seconds);
  }
  function onYearInput(event) {
    const eventTarget = getEventTarget(event);
    const year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element2, event, handler2, options) {
    if (event instanceof Array)
      return event.forEach((ev) => bind(element2, ev, handler2, options));
    if (element2 instanceof Array)
      return element2.forEach((el) => bind(el, event, handler2, options));
    element2.addEventListener(event, handler2, options);
    self2._handlers.push({
      remove: () => element2.removeEventListener(event, handler2)
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self2.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach((evt) => {
        Array.prototype.forEach.call(self2.element.querySelectorAll(`[data-${evt}]`), (el) => bind(el, "click", self2[evt]));
      });
    }
    if (self2.isMobile) {
      setupMobile();
      return;
    }
    const debouncedResize = debounce(onResize, 50);
    self2._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self2.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
      bind(self2.daysContainer, "mouseover", (e2) => {
        if (self2.config.mode === "range")
          onMouseOver(getEventTarget(e2));
      });
    bind(window.document.body, "keydown", onKeyDown);
    if (!self2.config.inline && !self2.config.static)
      bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== void 0)
      bind(window.document, "touchstart", documentClick);
    else
      bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, { capture: true });
    if (self2.config.clickOpens === true) {
      bind(self2._input, "focus", self2.open);
      bind(self2._input, "click", self2.open);
    }
    if (self2.daysContainer !== void 0) {
      bind(self2.monthNav, "click", onMonthNavClick);
      bind(self2.monthNav, ["keyup", "increment"], onYearInput);
      bind(self2.daysContainer, "click", selectDate);
    }
    if (self2.timeContainer !== void 0 && self2.minuteElement !== void 0 && self2.hourElement !== void 0) {
      const selText = (e2) => getEventTarget(e2).select();
      bind(self2.timeContainer, ["increment"], updateTime);
      bind(self2.timeContainer, "blur", updateTime, { capture: true });
      bind(self2.timeContainer, "click", timeIncrement);
      bind([self2.hourElement, self2.minuteElement], ["focus", "click"], selText);
      if (self2.secondElement !== void 0)
        bind(self2.secondElement, "focus", () => self2.secondElement && self2.secondElement.select());
      if (self2.amPM !== void 0) {
        bind(self2.amPM, "click", (e2) => {
          updateTime(e2);
          triggerChange();
        });
      }
    }
    if (self2.config.allowInput) {
      bind(self2._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange2) {
    const jumpTo = jumpDate !== void 0 ? self2.parseDate(jumpDate) : self2.latestSelectedDateObj || (self2.config.minDate && self2.config.minDate > self2.now ? self2.config.minDate : self2.config.maxDate && self2.config.maxDate < self2.now ? self2.config.maxDate : self2.now);
    const oldYear = self2.currentYear;
    const oldMonth = self2.currentMonth;
    try {
      if (jumpTo !== void 0) {
        self2.currentYear = jumpTo.getFullYear();
        self2.currentMonth = jumpTo.getMonth();
      }
    } catch (e2) {
      e2.message = "Invalid date supplied: " + jumpTo;
      self2.config.errorHandler(e2);
    }
    if (triggerChange2 && self2.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange2 && (self2.currentYear !== oldYear || self2.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self2.redraw();
  }
  function timeIncrement(e2) {
    const eventTarget = getEventTarget(e2);
    if (~eventTarget.className.indexOf("arrow"))
      incrementNumInput(e2, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e2, delta, inputElem) {
    const target = e2 && getEventTarget(e2);
    const input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    const event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build() {
    const fragment = window.document.createDocumentFragment();
    self2.calendarContainer = createElement("div", "flatpickr-calendar");
    self2.calendarContainer.tabIndex = -1;
    if (!self2.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self2.innerContainer = createElement("div", "flatpickr-innerContainer");
      if (self2.config.weekNumbers) {
        const { weekWrapper, weekNumbers } = buildWeeks();
        self2.innerContainer.appendChild(weekWrapper);
        self2.weekNumbers = weekNumbers;
        self2.weekWrapper = weekWrapper;
      }
      self2.rContainer = createElement("div", "flatpickr-rContainer");
      self2.rContainer.appendChild(buildWeekdays());
      if (!self2.daysContainer) {
        self2.daysContainer = createElement("div", "flatpickr-days");
        self2.daysContainer.tabIndex = -1;
      }
      buildDays();
      self2.rContainer.appendChild(self2.daysContainer);
      self2.innerContainer.appendChild(self2.rContainer);
      fragment.appendChild(self2.innerContainer);
    }
    if (self2.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    toggleClass(self2.calendarContainer, "rangeMode", self2.config.mode === "range");
    toggleClass(self2.calendarContainer, "animate", self2.config.animate === true);
    toggleClass(self2.calendarContainer, "multiMonth", self2.config.showMonths > 1);
    self2.calendarContainer.appendChild(fragment);
    const customAppend = self2.config.appendTo !== void 0 && self2.config.appendTo.nodeType !== void 0;
    if (self2.config.inline || self2.config.static) {
      self2.calendarContainer.classList.add(self2.config.inline ? "inline" : "static");
      if (self2.config.inline) {
        if (!customAppend && self2.element.parentNode)
          self2.element.parentNode.insertBefore(self2.calendarContainer, self2._input.nextSibling);
        else if (self2.config.appendTo !== void 0)
          self2.config.appendTo.appendChild(self2.calendarContainer);
      }
      if (self2.config.static) {
        const wrapper = createElement("div", "flatpickr-wrapper");
        if (self2.element.parentNode)
          self2.element.parentNode.insertBefore(wrapper, self2.element);
        wrapper.appendChild(self2.element);
        if (self2.altInput)
          wrapper.appendChild(self2.altInput);
        wrapper.appendChild(self2.calendarContainer);
      }
    }
    if (!self2.config.static && !self2.config.inline)
      (self2.config.appendTo !== void 0 ? self2.config.appendTo : window.document.body).appendChild(self2.calendarContainer);
  }
  function createDay(className, date, dayNumber, i2) {
    const dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i2;
    dayElement.setAttribute("aria-label", self2.formatDate(date, self2.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && compareDates(date, self2.now) === 0) {
      self2.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self2.selectedDateElem = dayElement;
        if (self2.config.mode === "range") {
          toggleClass(dayElement, "startRange", self2.selectedDates[0] && compareDates(date, self2.selectedDates[0], true) === 0);
          toggleClass(dayElement, "endRange", self2.selectedDates[1] && compareDates(date, self2.selectedDates[1], true) === 0);
          if (className === "nextMonthDay")
            dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self2.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date))
        dayElement.classList.add("inRange");
    }
    if (self2.weekNumbers && self2.config.showMonths === 1 && className !== "prevMonthDay" && dayNumber % 7 === 1) {
      self2.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self2.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self2.config.mode === "range")
      onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    const startMonth = delta > 0 ? 0 : self2.config.showMonths - 1;
    const endMonth = delta > 0 ? self2.config.showMonths : -1;
    for (let m2 = startMonth; m2 != endMonth; m2 += delta) {
      const month = self2.daysContainer.children[m2];
      const startIndex = delta > 0 ? 0 : month.children.length - 1;
      const endIndex = delta > 0 ? month.children.length : -1;
      for (let i2 = startIndex; i2 != endIndex; i2 += delta) {
        const c = month.children[i2];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
          return c;
      }
    }
    return void 0;
  }
  function getNextAvailableDay(current, delta) {
    const givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self2.currentMonth;
    const endMonth = delta > 0 ? self2.config.showMonths : -1;
    const loopDelta = delta > 0 ? 1 : -1;
    for (let m2 = givenMonth - self2.currentMonth; m2 != endMonth; m2 += loopDelta) {
      const month = self2.daysContainer.children[m2];
      const startIndex = givenMonth - self2.currentMonth === m2 ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      const numMonthDays = month.children.length;
      for (let i2 = startIndex; i2 >= 0 && i2 < numMonthDays && i2 != (delta > 0 ? numMonthDays : -1); i2 += loopDelta) {
        const c = month.children[i2];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i2) >= Math.abs(delta))
          return focusOnDayElem(c);
      }
    }
    self2.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return void 0;
  }
  function focusOnDay(current, offset) {
    const dayFocused = isInView(document.activeElement || document.body);
    const startElem = current !== void 0 ? current : dayFocused ? document.activeElement : self2.selectedDateElem !== void 0 && isInView(self2.selectedDateElem) ? self2.selectedDateElem : self2.todayDateElem !== void 0 && isInView(self2.todayDateElem) ? self2.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === void 0) {
      self2._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    const firstOfMonth = (new Date(year, month, 1).getDay() - self2.l10n.firstDayOfWeek + 7) % 7;
    const prevMonthDays = self2.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    const daysInMonth = self2.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self2.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    let dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self2.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    const dayContainer = createElement("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self2.daysContainer === void 0) {
      return;
    }
    clearNode(self2.daysContainer);
    if (self2.weekNumbers)
      clearNode(self2.weekNumbers);
    const frag = document.createDocumentFragment();
    for (let i2 = 0; i2 < self2.config.showMonths; i2++) {
      const d = new Date(self2.currentYear, self2.currentMonth, 1);
      d.setMonth(self2.currentMonth + i2);
      frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
    }
    self2.daysContainer.appendChild(frag);
    self2.days = self2.daysContainer.firstChild;
    if (self2.config.mode === "range" && self2.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self2.config.showMonths > 1 || self2.config.monthSelectorType !== "dropdown")
      return;
    const shouldBuildMonth = function(month) {
      if (self2.config.minDate !== void 0 && self2.currentYear === self2.config.minDate.getFullYear() && month < self2.config.minDate.getMonth()) {
        return false;
      }
      return !(self2.config.maxDate !== void 0 && self2.currentYear === self2.config.maxDate.getFullYear() && month > self2.config.maxDate.getMonth());
    };
    self2.monthsDropdownContainer.tabIndex = -1;
    self2.monthsDropdownContainer.innerHTML = "";
    for (let i2 = 0; i2 < 12; i2++) {
      if (!shouldBuildMonth(i2))
        continue;
      const month = createElement("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self2.currentYear, i2).getMonth().toString();
      month.textContent = monthToStr(i2, self2.config.shorthandCurrentMonth, self2.l10n);
      month.tabIndex = -1;
      if (self2.currentMonth === i2) {
        month.selected = true;
      }
      self2.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    const container = createElement("div", "flatpickr-month");
    const monthNavFragment = window.document.createDocumentFragment();
    let monthElement;
    if (self2.config.showMonths > 1 || self2.config.monthSelectorType === "static") {
      monthElement = createElement("span", "cur-month");
    } else {
      self2.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
      self2.monthsDropdownContainer.setAttribute("aria-label", self2.l10n.monthAriaLabel);
      bind(self2.monthsDropdownContainer, "change", (e2) => {
        const target = getEventTarget(e2);
        const selectedMonth = parseInt(target.value, 10);
        self2.changeMonth(selectedMonth - self2.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self2.monthsDropdownContainer;
    }
    const yearInput = createNumberInput("cur-year", { tabindex: "-1" });
    const yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self2.l10n.yearAriaLabel);
    if (self2.config.minDate) {
      yearElement.setAttribute("min", self2.config.minDate.getFullYear().toString());
    }
    if (self2.config.maxDate) {
      yearElement.setAttribute("max", self2.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self2.config.minDate && self2.config.minDate.getFullYear() === self2.config.maxDate.getFullYear();
    }
    const currentMonth = createElement("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container,
      yearElement,
      monthElement
    };
  }
  function buildMonths() {
    clearNode(self2.monthNav);
    self2.monthNav.appendChild(self2.prevMonthNav);
    if (self2.config.showMonths) {
      self2.yearElements = [];
      self2.monthElements = [];
    }
    for (let m2 = self2.config.showMonths; m2--; ) {
      const month = buildMonth();
      self2.yearElements.push(month.yearElement);
      self2.monthElements.push(month.monthElement);
      self2.monthNav.appendChild(month.container);
    }
    self2.monthNav.appendChild(self2.nextMonthNav);
  }
  function buildMonthNav() {
    self2.monthNav = createElement("div", "flatpickr-months");
    self2.yearElements = [];
    self2.monthElements = [];
    self2.prevMonthNav = createElement("span", "flatpickr-prev-month");
    self2.prevMonthNav.innerHTML = self2.config.prevArrow;
    self2.nextMonthNav = createElement("span", "flatpickr-next-month");
    self2.nextMonthNav.innerHTML = self2.config.nextArrow;
    buildMonths();
    Object.defineProperty(self2, "_hidePrevMonthArrow", {
      get: () => self2.__hidePrevMonthArrow,
      set(bool) {
        if (self2.__hidePrevMonthArrow !== bool) {
          toggleClass(self2.prevMonthNav, "flatpickr-disabled", bool);
          self2.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self2, "_hideNextMonthArrow", {
      get: () => self2.__hideNextMonthArrow,
      set(bool) {
        if (self2.__hideNextMonthArrow !== bool) {
          toggleClass(self2.nextMonthNav, "flatpickr-disabled", bool);
          self2.__hideNextMonthArrow = bool;
        }
      }
    });
    self2.currentYearElement = self2.yearElements[0];
    updateNavigationCurrentMonth();
    return self2.monthNav;
  }
  function buildTime() {
    self2.calendarContainer.classList.add("hasTime");
    if (self2.config.noCalendar)
      self2.calendarContainer.classList.add("noCalendar");
    const defaults2 = getDefaultHours(self2.config);
    self2.timeContainer = createElement("div", "flatpickr-time");
    self2.timeContainer.tabIndex = -1;
    const separator = createElement("span", "flatpickr-time-separator", ":");
    const hourInput = createNumberInput("flatpickr-hour", {
      "aria-label": self2.l10n.hourAriaLabel
    });
    self2.hourElement = hourInput.getElementsByTagName("input")[0];
    const minuteInput = createNumberInput("flatpickr-minute", {
      "aria-label": self2.l10n.minuteAriaLabel
    });
    self2.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self2.hourElement.tabIndex = self2.minuteElement.tabIndex = -1;
    self2.hourElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getHours() : self2.config.time_24hr ? defaults2.hours : military2ampm(defaults2.hours));
    self2.minuteElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getMinutes() : defaults2.minutes);
    self2.hourElement.setAttribute("step", self2.config.hourIncrement.toString());
    self2.minuteElement.setAttribute("step", self2.config.minuteIncrement.toString());
    self2.hourElement.setAttribute("min", self2.config.time_24hr ? "0" : "1");
    self2.hourElement.setAttribute("max", self2.config.time_24hr ? "23" : "12");
    self2.hourElement.setAttribute("maxlength", "2");
    self2.minuteElement.setAttribute("min", "0");
    self2.minuteElement.setAttribute("max", "59");
    self2.minuteElement.setAttribute("maxlength", "2");
    self2.timeContainer.appendChild(hourInput);
    self2.timeContainer.appendChild(separator);
    self2.timeContainer.appendChild(minuteInput);
    if (self2.config.time_24hr)
      self2.timeContainer.classList.add("time24hr");
    if (self2.config.enableSeconds) {
      self2.timeContainer.classList.add("hasSeconds");
      const secondInput = createNumberInput("flatpickr-second");
      self2.secondElement = secondInput.getElementsByTagName("input")[0];
      self2.secondElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getSeconds() : defaults2.seconds);
      self2.secondElement.setAttribute("step", self2.minuteElement.getAttribute("step"));
      self2.secondElement.setAttribute("min", "0");
      self2.secondElement.setAttribute("max", "59");
      self2.secondElement.setAttribute("maxlength", "2");
      self2.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
      self2.timeContainer.appendChild(secondInput);
    }
    if (!self2.config.time_24hr) {
      self2.amPM = createElement("span", "flatpickr-am-pm", self2.l10n.amPM[int((self2.latestSelectedDateObj ? self2.hourElement.value : self2.config.defaultHour) > 11)]);
      self2.amPM.title = self2.l10n.toggleTitle;
      self2.amPM.tabIndex = -1;
      self2.timeContainer.appendChild(self2.amPM);
    }
    return self2.timeContainer;
  }
  function buildWeekdays() {
    if (!self2.weekdayContainer)
      self2.weekdayContainer = createElement("div", "flatpickr-weekdays");
    else
      clearNode(self2.weekdayContainer);
    for (let i2 = self2.config.showMonths; i2--; ) {
      const container = createElement("div", "flatpickr-weekdaycontainer");
      self2.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self2.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self2.weekdayContainer) {
      return;
    }
    const firstDayOfWeek = self2.l10n.firstDayOfWeek;
    let weekdays = [...self2.l10n.weekdays.shorthand];
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = [
        ...weekdays.splice(firstDayOfWeek, weekdays.length),
        ...weekdays.splice(0, firstDayOfWeek)
      ];
    }
    for (let i2 = self2.config.showMonths; i2--; ) {
      self2.weekdayContainer.children[i2].innerHTML = `
      <span class='flatpickr-weekday'>
        ${weekdays.join("</span><span class='flatpickr-weekday'>")}
      </span>
      `;
    }
  }
  function buildWeeks() {
    self2.calendarContainer.classList.add("hasWeeks");
    const weekWrapper = createElement("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self2.l10n.weekAbbreviation));
    const weekNumbers = createElement("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper,
      weekNumbers
    };
  }
  function changeMonth(value, isOffset = true) {
    const delta = isOffset ? value : value - self2.currentMonth;
    if (delta < 0 && self2._hidePrevMonthArrow === true || delta > 0 && self2._hideNextMonthArrow === true)
      return;
    self2.currentMonth += delta;
    if (self2.currentMonth < 0 || self2.currentMonth > 11) {
      self2.currentYear += self2.currentMonth > 11 ? 1 : -1;
      self2.currentMonth = (self2.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear(triggerChangeEvent = true, toInitial = true) {
    self2.input.value = "";
    if (self2.altInput !== void 0)
      self2.altInput.value = "";
    if (self2.mobileInput !== void 0)
      self2.mobileInput.value = "";
    self2.selectedDates = [];
    self2.latestSelectedDateObj = void 0;
    if (toInitial === true) {
      self2.currentYear = self2._initialDate.getFullYear();
      self2.currentMonth = self2._initialDate.getMonth();
    }
    if (self2.config.enableTime === true) {
      const { hours, minutes, seconds } = getDefaultHours(self2.config);
      setHours(hours, minutes, seconds);
    }
    self2.redraw();
    if (triggerChangeEvent)
      triggerEvent("onChange");
  }
  function close() {
    self2.isOpen = false;
    if (!self2.isMobile) {
      if (self2.calendarContainer !== void 0) {
        self2.calendarContainer.classList.remove("open");
      }
      if (self2._input !== void 0) {
        self2._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self2.config !== void 0)
      triggerEvent("onDestroy");
    for (let i2 = self2._handlers.length; i2--; ) {
      self2._handlers[i2].remove();
    }
    self2._handlers = [];
    if (self2.mobileInput) {
      if (self2.mobileInput.parentNode)
        self2.mobileInput.parentNode.removeChild(self2.mobileInput);
      self2.mobileInput = void 0;
    } else if (self2.calendarContainer && self2.calendarContainer.parentNode) {
      if (self2.config.static && self2.calendarContainer.parentNode) {
        const wrapper = self2.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild)
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else
        self2.calendarContainer.parentNode.removeChild(self2.calendarContainer);
    }
    if (self2.altInput) {
      self2.input.type = "text";
      if (self2.altInput.parentNode)
        self2.altInput.parentNode.removeChild(self2.altInput);
      delete self2.altInput;
    }
    if (self2.input) {
      self2.input.type = self2.input._type;
      self2.input.classList.remove("flatpickr-input");
      self2.input.removeAttribute("readonly");
    }
    [
      "_showTimeInput",
      "latestSelectedDateObj",
      "_hideNextMonthArrow",
      "_hidePrevMonthArrow",
      "__hideNextMonthArrow",
      "__hidePrevMonthArrow",
      "isMobile",
      "isOpen",
      "selectedDateElem",
      "minDateHasTime",
      "maxDateHasTime",
      "days",
      "daysContainer",
      "_input",
      "_positionElement",
      "innerContainer",
      "rContainer",
      "monthNav",
      "todayDateElem",
      "calendarContainer",
      "weekdayContainer",
      "prevMonthNav",
      "nextMonthNav",
      "monthsDropdownContainer",
      "currentMonthElement",
      "currentYearElement",
      "navigationCurrentMonth",
      "selectedDateElem",
      "config"
    ].forEach((k) => {
      try {
        delete self2[k];
      } catch (_) {
      }
    });
  }
  function isCalendarElem(elem) {
    if (self2.config.appendTo && self2.config.appendTo.contains(elem))
      return true;
    return self2.calendarContainer.contains(elem);
  }
  function documentClick(e2) {
    if (self2.isOpen && !self2.config.inline) {
      const eventTarget = getEventTarget(e2);
      const isCalendarElement = isCalendarElem(eventTarget);
      const isInput = eventTarget === self2.input || eventTarget === self2.altInput || self2.element.contains(eventTarget) || e2.path && e2.path.indexOf && (~e2.path.indexOf(self2.input) || ~e2.path.indexOf(self2.altInput));
      const lostFocus = e2.type === "blur" ? isInput && e2.relatedTarget && !isCalendarElem(e2.relatedTarget) : !isInput && !isCalendarElement && !isCalendarElem(e2.relatedTarget);
      const isIgnored = !self2.config.ignoredFocusElements.some((elem) => elem.contains(eventTarget));
      if (lostFocus && isIgnored) {
        if (self2.timeContainer !== void 0 && self2.minuteElement !== void 0 && self2.hourElement !== void 0 && self2.input.value !== "" && self2.input.value !== void 0) {
          updateTime();
        }
        self2.close();
        if (self2.config && self2.config.mode === "range" && self2.selectedDates.length === 1) {
          self2.clear(false);
          self2.redraw();
        }
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self2.config.minDate && newYear < self2.config.minDate.getFullYear() || self2.config.maxDate && newYear > self2.config.maxDate.getFullYear())
      return;
    const newYearNum = newYear, isNewYear = self2.currentYear !== newYearNum;
    self2.currentYear = newYearNum || self2.currentYear;
    if (self2.config.maxDate && self2.currentYear === self2.config.maxDate.getFullYear()) {
      self2.currentMonth = Math.min(self2.config.maxDate.getMonth(), self2.currentMonth);
    } else if (self2.config.minDate && self2.currentYear === self2.config.minDate.getFullYear()) {
      self2.currentMonth = Math.max(self2.config.minDate.getMonth(), self2.currentMonth);
    }
    if (isNewYear) {
      self2.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date, timeless = true) {
    var _a4;
    const dateToCheck = self2.parseDate(date, void 0, timeless);
    if (self2.config.minDate && dateToCheck && compareDates(dateToCheck, self2.config.minDate, timeless !== void 0 ? timeless : !self2.minDateHasTime) < 0 || self2.config.maxDate && dateToCheck && compareDates(dateToCheck, self2.config.maxDate, timeless !== void 0 ? timeless : !self2.maxDateHasTime) > 0)
      return false;
    if (!self2.config.enable && self2.config.disable.length === 0)
      return true;
    if (dateToCheck === void 0)
      return false;
    const bool = !!self2.config.enable, array = (_a4 = self2.config.enable) !== null && _a4 !== void 0 ? _a4 : self2.config.disable;
    for (let i2 = 0, d; i2 < array.length; i2++) {
      d = array[i2];
      if (typeof d === "function" && d(dateToCheck))
        return bool;
      else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime())
        return bool;
      else if (typeof d === "string") {
        const parsed = self2.parseDate(d, void 0, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime())
        return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self2.daysContainer !== void 0)
      return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self2.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e2) {
    const isInput = e2.target === self2._input;
    if (isInput && (self2.selectedDates.length > 0 || self2._input.value.length > 0) && !(e2.relatedTarget && isCalendarElem(e2.relatedTarget))) {
      self2.setDate(self2._input.value, true, e2.target === self2.altInput ? self2.config.altFormat : self2.config.dateFormat);
    }
  }
  function onKeyDown(e2) {
    const eventTarget = getEventTarget(e2);
    const isInput = self2.config.wrap ? element.contains(eventTarget) : eventTarget === self2._input;
    const allowInput = self2.config.allowInput;
    const allowKeydown = self2.isOpen && (!allowInput || !isInput);
    const allowInlineKeydown = self2.config.inline && isInput && !allowInput;
    if (e2.keyCode === 13 && isInput) {
      if (allowInput) {
        self2.setDate(self2._input.value, true, eventTarget === self2.altInput ? self2.config.altFormat : self2.config.dateFormat);
        return eventTarget.blur();
      } else {
        self2.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      const isTimeObj = !!self2.timeContainer && self2.timeContainer.contains(eventTarget);
      switch (e2.keyCode) {
        case 13:
          if (isTimeObj) {
            e2.preventDefault();
            updateTime();
            focusAndClose();
          } else
            selectDate(e2);
          break;
        case 27:
          e2.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self2.config.allowInput) {
            e2.preventDefault();
            self2.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e2.preventDefault();
            if (self2.daysContainer !== void 0 && (allowInput === false || document.activeElement && isInView(document.activeElement))) {
              const delta2 = e2.keyCode === 39 ? 1 : -1;
              if (!e2.ctrlKey)
                focusOnDay(void 0, delta2);
              else {
                e2.stopPropagation();
                changeMonth(delta2);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self2.hourElement)
            self2.hourElement.focus();
          break;
        case 38:
        case 40:
          e2.preventDefault();
          const delta = e2.keyCode === 40 ? 1 : -1;
          if (self2.daysContainer && eventTarget.$i !== void 0 || eventTarget === self2.input || eventTarget === self2.altInput) {
            if (e2.ctrlKey) {
              e2.stopPropagation();
              changeYear(self2.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj)
              focusOnDay(void 0, delta * 7);
          } else if (eventTarget === self2.currentYearElement) {
            changeYear(self2.currentYear - delta);
          } else if (self2.config.enableTime) {
            if (!isTimeObj && self2.hourElement)
              self2.hourElement.focus();
            updateTime(e2);
            self2._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            const elems = [
              self2.hourElement,
              self2.minuteElement,
              self2.secondElement,
              self2.amPM
            ].concat(self2.pluginElements).filter((x2) => x2);
            const i2 = elems.indexOf(eventTarget);
            if (i2 !== -1) {
              const target = elems[i2 + (e2.shiftKey ? -1 : 1)];
              e2.preventDefault();
              (target || self2._input).focus();
            }
          } else if (!self2.config.noCalendar && self2.daysContainer && self2.daysContainer.contains(eventTarget) && e2.shiftKey) {
            e2.preventDefault();
            self2._input.focus();
          }
          break;
      }
    }
    if (self2.amPM !== void 0 && eventTarget === self2.amPM) {
      switch (e2.key) {
        case self2.l10n.amPM[0].charAt(0):
        case self2.l10n.amPM[0].charAt(0).toLowerCase():
          self2.amPM.textContent = self2.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self2.l10n.amPM[1].charAt(0):
        case self2.l10n.amPM[1].charAt(0).toLowerCase():
          self2.amPM.textContent = self2.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e2);
    }
  }
  function onMouseOver(elem) {
    if (self2.selectedDates.length !== 1 || elem && (!elem.classList.contains("flatpickr-day") || elem.classList.contains("flatpickr-disabled")))
      return;
    const hoverDate = elem ? elem.dateObj.getTime() : self2.days.firstElementChild.dateObj.getTime(), initialDate = self2.parseDate(self2.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self2.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self2.selectedDates[0].getTime());
    let containsDisabled = false;
    let minRange = 0, maxRange = 0;
    for (let t2 = rangeStartDate; t2 < rangeEndDate; t2 += duration.DAY) {
      if (!isEnabled(new Date(t2), true)) {
        containsDisabled = containsDisabled || t2 > rangeStartDate && t2 < rangeEndDate;
        if (t2 < initialDate && (!minRange || t2 > minRange))
          minRange = t2;
        else if (t2 > initialDate && (!maxRange || t2 < maxRange))
          maxRange = t2;
      }
    }
    for (let m2 = 0; m2 < self2.config.showMonths; m2++) {
      const month = self2.daysContainer.children[m2];
      for (let i2 = 0, l = month.children.length; i2 < l; i2++) {
        const dayElem = month.children[i2], date = dayElem.dateObj;
        const timestamp = date.getTime();
        const outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
        if (outOfRange) {
          dayElem.classList.add("notAllowed");
          ["inRange", "startRange", "endRange"].forEach((c) => {
            dayElem.classList.remove(c);
          });
          continue;
        } else if (containsDisabled && !outOfRange)
          continue;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach((c) => {
          dayElem.classList.remove(c);
        });
        if (elem !== void 0) {
          elem.classList.add(hoverDate <= self2.selectedDates[0].getTime() ? "startRange" : "endRange");
          if (initialDate < hoverDate && timestamp === initialDate)
            dayElem.classList.add("startRange");
          else if (initialDate > hoverDate && timestamp === initialDate)
            dayElem.classList.add("endRange");
          if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate))
            dayElem.classList.add("inRange");
        }
      }
    }
  }
  function onResize() {
    if (self2.isOpen && !self2.config.static && !self2.config.inline)
      positionCalendar();
  }
  function open(e2, positionElement = self2._positionElement) {
    if (self2.isMobile === true) {
      if (e2) {
        e2.preventDefault();
        const eventTarget = getEventTarget(e2);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self2.mobileInput !== void 0) {
        self2.mobileInput.focus();
        self2.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self2._input.disabled || self2.config.inline) {
      return;
    }
    const wasOpen = self2.isOpen;
    self2.isOpen = true;
    if (!wasOpen) {
      self2.calendarContainer.classList.add("open");
      self2._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self2.config.enableTime === true && self2.config.noCalendar === true) {
      if (self2.config.allowInput === false && (e2 === void 0 || !self2.timeContainer.contains(e2.relatedTarget))) {
        setTimeout(() => self2.hourElement.select(), 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return (date) => {
      const dateObj = self2.config[`_${type}Date`] = self2.parseDate(date, self2.config.dateFormat);
      const inverseDateObj = self2.config[`_${type === "min" ? "max" : "min"}Date`];
      if (dateObj !== void 0) {
        self2[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self2.selectedDates) {
        self2.selectedDates = self2.selectedDates.filter((d) => isEnabled(d));
        if (!self2.selectedDates.length && type === "min")
          setHoursFromDate(dateObj);
        updateValue();
      }
      if (self2.daysContainer) {
        redraw();
        if (dateObj !== void 0)
          self2.currentYearElement[type] = dateObj.getFullYear().toString();
        else
          self2.currentYearElement.removeAttribute(type);
        self2.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    const boolOpts = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ];
    const userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    const formats2 = {};
    self2.config.parseDate = userConfig.parseDate;
    self2.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self2.config, "enable", {
      get: () => self2.config._enable,
      set: (dates) => {
        self2.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self2.config, "disable", {
      get: () => self2.config._disable,
      set: (dates) => {
        self2.config._disable = parseDateRules(dates);
      }
    });
    const timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      const defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
      formats2.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      const defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
      formats2.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + ` h:i${userConfig.enableSeconds ? ":S" : ""} K`;
    }
    Object.defineProperty(self2.config, "minDate", {
      get: () => self2.config._minDate,
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self2.config, "maxDate", {
      get: () => self2.config._maxDate,
      set: minMaxDateSetter("max")
    });
    const minMaxTimeSetter = (type) => (val) => {
      self2.config[type === "min" ? "_minTime" : "_maxTime"] = self2.parseDate(val, "H:i:S");
    };
    Object.defineProperty(self2.config, "minTime", {
      get: () => self2.config._minTime,
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self2.config, "maxTime", {
      get: () => self2.config._maxTime,
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self2.config.noCalendar = true;
      self2.config.enableTime = true;
    }
    Object.assign(self2.config, formats2, userConfig);
    for (let i2 = 0; i2 < boolOpts.length; i2++)
      self2.config[boolOpts[i2]] = self2.config[boolOpts[i2]] === true || self2.config[boolOpts[i2]] === "true";
    HOOKS.filter((hook) => self2.config[hook] !== void 0).forEach((hook) => {
      self2.config[hook] = arrayify(self2.config[hook] || []).map(bindToInstance);
    });
    self2.isMobile = !self2.config.disableMobile && !self2.config.inline && self2.config.mode === "single" && !self2.config.disable.length && !self2.config.enable && !self2.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (let i2 = 0; i2 < self2.config.plugins.length; i2++) {
      const pluginConf = self2.config.plugins[i2](self2) || {};
      for (const key2 in pluginConf) {
        if (HOOKS.indexOf(key2) > -1) {
          self2.config[key2] = arrayify(pluginConf[key2]).map(bindToInstance).concat(self2.config[key2]);
        } else if (typeof userConfig[key2] === "undefined")
          self2.config[key2] = pluginConf[key2];
      }
    }
    if (!userConfig.altInputClass) {
      self2.config.altInputClass = getInputElem().className + " " + self2.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self2.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self2.config.locale !== "object" && typeof flatpickr.l10ns[self2.config.locale] === "undefined")
      self2.config.errorHandler(new Error(`flatpickr: invalid locale ${self2.config.locale}`));
    self2.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), typeof self2.config.locale === "object" ? self2.config.locale : self2.config.locale !== "default" ? flatpickr.l10ns[self2.config.locale] : void 0);
    tokenRegex.K = `(${self2.l10n.amPM[0]}|${self2.l10n.amPM[1]}|${self2.l10n.amPM[0].toLowerCase()}|${self2.l10n.amPM[1].toLowerCase()})`;
    const userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) {
      self2.config.time_24hr = self2.l10n.time_24hr;
    }
    self2.formatDate = createDateFormatter(self2);
    self2.parseDate = createDateParser({ config: self2.config, l10n: self2.l10n });
  }
  function positionCalendar(customPositionElement) {
    if (typeof self2.config.position === "function") {
      return void self2.config.position(self2, customPositionElement);
    }
    if (self2.calendarContainer === void 0)
      return;
    triggerEvent("onPreCalendarPosition");
    const positionElement = customPositionElement || self2._positionElement;
    const calendarHeight = Array.prototype.reduce.call(self2.calendarContainer.children, (acc, child) => acc + child.offsetHeight, 0), calendarWidth = self2.calendarContainer.offsetWidth, configPos = self2.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    const top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    toggleClass(self2.calendarContainer, "arrowTop", !showOnTop);
    toggleClass(self2.calendarContainer, "arrowBottom", showOnTop);
    if (self2.config.inline)
      return;
    let left = window.pageXOffset + inputBounds.left;
    let isCenter = false;
    let isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    toggleClass(self2.calendarContainer, "arrowLeft", !isCenter && !isRight);
    toggleClass(self2.calendarContainer, "arrowCenter", isCenter);
    toggleClass(self2.calendarContainer, "arrowRight", isRight);
    const right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    const rightMost = left + calendarWidth > window.document.body.offsetWidth;
    const centerMost = right + calendarWidth > window.document.body.offsetWidth;
    toggleClass(self2.calendarContainer, "rightMost", rightMost);
    if (self2.config.static)
      return;
    self2.calendarContainer.style.top = `${top}px`;
    if (!rightMost) {
      self2.calendarContainer.style.left = `${left}px`;
      self2.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self2.calendarContainer.style.left = "auto";
      self2.calendarContainer.style.right = `${right}px`;
    } else {
      const doc = getDocumentStyleSheet();
      if (doc === void 0)
        return;
      const bodyWidth = window.document.body.offsetWidth;
      const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      const centerBefore = ".flatpickr-calendar.centerMost:before";
      const centerAfter = ".flatpickr-calendar.centerMost:after";
      const centerIndex = doc.cssRules.length;
      const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
      toggleClass(self2.calendarContainer, "rightMost", false);
      toggleClass(self2.calendarContainer, "centerMost", true);
      doc.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
      self2.calendarContainer.style.left = `${centerLeft}px`;
      self2.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    let editableSheet = null;
    for (let i2 = 0; i2 < document.styleSheets.length; i2++) {
      const sheet = document.styleSheets[i2];
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    const style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self2.config.noCalendar || self2.isMobile)
      return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self2._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) {
      setTimeout(self2.close, 0);
    } else {
      self2.close();
    }
  }
  function selectDate(e2) {
    e2.preventDefault();
    e2.stopPropagation();
    const isSelectable = (day) => day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    const t2 = findParent(getEventTarget(e2), isSelectable);
    if (t2 === void 0)
      return;
    const target = t2;
    const selectedDate = self2.latestSelectedDateObj = new Date(target.dateObj.getTime());
    const shouldChangeMonth = (selectedDate.getMonth() < self2.currentMonth || selectedDate.getMonth() > self2.currentMonth + self2.config.showMonths - 1) && self2.config.mode !== "range";
    self2.selectedDateElem = target;
    if (self2.config.mode === "single")
      self2.selectedDates = [selectedDate];
    else if (self2.config.mode === "multiple") {
      const selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex)
        self2.selectedDates.splice(parseInt(selectedIndex), 1);
      else
        self2.selectedDates.push(selectedDate);
    } else if (self2.config.mode === "range") {
      if (self2.selectedDates.length === 2) {
        self2.clear(false, false);
      }
      self2.latestSelectedDateObj = selectedDate;
      self2.selectedDates.push(selectedDate);
      if (compareDates(selectedDate, self2.selectedDates[0], true) !== 0)
        self2.selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      const isNewYear = self2.currentYear !== selectedDate.getFullYear();
      self2.currentYear = selectedDate.getFullYear();
      self2.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self2.config.mode !== "range" && self2.config.showMonths === 1)
      focusOnDayElem(target);
    else if (self2.selectedDateElem !== void 0 && self2.hourElement === void 0) {
      self2.selectedDateElem && self2.selectedDateElem.focus();
    }
    if (self2.hourElement !== void 0)
      self2.hourElement !== void 0 && self2.hourElement.focus();
    if (self2.config.closeOnSelect) {
      const single = self2.config.mode === "single" && !self2.config.enableTime;
      const range = self2.config.mode === "range" && self2.selectedDates.length === 2 && !self2.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  const CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    clickOpens: [
      () => {
        if (self2.config.clickOpens === true) {
          bind(self2._input, "focus", self2.open);
          bind(self2._input, "click", self2.open);
        } else {
          self2._input.removeEventListener("focus", self2.open);
          self2._input.removeEventListener("click", self2.open);
        }
      }
    ]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self2.config, option);
      for (const key2 in option) {
        if (CALLBACKS[key2] !== void 0)
          CALLBACKS[key2].forEach((x2) => x2());
      }
    } else {
      self2.config[option] = value;
      if (CALLBACKS[option] !== void 0)
        CALLBACKS[option].forEach((x2) => x2());
      else if (HOOKS.indexOf(option) > -1)
        self2.config[option] = arrayify(value);
    }
    self2.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format2) {
    let dates = [];
    if (inputDate instanceof Array)
      dates = inputDate.map((d) => self2.parseDate(d, format2));
    else if (inputDate instanceof Date || typeof inputDate === "number")
      dates = [self2.parseDate(inputDate, format2)];
    else if (typeof inputDate === "string") {
      switch (self2.config.mode) {
        case "single":
        case "time":
          dates = [self2.parseDate(inputDate, format2)];
          break;
        case "multiple":
          dates = inputDate.split(self2.config.conjunction).map((date) => self2.parseDate(date, format2));
          break;
        case "range":
          dates = inputDate.split(self2.l10n.rangeSeparator).map((date) => self2.parseDate(date, format2));
          break;
      }
    } else
      self2.config.errorHandler(new Error(`Invalid date supplied: ${JSON.stringify(inputDate)}`));
    self2.selectedDates = self2.config.allowInvalidPreload ? dates : dates.filter((d) => d instanceof Date && isEnabled(d, false));
    if (self2.config.mode === "range")
      self2.selectedDates.sort((a, b) => a.getTime() - b.getTime());
  }
  function setDate(date, triggerChange2 = false, format2 = self2.config.dateFormat) {
    if (date !== 0 && !date || date instanceof Array && date.length === 0)
      return self2.clear(triggerChange2);
    setSelectedDate(date, format2);
    self2.latestSelectedDateObj = self2.selectedDates[self2.selectedDates.length - 1];
    self2.redraw();
    jumpToDate(void 0, triggerChange2);
    setHoursFromDate();
    if (self2.selectedDates.length === 0) {
      self2.clear(false);
    }
    updateValue(triggerChange2);
    if (triggerChange2)
      triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map((rule) => {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self2.parseDate(rule, void 0, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to)
        return {
          from: self2.parseDate(rule.from, void 0),
          to: self2.parseDate(rule.to, void 0)
        };
      return rule;
    }).filter((x2) => x2);
  }
  function setupDates() {
    self2.selectedDates = [];
    self2.now = self2.parseDate(self2.config.now) || new Date();
    const preloadedDate = self2.config.defaultDate || ((self2.input.nodeName === "INPUT" || self2.input.nodeName === "TEXTAREA") && self2.input.placeholder && self2.input.value === self2.input.placeholder ? null : self2.input.value);
    if (preloadedDate)
      setSelectedDate(preloadedDate, self2.config.dateFormat);
    self2._initialDate = self2.selectedDates.length > 0 ? self2.selectedDates[0] : self2.config.minDate && self2.config.minDate.getTime() > self2.now.getTime() ? self2.config.minDate : self2.config.maxDate && self2.config.maxDate.getTime() < self2.now.getTime() ? self2.config.maxDate : self2.now;
    self2.currentYear = self2._initialDate.getFullYear();
    self2.currentMonth = self2._initialDate.getMonth();
    if (self2.selectedDates.length > 0)
      self2.latestSelectedDateObj = self2.selectedDates[0];
    if (self2.config.minTime !== void 0)
      self2.config.minTime = self2.parseDate(self2.config.minTime, "H:i");
    if (self2.config.maxTime !== void 0)
      self2.config.maxTime = self2.parseDate(self2.config.maxTime, "H:i");
    self2.minDateHasTime = !!self2.config.minDate && (self2.config.minDate.getHours() > 0 || self2.config.minDate.getMinutes() > 0 || self2.config.minDate.getSeconds() > 0);
    self2.maxDateHasTime = !!self2.config.maxDate && (self2.config.maxDate.getHours() > 0 || self2.config.maxDate.getMinutes() > 0 || self2.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self2.input = getInputElem();
    if (!self2.input) {
      self2.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self2.input._type = self2.input.type;
    self2.input.type = "text";
    self2.input.classList.add("flatpickr-input");
    self2._input = self2.input;
    if (self2.config.altInput) {
      self2.altInput = createElement(self2.input.nodeName, self2.config.altInputClass);
      self2._input = self2.altInput;
      self2.altInput.placeholder = self2.input.placeholder;
      self2.altInput.disabled = self2.input.disabled;
      self2.altInput.required = self2.input.required;
      self2.altInput.tabIndex = self2.input.tabIndex;
      self2.altInput.type = "text";
      self2.input.setAttribute("type", "hidden");
      if (!self2.config.static && self2.input.parentNode)
        self2.input.parentNode.insertBefore(self2.altInput, self2.input.nextSibling);
    }
    if (!self2.config.allowInput)
      self2._input.setAttribute("readonly", "readonly");
    self2._positionElement = self2.config.positionElement || self2._input;
  }
  function setupMobile() {
    const inputType = self2.config.enableTime ? self2.config.noCalendar ? "time" : "datetime-local" : "date";
    self2.mobileInput = createElement("input", self2.input.className + " flatpickr-mobile");
    self2.mobileInput.tabIndex = 1;
    self2.mobileInput.type = inputType;
    self2.mobileInput.disabled = self2.input.disabled;
    self2.mobileInput.required = self2.input.required;
    self2.mobileInput.placeholder = self2.input.placeholder;
    self2.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self2.selectedDates.length > 0) {
      self2.mobileInput.defaultValue = self2.mobileInput.value = self2.formatDate(self2.selectedDates[0], self2.mobileFormatStr);
    }
    if (self2.config.minDate)
      self2.mobileInput.min = self2.formatDate(self2.config.minDate, "Y-m-d");
    if (self2.config.maxDate)
      self2.mobileInput.max = self2.formatDate(self2.config.maxDate, "Y-m-d");
    if (self2.input.getAttribute("step"))
      self2.mobileInput.step = String(self2.input.getAttribute("step"));
    self2.input.type = "hidden";
    if (self2.altInput !== void 0)
      self2.altInput.type = "hidden";
    try {
      if (self2.input.parentNode)
        self2.input.parentNode.insertBefore(self2.mobileInput, self2.input.nextSibling);
    } catch (_a4) {
    }
    bind(self2.mobileInput, "change", (e2) => {
      self2.setDate(getEventTarget(e2).value, false, self2.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e2) {
    if (self2.isOpen === true)
      return self2.close();
    self2.open(e2);
  }
  function triggerEvent(event, data) {
    if (self2.config === void 0)
      return;
    const hooks = self2.config[event];
    if (hooks !== void 0 && hooks.length > 0) {
      for (let i2 = 0; hooks[i2] && i2 < hooks.length; i2++)
        hooks[i2](self2.selectedDates, self2.input.value, self2, data);
    }
    if (event === "onChange") {
      self2.input.dispatchEvent(createEvent("change"));
      self2.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name) {
    const e2 = document.createEvent("Event");
    e2.initEvent(name, true, true);
    return e2;
  }
  function isDateSelected(date) {
    for (let i2 = 0; i2 < self2.selectedDates.length; i2++) {
      if (compareDates(self2.selectedDates[i2], date) === 0)
        return "" + i2;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self2.config.mode !== "range" || self2.selectedDates.length < 2)
      return false;
    return compareDates(date, self2.selectedDates[0]) >= 0 && compareDates(date, self2.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self2.config.noCalendar || self2.isMobile || !self2.monthNav)
      return;
    self2.yearElements.forEach((yearElement, i2) => {
      const d = new Date(self2.currentYear, self2.currentMonth, 1);
      d.setMonth(self2.currentMonth + i2);
      if (self2.config.showMonths > 1 || self2.config.monthSelectorType === "static") {
        self2.monthElements[i2].textContent = monthToStr(d.getMonth(), self2.config.shorthandCurrentMonth, self2.l10n) + " ";
      } else {
        self2.monthsDropdownContainer.value = d.getMonth().toString();
      }
      yearElement.value = d.getFullYear().toString();
    });
    self2._hidePrevMonthArrow = self2.config.minDate !== void 0 && (self2.currentYear === self2.config.minDate.getFullYear() ? self2.currentMonth <= self2.config.minDate.getMonth() : self2.currentYear < self2.config.minDate.getFullYear());
    self2._hideNextMonthArrow = self2.config.maxDate !== void 0 && (self2.currentYear === self2.config.maxDate.getFullYear() ? self2.currentMonth + 1 > self2.config.maxDate.getMonth() : self2.currentYear > self2.config.maxDate.getFullYear());
  }
  function getDateStr(format2) {
    return self2.selectedDates.map((dObj) => self2.formatDate(dObj, format2)).filter((d, i2, arr) => self2.config.mode !== "range" || self2.config.enableTime || arr.indexOf(d) === i2).join(self2.config.mode !== "range" ? self2.config.conjunction : self2.l10n.rangeSeparator);
  }
  function updateValue(triggerChange2 = true) {
    if (self2.mobileInput !== void 0 && self2.mobileFormatStr) {
      self2.mobileInput.value = self2.latestSelectedDateObj !== void 0 ? self2.formatDate(self2.latestSelectedDateObj, self2.mobileFormatStr) : "";
    }
    self2.input.value = getDateStr(self2.config.dateFormat);
    if (self2.altInput !== void 0) {
      self2.altInput.value = getDateStr(self2.config.altFormat);
    }
    if (triggerChange2 !== false)
      triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e2) {
    const eventTarget = getEventTarget(e2);
    const isPrevMonth = self2.prevMonthNav.contains(eventTarget);
    const isNextMonth = self2.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self2.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self2.changeYear(self2.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self2.changeYear(self2.currentYear - 1);
    }
  }
  function timeWrapper(e2) {
    e2.preventDefault();
    const isKeyDown = e2.type === "keydown", eventTarget = getEventTarget(e2), input = eventTarget;
    if (self2.amPM !== void 0 && eventTarget === self2.amPM) {
      self2.amPM.textContent = self2.l10n.amPM[int(self2.amPM.textContent === self2.l10n.amPM[0])];
    }
    const min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e2.delta || (isKeyDown ? e2.which === 38 ? 1 : -1 : 0);
    let newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      const isHourElem = input === self2.hourElement, isMinuteElem = input === self2.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self2.amPM));
        if (isMinuteElem)
          incrementNumInput(void 0, -1, self2.hourElement);
      } else if (newValue > max) {
        newValue = input === self2.hourElement ? newValue - max - int(!self2.amPM) : min;
        if (isMinuteElem)
          incrementNumInput(void 0, 1, self2.hourElement);
      }
      if (self2.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self2.amPM.textContent = self2.l10n.amPM[int(self2.amPM.textContent === self2.l10n.amPM[0])];
      }
      input.value = pad(newValue);
    }
  }
  init2();
  return self2;
}
function _flatpickr(nodeList, config2) {
  const nodes = Array.prototype.slice.call(nodeList).filter((x2) => x2 instanceof HTMLElement);
  const instances = [];
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    try {
      if (node.getAttribute("data-fp-omit") !== null)
        continue;
      if (node._flatpickr !== void 0) {
        node._flatpickr.destroy();
        node._flatpickr = void 0;
      }
      node._flatpickr = FlatpickrInstance(node, config2 || {});
      instances.push(node._flatpickr);
    } catch (e2) {
      console.error(e2);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
var HOOKS, defaults, english, pad, int, arrayify, doNothing, monthToStr, revFormat, tokenRegex, formats, createDateFormatter, createDateParser, isBetween, duration, DEBOUNCED_CHANGE_MS, flatpickr;
var init_HeaderSearch_svelte_svelte_type_style_lang_e51739eb = __esm({
  ".svelte-kit/output/server/chunks/HeaderSearch.svelte_svelte_type_style_lang-e51739eb.js"() {
    Object.freeze({
      sm: 320,
      md: 672,
      lg: 1056,
      xlg: 1312,
      max: 1584
    });
    HOOKS = [
      "onChange",
      "onClose",
      "onDayCreate",
      "onDestroy",
      "onKeyDown",
      "onMonthChange",
      "onOpen",
      "onParseConfig",
      "onReady",
      "onValueUpdate",
      "onYearChange",
      "onPreCalendarPosition"
    ];
    defaults = {
      _disable: [],
      allowInput: false,
      allowInvalidPreload: false,
      altFormat: "F j, Y",
      altInput: false,
      altInputClass: "form-control input",
      animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
      ariaDateFormat: "F j, Y",
      autoFillDefaultTime: true,
      clickOpens: true,
      closeOnSelect: true,
      conjunction: ", ",
      dateFormat: "Y-m-d",
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: false,
      enableSeconds: false,
      enableTime: false,
      errorHandler: (err) => typeof console !== "undefined" && console.warn(err),
      getWeek: (givenDate) => {
        const date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        var week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: false,
      locale: "default",
      minuteIncrement: 5,
      mode: "single",
      monthSelectorType: "dropdown",
      nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: false,
      now: new Date(),
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      onPreCalendarPosition: [],
      plugins: [],
      position: "auto",
      positionElement: void 0,
      prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: false,
      showMonths: 1,
      static: false,
      time_24hr: false,
      weekNumbers: false,
      wrap: false
    };
    english = {
      weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ]
      },
      months: {
        shorthand: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        longhand: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: (nth) => {
        const s3 = nth % 100;
        if (s3 > 3 && s3 < 21)
          return "th";
        switch (s3 % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      },
      rangeSeparator: " to ",
      weekAbbreviation: "Wk",
      scrollTitle: "Scroll to increment",
      toggleTitle: "Click to toggle",
      amPM: ["AM", "PM"],
      yearAriaLabel: "Year",
      monthAriaLabel: "Month",
      hourAriaLabel: "Hour",
      minuteAriaLabel: "Minute",
      time_24hr: false
    };
    pad = (number, length = 2) => `000${number}`.slice(length * -1);
    int = (bool) => bool === true ? 1 : 0;
    arrayify = (obj) => obj instanceof Array ? obj : [obj];
    doNothing = () => void 0;
    monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
    revFormat = {
      D: doNothing,
      F: function(dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
      },
      G: (dateObj, hour) => {
        dateObj.setHours(parseFloat(hour));
      },
      H: (dateObj, hour) => {
        dateObj.setHours(parseFloat(hour));
      },
      J: (dateObj, day) => {
        dateObj.setDate(parseFloat(day));
      },
      K: (dateObj, amPM, locale) => {
        dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
      },
      M: function(dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
      },
      S: (dateObj, seconds) => {
        dateObj.setSeconds(parseFloat(seconds));
      },
      U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1e3),
      W: function(dateObj, weekNum, locale) {
        const weekNumber = parseInt(weekNum);
        const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
        return date;
      },
      Y: (dateObj, year) => {
        dateObj.setFullYear(parseFloat(year));
      },
      Z: (_, ISODate) => new Date(ISODate),
      d: (dateObj, day) => {
        dateObj.setDate(parseFloat(day));
      },
      h: (dateObj, hour) => {
        dateObj.setHours(parseFloat(hour));
      },
      i: (dateObj, minutes) => {
        dateObj.setMinutes(parseFloat(minutes));
      },
      j: (dateObj, day) => {
        dateObj.setDate(parseFloat(day));
      },
      l: doNothing,
      m: (dateObj, month) => {
        dateObj.setMonth(parseFloat(month) - 1);
      },
      n: (dateObj, month) => {
        dateObj.setMonth(parseFloat(month) - 1);
      },
      s: (dateObj, seconds) => {
        dateObj.setSeconds(parseFloat(seconds));
      },
      u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
      w: doNothing,
      y: (dateObj, year) => {
        dateObj.setFullYear(2e3 + parseFloat(year));
      }
    };
    tokenRegex = {
      D: "(\\w+)",
      F: "(\\w+)",
      G: "(\\d\\d|\\d)",
      H: "(\\d\\d|\\d)",
      J: "(\\d\\d|\\d)\\w+",
      K: "",
      M: "(\\w+)",
      S: "(\\d\\d|\\d)",
      U: "(.+)",
      W: "(\\d\\d|\\d)",
      Y: "(\\d{4})",
      Z: "(.+)",
      d: "(\\d\\d|\\d)",
      h: "(\\d\\d|\\d)",
      i: "(\\d\\d|\\d)",
      j: "(\\d\\d|\\d)",
      l: "(\\w+)",
      m: "(\\d\\d|\\d)",
      n: "(\\d\\d|\\d)",
      s: "(\\d\\d|\\d)",
      u: "(.+)",
      w: "(\\d\\d|\\d)",
      y: "(\\d{2})"
    };
    formats = {
      Z: (date) => date.toISOString(),
      D: function(date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
      },
      F: function(date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
      },
      G: function(date, locale, options) {
        return pad(formats.h(date, locale, options));
      },
      H: (date) => pad(date.getHours()),
      J: function(date, locale) {
        return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
      },
      K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
      M: function(date, locale) {
        return monthToStr(date.getMonth(), true, locale);
      },
      S: (date) => pad(date.getSeconds()),
      U: (date) => date.getTime() / 1e3,
      W: function(date, _, options) {
        return options.getWeek(date);
      },
      Y: (date) => pad(date.getFullYear(), 4),
      d: (date) => pad(date.getDate()),
      h: (date) => date.getHours() % 12 ? date.getHours() % 12 : 12,
      i: (date) => pad(date.getMinutes()),
      j: (date) => date.getDate(),
      l: function(date, locale) {
        return locale.weekdays.longhand[date.getDay()];
      },
      m: (date) => pad(date.getMonth() + 1),
      n: (date) => date.getMonth() + 1,
      s: (date) => date.getSeconds(),
      u: (date) => date.getTime(),
      w: (date) => date.getDay(),
      y: (date) => String(date.getFullYear()).substring(2)
    };
    createDateFormatter = ({ config: config2 = defaults, l10n = english, isMobile = false }) => (dateObj, frmt, overrideLocale) => {
      const locale = overrideLocale || l10n;
      if (config2.formatDate !== void 0 && !isMobile) {
        return config2.formatDate(dateObj, frmt, locale);
      }
      return frmt.split("").map((c, i2, arr) => formats[c] && arr[i2 - 1] !== "\\" ? formats[c](dateObj, locale, config2) : c !== "\\" ? c : "").join("");
    };
    createDateParser = ({ config: config2 = defaults, l10n = english }) => (date, givenFormat, timeless, customLocale) => {
      if (date !== 0 && !date)
        return void 0;
      const locale = customLocale || l10n;
      let parsedDate;
      const dateOrig = date;
      if (date instanceof Date)
        parsedDate = new Date(date.getTime());
      else if (typeof date !== "string" && date.toFixed !== void 0)
        parsedDate = new Date(date);
      else if (typeof date === "string") {
        const format2 = givenFormat || (config2 || defaults).dateFormat;
        const datestr = String(date).trim();
        if (datestr === "today") {
          parsedDate = new Date();
          timeless = true;
        } else if (/Z$/.test(datestr) || /GMT$/.test(datestr))
          parsedDate = new Date(date);
        else if (config2 && config2.parseDate)
          parsedDate = config2.parseDate(date, format2);
        else {
          parsedDate = !config2 || !config2.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
          let matched, ops = [];
          for (let i2 = 0, matchIndex = 0, regexStr = ""; i2 < format2.length; i2++) {
            const token = format2[i2];
            const isBackSlash = token === "\\";
            const escaped3 = format2[i2 - 1] === "\\" || isBackSlash;
            if (tokenRegex[token] && !escaped3) {
              regexStr += tokenRegex[token];
              const match = new RegExp(regexStr).exec(date);
              if (match && (matched = true)) {
                ops[token !== "Y" ? "push" : "unshift"]({
                  fn: revFormat[token],
                  val: match[++matchIndex]
                });
              }
            } else if (!isBackSlash)
              regexStr += ".";
            ops.forEach(({ fn, val }) => parsedDate = fn(parsedDate, val, locale) || parsedDate);
          }
          parsedDate = matched ? parsedDate : void 0;
        }
      }
      if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
        config2.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
        return void 0;
      }
      if (timeless === true)
        parsedDate.setHours(0, 0, 0, 0);
      return parsedDate;
    };
    isBetween = (ts, ts1, ts2) => {
      return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    duration = {
      DAY: 864e5
    };
    if (typeof Object.assign !== "function") {
      Object.assign = function(target, ...args) {
        if (!target) {
          throw TypeError("Cannot convert undefined or null to object");
        }
        for (const source of args) {
          if (source) {
            Object.keys(source).forEach((key2) => target[key2] = source[key2]);
          }
        }
        return target;
      };
    }
    DEBOUNCED_CHANGE_MS = 300;
    if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
      HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config2) {
        return _flatpickr(this, config2);
      };
      HTMLElement.prototype.flatpickr = function(config2) {
        return _flatpickr([this], config2);
      };
    }
    flatpickr = function(selector, config2) {
      if (typeof selector === "string") {
        return _flatpickr(window.document.querySelectorAll(selector), config2);
      } else if (selector instanceof Node) {
        return _flatpickr([selector], config2);
      } else {
        return _flatpickr(selector, config2);
      }
    };
    flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
      en: Object.assign({}, english),
      default: Object.assign({}, english)
    };
    flatpickr.localize = (l10n) => {
      flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = (config2) => {
      flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config2);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
      jQuery.fn.flatpickr = function(config2) {
        return _flatpickr(this, config2);
      };
    }
    Date.prototype.fp_incr = function(days) {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") {
      window.flatpickr = flatpickr;
    }
  }
});

// node_modules/ts-retry-promise/dist/timeout.js
var require_timeout = __commonJS({
  "node_modules/ts-retry-promise/dist/timeout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeout = void 0;
    exports.timeout = function(millies, f3) {
      if (millies === "INFINITELY") {
        return f3(function() {
          return false;
        });
      }
      var done = false;
      var doneF = function() {
        return done;
      };
      return new Promise(function(resolve2, reject) {
        var timeoutRef = setTimeout(function() {
          done = true;
          reject(new Error("Timeout after " + millies + "ms"));
        }, millies);
        var result = f3(doneF);
        result.then(function(r2) {
          resolve2(r2);
          clearTimeout(timeoutRef);
        }, function(e2) {
          reject(e2);
          clearTimeout(timeoutRef);
        });
      });
    };
  }
});

// node_modules/ts-retry-promise/dist/retry-promise.js
var require_retry_promise = __commonJS({
  "node_modules/ts-retry-promise/dist/retry-promise.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t2[0] & 1)
          throw t2[1];
        return t2[1];
      }, trys: [], ops: [] }, f3, y, t2, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f3)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f3 = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done)
              return t2;
            if (y = 0, t2)
              op = [op[0] & 2, t2.value];
            switch (op[0]) {
              case 0:
              case 1:
                t2 = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t2[1]) {
                  _.label = t2[1];
                  t2 = op;
                  break;
                }
                if (t2 && _.label < t2[2]) {
                  _.label = t2[2];
                  _.ops.push(op);
                  break;
                }
                if (t2[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e2) {
            op = [6, e2];
            y = 0;
          } finally {
            f3 = t2 = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotRetryableError = exports.RetryError = exports.notEmpty = exports.customizeRetry = exports.customizeDecorator = exports.retryDecorator = exports.retry = exports.wait = exports.defaultRetryConfig = void 0;
    var timeout_1 = require_timeout();
    var fixedBackoff = function(attempt, delay) {
      return delay;
    };
    var linearBackoff = function(attempt, delay) {
      return attempt * delay;
    };
    var exponentialBackoff = function(attempt, delay) {
      return Math.pow(delay, attempt);
    };
    exports.defaultRetryConfig = {
      backoff: "FIXED",
      delay: 100,
      logger: function() {
        return void 0;
      },
      maxBackOff: 5 * 60 * 1e3,
      retries: 10,
      timeout: 60 * 1e3,
      until: function() {
        return true;
      }
    };
    function wait(ms) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a4) {
          return [2, new Promise(function(resolve2) {
            return setTimeout(resolve2, ms);
          })];
        });
      });
    }
    exports.wait = wait;
    function retry2(f3, config2) {
      return __awaiter(this, void 0, void 0, function() {
        var effectiveConfig;
        return __generator(this, function(_a4) {
          effectiveConfig = Object.assign({}, exports.defaultRetryConfig, config2);
          return [2, timeout_1.timeout(effectiveConfig.timeout, function(done) {
            return _retry(f3, effectiveConfig, done);
          })];
        });
      });
    }
    exports.retry = retry2;
    function retryDecorator(func, config2) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return retry2(function() {
          return func.apply(void 0, args);
        }, config2);
      };
    }
    exports.retryDecorator = retryDecorator;
    function customizeDecorator(customConfig) {
      return function(args, config2) {
        return retryDecorator(args, Object.assign({}, customConfig, config2));
      };
    }
    exports.customizeDecorator = customizeDecorator;
    function customizeRetry(customConfig) {
      return function(f3, c) {
        var customized = Object.assign({}, customConfig, c);
        return retry2(f3, customized);
      };
    }
    exports.customizeRetry = customizeRetry;
    function _retry(f3, config2, done) {
      return __awaiter(this, void 0, void 0, function() {
        var lastError, delay, retries, i2, result, error_1, millisToWait;
        return __generator(this, function(_a4) {
          switch (_a4.label) {
            case 0:
              switch (config2.backoff) {
                case "EXPONENTIAL":
                  delay = exponentialBackoff;
                  break;
                case "FIXED":
                  delay = fixedBackoff;
                  break;
                case "LINEAR":
                  delay = linearBackoff;
                  break;
                default:
                  delay = config2.backoff;
              }
              if (config2.retries === "INFINITELY") {
                retries = Number.MAX_SAFE_INTEGER;
              } else {
                retries = config2.retries;
              }
              i2 = 0;
              _a4.label = 1;
            case 1:
              if (!(i2 <= retries))
                return [3, 8];
              _a4.label = 2;
            case 2:
              _a4.trys.push([2, 4, , 5]);
              return [4, f3()];
            case 3:
              result = _a4.sent();
              if (config2.until(result)) {
                return [2, result];
              }
              config2.logger("Until condition not met by " + result);
              return [3, 5];
            case 4:
              error_1 = _a4.sent();
              if (error_1.name === NotRetryableError.name) {
                throw new RetryError("Met not retryable error. Last error: " + error_1, error_1);
              }
              lastError = error_1;
              config2.logger("Retry failed: " + error_1.message);
              return [3, 5];
            case 5:
              millisToWait = delay(i2 + 1, config2.delay);
              return [4, wait(millisToWait > config2.maxBackOff ? config2.maxBackOff : millisToWait)];
            case 6:
              _a4.sent();
              if (done()) {
                return [3, 8];
              }
              _a4.label = 7;
            case 7:
              i2++;
              return [3, 1];
            case 8:
              throw new RetryError("All retries failed. Last error: " + lastError, lastError);
          }
        });
      });
    }
    exports.notEmpty = function(result) {
      if (Array.isArray(result)) {
        return result.length > 0;
      }
      return result !== null && result !== void 0;
    };
    var RetryError = function(_super) {
      __extends(RetryError2, _super);
      function RetryError2(message, lastError) {
        var _this = _super.call(this, message) || this;
        _this.lastError = lastError;
        return _this;
      }
      return RetryError2;
    }(Error);
    exports.RetryError = RetryError;
    var BaseError = function() {
      function BaseError2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        Error.apply(this, args);
      }
      return BaseError2;
    }();
    BaseError.prototype = new Error();
    var NotRetryableError = function(_super) {
      __extends(NotRetryableError2, _super);
      function NotRetryableError2(message) {
        var _this = _super.call(this, message) || this;
        Object.defineProperty(_this, "name", { value: _this.constructor.name });
        return _this;
      }
      return NotRetryableError2;
    }(BaseError);
    exports.NotRetryableError = NotRetryableError;
  }
});

// .svelte-kit/output/server/chunks/camunda-f6828202.js
async function initCamunda(config2) {
  camunda2 = new Camunda(config2);
}
var import_ts_retry_promise, Camunda, camunda2;
var init_camunda_f6828202 = __esm({
  ".svelte-kit/output/server/chunks/camunda-f6828202.js"() {
    import_ts_retry_promise = __toESM(require_retry_promise(), 1);
    Camunda = class {
      constructor(config2) {
        this.headers = { "Authorization": "", "Content-Type": "application/json" };
        this.address = config2.address;
      }
      getTaskByVariable(vars, mapVariables, delay) {
        return (0, import_ts_retry_promise.retry)(() => this.getTasks(mapVariables).then((tasks2) => tasks2.filter((t2) => {
          let x2 = t2.variables[vars.key].value == vars.value;
          console.log(t2);
          console.log(vars.value);
          return x2;
        })).then((tasks2) => {
          console.log(tasks2);
          if (tasks2.length == 0) {
            throw new Error("not found");
          } else {
            return tasks2[0];
          }
        }), { delay: delay != void 0 ? delay : 3e3, retries: 5 });
      }
      getTasks(mapVariables) {
        return fetch(this.address + "/task", { headers: this.headers }).then((res) => res.json()).then((res) => res).then(async (tasks2) => await Promise.all(tasks2.map(async (t2) => {
          t2.rawVariables = await this.getVariables(t2.id);
          t2.variables = mapVariables(t2.rawVariables);
          return t2;
        })));
      }
      completeTask(taskId, variables2) {
        return fetch(this.address + `/task/${taskId}/complete`, { headers: this.headers, method: "POST", body: JSON.stringify({ variables: variables2 }) });
      }
      getVariables(taskId) {
        return fetch(this.address + `/task/${taskId}/variables`, { headers: this.headers }).then((res) => res.json()).then((res) => res).then((res) => Object.entries(res).map(([key2, value]) => {
          let t2 = {};
          t2[key2] = value;
          return t2;
        })).then((res) => {
          let o = {};
          for (let i2 = 0; i2 < res.length; i2++) {
            o[Object.keys(res[i2])[0]] = res[i2][Object.keys(res[i2])[0]];
          }
          return o;
        });
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout,
  load: () => load
});
async function load({}) {
  await initCamunda({
    address: variables.camundaAddress,
    clientId: variables.camundaClientId,
    clientSecret: variables.camundaClientSecret
  });
  return { status: 200 };
}
var import_ts_retry_promise2, Toggle, css, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_97f4c8ab();
    init_HeaderSearch_svelte_svelte_type_style_lang_e51739eb();
    init_variables_b1eade11();
    init_camunda_f6828202();
    import_ts_retry_promise2 = __toESM(require_retry_promise(), 1);
    Toggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "toggled", "disabled", "labelA", "labelB", "labelText", "id", "name"]);
      let { size = "default" } = $$props;
      let { toggled = false } = $$props;
      let { disabled = false } = $$props;
      let { labelA = "Off" } = $$props;
      let { labelB = "On" } = $$props;
      let { labelText = "" } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { name = void 0 } = $$props;
      const dispatch = createEventDispatcher();
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.toggled === void 0 && $$bindings.toggled && toggled !== void 0)
        $$bindings.toggled(toggled);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.labelA === void 0 && $$bindings.labelA && labelA !== void 0)
        $$bindings.labelA(labelA);
      if ($$props.labelB === void 0 && $$bindings.labelB && labelB !== void 0)
        $$bindings.labelB(labelB);
      if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
        $$bindings.labelText(labelText);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      {
        dispatch("toggle", { toggled });
      }
      return `
<div${spread([escape_object($$restProps)], { classes: "bx--form-item" })}><input type="${"checkbox"}" ${toggled ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_classes(("bx--toggle-input " + (size === "sm" ? "bx--toggle-input--small" : "")).trim())}>
  <label${add_attribute("aria-label", labelText ? void 0 : $$props["aria-label"] || "Toggle", 0)}${add_attribute("for", id, 0)}${add_classes("bx--toggle-input__label".trim())}>${slots.labelText ? slots.labelText({}) : `
      ${escape(labelText)}
    `}
    <span${add_classes("bx--toggle__switch".trim())}><span aria-hidden="${"true"}"${add_classes("bx--toggle__text--off".trim())}>${slots.labelA ? slots.labelA({}) : `
          ${escape(labelA)}
        `}</span>
      <span aria-hidden="${"true"}"${add_classes("bx--toggle__text--on".trim())}>${slots.labelB ? slots.labelB({}) : `
          ${escape(labelB)}
        `}</span></span></label></div>`;
    });
    css = {
      code: ".container.svelte-19ivpvm{max-width:56rem;margin-left:auto;margin-right:auto}",
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `<div style="${"display: flex; justify-content: flex-end;"}"><div style="${"flex: 0 0 100px;"}">${validate_component(Toggle, "Toggle").$$render($$result, {
        style: "flex: 0; margin-right: 40px;",
        labelA: "Light",
        labelB: "Dark"
      }, {}, {})}</div></div>
<div class="${"container svelte-19ivpvm"}">${slots.default ? slots.default({}) : ``}
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css2;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-10fac483.js";
    js = ["pages/__layout.svelte-10fac483.js", "chunks/index-75c0c6bc.js", "chunks/camunda-54acc2c1.js"];
    css2 = ["assets/pages/__layout.svelte-6384d1e8.css", "assets/camunda-758c18e1.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load2
});
function load2({ error: error3, status }) {
  return { props: { error: error3, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_97f4c8ab();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error3 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error3 !== void 0)
        $$bindings.error(error3);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error3.message)}</pre>



${error3.frame ? `<pre>${escape(error3.frame)}</pre>` : ``}
${error3.stack ? `<pre>${escape(error3.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css3;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-1c4bfb21.js";
    js2 = ["error.svelte-1c4bfb21.js", "chunks/index-75c0c6bc.js"];
    css3 = [];
  }
});

// .svelte-kit/output/server/chunks/Button-5592944e.js
var __defProp3, __defProps3, __getOwnPropDescs3, __getOwnPropSymbols3, __hasOwnProp3, __propIsEnum3, __defNormalProp3, __spreadValues3, __spreadProps3, ButtonSkeleton, Button;
var init_Button_5592944e = __esm({
  ".svelte-kit/output/server/chunks/Button-5592944e.js"() {
    init_index_97f4c8ab();
    __defProp3 = Object.defineProperty;
    __defProps3 = Object.defineProperties;
    __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
    __hasOwnProp3 = Object.prototype.hasOwnProperty;
    __propIsEnum3 = Object.prototype.propertyIsEnumerable;
    __defNormalProp3 = (obj, key2, value) => key2 in obj ? __defProp3(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues3 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp3.call(b, prop))
          __defNormalProp3(a, prop, b[prop]);
      if (__getOwnPropSymbols3)
        for (var prop of __getOwnPropSymbols3(b)) {
          if (__propIsEnum3.call(b, prop))
            __defNormalProp3(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
    ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "size"]);
      let { href = void 0 } = $$props;
      let { size = "default" } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      return `
${href ? `<a${spread([
        { href: escape_attribute_value(href) },
        {
          rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
        },
        { role: "button" },
        escape_object($$restProps)
      ], {
        classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
      })}>${escape("")}</a>` : `<div${spread([escape_object($$restProps)], {
        classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
      })}></div>`}`;
    });
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let hasIconOnly;
      let buttonProps;
      let $$restProps = compute_rest_props($$props, [
        "kind",
        "size",
        "expressive",
        "isSelected",
        "icon",
        "iconDescription",
        "tooltipAlignment",
        "tooltipPosition",
        "as",
        "skeleton",
        "disabled",
        "href",
        "tabindex",
        "type",
        "ref"
      ]);
      let $$slots = compute_slots(slots);
      let { kind = "primary" } = $$props;
      let { size = "default" } = $$props;
      let { expressive = false } = $$props;
      let { isSelected = false } = $$props;
      let { icon = void 0 } = $$props;
      let { iconDescription = void 0 } = $$props;
      let { tooltipAlignment = "center" } = $$props;
      let { tooltipPosition = "bottom" } = $$props;
      let { as = false } = $$props;
      let { skeleton = false } = $$props;
      let { disabled = false } = $$props;
      let { href = void 0 } = $$props;
      let { tabindex = "0" } = $$props;
      let { type = "button" } = $$props;
      let { ref = null } = $$props;
      const ctx = getContext("ComposedModal");
      if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
        $$bindings.kind(kind);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0)
        $$bindings.expressive(expressive);
      if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
        $$bindings.isSelected(isSelected);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
        $$bindings.iconDescription(iconDescription);
      if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
        $$bindings.tooltipAlignment(tooltipAlignment);
      if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
        $$bindings.tooltipPosition(tooltipPosition);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
        $$bindings.skeleton(skeleton);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
        $$bindings.tabindex(tabindex);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      {
        if (ctx && ref) {
          ctx.declareRef(ref);
        }
      }
      hasIconOnly = icon && !$$slots.default;
      buttonProps = __spreadProps3(__spreadValues3({
        type: href && !disabled ? void 0 : type,
        tabindex,
        disabled: disabled === true ? true : void 0,
        href,
        "aria-pressed": hasIconOnly && kind === "ghost" && !href ? isSelected : void 0
      }, $$restProps), {
        class: [
          "bx--btn",
          expressive && "bx--btn--expressive",
          (size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
          size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
          size === "field" && "bx--btn--field",
          size === "small" && "bx--btn--sm",
          size === "lg" && "bx--btn--lg",
          size === "xl" && "bx--btn--xl",
          kind && `bx--btn--${kind}`,
          disabled && "bx--btn--disabled",
          hasIconOnly && "bx--btn--icon-only",
          hasIconOnly && "bx--tooltip__trigger",
          hasIconOnly && "bx--tooltip--a11y",
          hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
          hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
          hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
          $$restProps.class
        ].filter(Boolean).join(" ")
      });
      return `
${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({ href }, { size }, $$restProps, { style: hasIconOnly && "width: 3rem;" }), {}, {})}` : `${as ? `${slots.default ? slots.default({ props: buttonProps }) : ``}` : `${href && !disabled ? `
  <a${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
        "aria-hidden": "true",
        class: "bx--btn__icon",
        "aria-label": iconDescription
      }, {}, {})}</a>` : `<button${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
        "aria-hidden": "true",
        class: "bx--btn__icon",
        "aria-label": iconDescription
      }, {}, {})}</button>`}`}`}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes,
  load: () => load3
});
function readable2(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable2(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop2;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop2;
      }
    };
    const unsubscribers = stores_array.map((store, i2) => subscribe(store, (value) => {
      values[i2] = value;
      pending &= ~(1 << i2);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i2;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
async function loadOrders(fetch3) {
  try {
    await camunda2.getTasks(Order.mapper()).then((t2) => tasks.set(t2));
  } catch (e2) {
    error2 = e2;
  }
}
async function load3({ params, fetch: fetch3, session, stuff }) {
  loadOrders();
  return { status: 200 };
}
var import_ts_retry_promise3, __defProp4, __defProps4, __getOwnPropDescs4, __getOwnPropSymbols4, __hasOwnProp4, __propIsEnum4, __defNormalProp4, __spreadValues4, __spreadProps4, subscriber_queue2, ChevronRight, InlineCheckbox, Close, RadioButton, Table, TableBody, TableCell, TableContainer, TableHead, ArrowUp, ArrowsVertical, TableHeader, TableRow, DataTable, Modal, Customer, Value, Order, error2, tasks, interval, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_97f4c8ab();
    init_camunda_f6828202();
    init_HeaderSearch_svelte_svelte_type_style_lang_e51739eb();
    init_Button_5592944e();
    import_ts_retry_promise3 = __toESM(require_retry_promise(), 1);
    __defProp4 = Object.defineProperty;
    __defProps4 = Object.defineProperties;
    __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
    __hasOwnProp4 = Object.prototype.hasOwnProperty;
    __propIsEnum4 = Object.prototype.propertyIsEnumerable;
    __defNormalProp4 = (obj, key2, value) => key2 in obj ? __defProp4(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues4 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp4.call(b, prop))
          __defNormalProp4(a, prop, b[prop]);
      if (__getOwnPropSymbols4)
        for (var prop of __getOwnPropSymbols4(b)) {
          if (__propIsEnum4.call(b, prop))
            __defNormalProp4(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps4 = (a, b) => __defProps4(a, __getOwnPropDescs4(b));
    subscriber_queue2 = [];
    ChevronRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M22 16L12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"}"></path></svg>`;
    });
    InlineCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["checked", "indeterminate", "title", "id", "ref"]);
      let { checked = false } = $$props;
      let { indeterminate = false } = $$props;
      let { title = void 0 } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { ref = null } = $$props;
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
        $$bindings.indeterminate(indeterminate);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `<div${add_classes("bx--checkbox--inline".trim())}><input${spread([
        { type: "checkbox" },
        {
          checked: (indeterminate ? false : checked) || null
        },
        {
          indeterminate: escape_attribute_value(indeterminate)
        },
        { id: escape_attribute_value(id) },
        escape_object($$restProps),
        {
          "aria-checked": escape_attribute_value(indeterminate ? "mixed" : checked)
        }
      ], { classes: "bx--checkbox" })}${add_attribute("this", ref, 0)}>
  <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_attribute("aria-label", $$props["aria-label"], 0)}${add_classes("bx--checkbox-label".trim())}></label></div>`;
    });
    Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path></svg>`;
    });
    RadioButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "value",
        "checked",
        "disabled",
        "required",
        "labelPosition",
        "labelText",
        "hideLabel",
        "id",
        "name",
        "ref"
      ]);
      let $$slots = compute_slots(slots);
      let $selectedValue, $$unsubscribe_selectedValue;
      let { value = "" } = $$props;
      let { checked = false } = $$props;
      let { disabled = false } = $$props;
      let { required = false } = $$props;
      let { labelPosition = "right" } = $$props;
      let { labelText = "" } = $$props;
      let { hideLabel = false } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { name = "" } = $$props;
      let { ref = null } = $$props;
      const ctx = getContext("RadioButtonGroup");
      const selectedValue = ctx ? ctx.selectedValue : writable2(checked ? value : void 0);
      $$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => $selectedValue = value2);
      if (ctx) {
        ctx.add({ id, checked, disabled, value });
      }
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.required === void 0 && $$bindings.required && required !== void 0)
        $$bindings.required(required);
      if ($$props.labelPosition === void 0 && $$bindings.labelPosition && labelPosition !== void 0)
        $$bindings.labelPosition(labelPosition);
      if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
        $$bindings.labelText(labelText);
      if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
        $$bindings.hideLabel(hideLabel);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      checked = $selectedValue === value;
      $$unsubscribe_selectedValue();
      return `<div${spread([escape_object($$restProps)], {
        classes: "bx--radio-button-wrapper " + (labelPosition === "left" ? "bx--radio-button-wrapper--label-left" : "")
      })}><input type="${"radio"}"${add_attribute("id", id, 0)}${add_attribute("name", name, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} ${required ? "required" : ""}${add_attribute("value", value, 0)}${add_classes("bx--radio-button".trim())}${add_attribute("this", ref, 0)}>
  <label${add_attribute("for", id, 0)}${add_classes("bx--radio-button__label".trim())}><span${add_classes("bx--radio-button__appearance".trim())}></span>
    ${labelText || $$slots.labelText ? `<span${add_classes((hideLabel ? "bx--visually-hidden" : "").trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</span>` : ``}</label></div>`;
    });
    Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "zebra", "useStaticWidth", "sortable", "stickyHeader"]);
      let { size = void 0 } = $$props;
      let { zebra = false } = $$props;
      let { useStaticWidth = false } = $$props;
      let { sortable = false } = $$props;
      let { stickyHeader = false } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0)
        $$bindings.zebra(zebra);
      if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0)
        $$bindings.useStaticWidth(useStaticWidth);
      if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0)
        $$bindings.sortable(sortable);
      if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0)
        $$bindings.stickyHeader(stickyHeader);
      return `${stickyHeader ? `<section${spread([escape_object($$restProps)], {
        classes: "bx--data-table_inner-container"
      })}><table${add_classes(("bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (size === "medium" ? "bx--data-table--md" : "") + " " + (sortable ? "bx--data-table--sort" : "") + " " + (zebra ? "bx--data-table--zebra" : "") + " " + (useStaticWidth ? "bx--data-table--static" : "") + " " + (stickyHeader ? "bx--data-table--sticky-header" : "")).trim())}>${slots.default ? slots.default({}) : ``}</table></section>` : `<table${spread([escape_object($$restProps)], {
        classes: "bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (size === "medium" ? "bx--data-table--md" : "") + " " + (sortable ? "bx--data-table--sort" : "") + " " + (zebra ? "bx--data-table--zebra" : "") + " " + (useStaticWidth ? "bx--data-table--static" : "") + " " + (stickyHeader ? "bx--data-table--sticky-header" : "")
      })}>${slots.default ? slots.default({}) : ``}</table>`}`;
    });
    TableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `<tbody${spread([{ "aria-live": "polite" }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</tbody>`;
    });
    TableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `
<td${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</td>`;
    });
    TableContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["title", "description", "stickyHeader", "useStaticWidth"]);
      let { title = "" } = $$props;
      let { description = "" } = $$props;
      let { stickyHeader = false } = $$props;
      let { useStaticWidth = false } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0)
        $$bindings.stickyHeader(stickyHeader);
      if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0)
        $$bindings.useStaticWidth(useStaticWidth);
      return `<div${spread([escape_object($$restProps)], {
        classes: "bx--data-table-container " + (useStaticWidth ? "bx--data-table-container--static" : "") + " " + (stickyHeader ? "bx--data-table--max-width" : "")
      })}>${title ? `<div${add_classes("bx--data-table-header".trim())}><h4${add_classes("bx--data-table-header__title".trim())}>${escape(title)}</h4>
      <p${add_classes("bx--data-table-header__description".trim())}>${escape(description)}</p></div>` : ``}
  ${slots.default ? slots.default({}) : ``}</div>`;
    });
    TableHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `
<thead${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</thead>`;
    });
    ArrowUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16 4L6 14 7.41 15.41 15 7.83 15 28 17 28 17 7.83 24.59 15.41 26 14 16 4z"}"></path></svg>`;
    });
    ArrowsVertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M27.6 20.6L24 24.2 24 4 22 4 22 24.2 18.4 20.6 17 22 23 28 29 22zM9 4L3 10 4.4 11.4 8 7.8 8 28 10 28 10 7.8 13.6 11.4 15 10z"}"></path></svg>`;
    });
    TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let active;
      let ariaLabel;
      let $$restProps = compute_rest_props($$props, ["disableSorting", "scope", "translateWithId", "id"]);
      let $sortHeader, $$unsubscribe_sortHeader;
      let $tableSortable, $$unsubscribe_tableSortable;
      let { disableSorting = false } = $$props;
      let { scope = "col" } = $$props;
      let { translateWithId = () => "" } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      const { sortHeader, tableSortable } = getContext("DataTable");
      $$unsubscribe_sortHeader = subscribe(sortHeader, (value) => $sortHeader = value);
      $$unsubscribe_tableSortable = subscribe(tableSortable, (value) => $tableSortable = value);
      if ($$props.disableSorting === void 0 && $$bindings.disableSorting && disableSorting !== void 0)
        $$bindings.disableSorting(disableSorting);
      if ($$props.scope === void 0 && $$bindings.scope && scope !== void 0)
        $$bindings.scope(scope);
      if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
        $$bindings.translateWithId(translateWithId);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      active = $sortHeader.id === id;
      ariaLabel = translateWithId();
      $$unsubscribe_sortHeader();
      $$unsubscribe_tableSortable();
      return `
${$tableSortable && !disableSorting ? `<th${spread([
        {
          "aria-sort": escape_attribute_value(active ? $sortHeader.sortDirection : "none")
        },
        { scope: escape_attribute_value(scope) },
        { id: escape_attribute_value(id) },
        escape_object($$restProps)
      ], {})}><button${add_classes(("bx--table-sort " + (active ? "bx--table-sort--active" : "") + " " + (active && $sortHeader.sortDirection === "descending" ? "bx--table-sort--ascending" : "")).trim())}><div${add_classes("bx--table-header-label".trim())}>${slots.default ? slots.default({}) : ``}</div>
      ${validate_component(ArrowUp, "ArrowUp").$$render($$result, {
        size: 20,
        "aria-label": ariaLabel,
        class: "bx--table-sort__icon"
      }, {}, {})}
      ${validate_component(ArrowsVertical, "ArrowsVertical").$$render($$result, {
        size: 20,
        "aria-label": ariaLabel,
        class: "bx--table-sort__icon-unsorted"
      }, {}, {})}</button></th>` : `<th${spread([
        { scope: escape_attribute_value(scope) },
        { id: escape_attribute_value(id) },
        escape_object($$restProps)
      ], {})}><div${add_classes("bx--table-header-label".trim())}>${slots.default ? slots.default({}) : ``}</div></th>`}`;
    });
    TableRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `
<tr${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</tr>`;
    });
    DataTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let expandedRows;
      let rowIds;
      let expandableRowIds;
      let selectableRowIds;
      let selectAll;
      let indeterminate;
      let headerKeys;
      let sortedRows;
      let ascending;
      let sortKey;
      let sorting;
      let displayedRows;
      let displayedSortedRows;
      let $$restProps = compute_rest_props($$props, [
        "headers",
        "rows",
        "size",
        "title",
        "description",
        "zebra",
        "sortable",
        "expandable",
        "batchExpansion",
        "expandedRowIds",
        "nonExpandableRowIds",
        "radio",
        "selectable",
        "batchSelection",
        "selectedRowIds",
        "nonSelectableRowIds",
        "stickyHeader",
        "useStaticWidth",
        "pageSize",
        "page"
      ]);
      let $$slots = compute_slots(slots);
      let $tableRows, $$unsubscribe_tableRows;
      let $sortHeader, $$unsubscribe_sortHeader;
      let $$unsubscribe_thKeys;
      let { headers = [] } = $$props;
      let { rows = [] } = $$props;
      let { size = void 0 } = $$props;
      let { title = "" } = $$props;
      let { description = "" } = $$props;
      let { zebra = false } = $$props;
      let { sortable = false } = $$props;
      let { expandable = false } = $$props;
      let { batchExpansion = false } = $$props;
      let { expandedRowIds = [] } = $$props;
      let { nonExpandableRowIds = [] } = $$props;
      let { radio = false } = $$props;
      let { selectable = false } = $$props;
      let { batchSelection = false } = $$props;
      let { selectedRowIds = [] } = $$props;
      let { nonSelectableRowIds = [] } = $$props;
      let { stickyHeader = false } = $$props;
      let { useStaticWidth = false } = $$props;
      let { pageSize = 0 } = $$props;
      let { page = 0 } = $$props;
      createEventDispatcher();
      const batchSelectedIds = writable2(false);
      const tableSortable = writable2(sortable);
      const sortHeader = writable2({
        id: null,
        key: null,
        sort: void 0,
        sortDirection: "none"
      });
      $$unsubscribe_sortHeader = subscribe(sortHeader, (value) => $sortHeader = value);
      const headerItems = writable2([]);
      const tableRows = writable2(rows);
      $$unsubscribe_tableRows = subscribe(tableRows, (value) => $tableRows = value);
      const thKeys = derived(headerItems, () => headers.map(({ key: key2 }, i2) => ({ key: key2, id: key2 })).reduce((a, c) => __spreadProps4(__spreadValues4({}, a), { [c.key]: c.id }), {}));
      $$unsubscribe_thKeys = subscribe(thKeys, (value) => value);
      const resolvePath = (object, path) => path.split(/[\.\[\]\'\"]/).filter((p) => p).reduce((o, p) => o && typeof o === "object" ? o[p] : o, object);
      setContext("DataTable", {
        sortHeader,
        tableSortable,
        batchSelectedIds,
        tableRows,
        resetSelectedRowIds: () => {
          selectAll = false;
          selectedRowIds = [];
          if (refSelectAll)
            refSelectAll.checked = false;
        }
      });
      let expanded = false;
      let parentRowId = null;
      let refSelectAll = null;
      const getDisplayedRows = (rows2, page2, pageSize2) => page2 && pageSize2 ? rows2.slice((page2 - 1) * pageSize2, page2 * pageSize2) : rows2;
      if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
        $$bindings.headers(headers);
      if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
        $$bindings.rows(rows);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0)
        $$bindings.zebra(zebra);
      if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0)
        $$bindings.sortable(sortable);
      if ($$props.expandable === void 0 && $$bindings.expandable && expandable !== void 0)
        $$bindings.expandable(expandable);
      if ($$props.batchExpansion === void 0 && $$bindings.batchExpansion && batchExpansion !== void 0)
        $$bindings.batchExpansion(batchExpansion);
      if ($$props.expandedRowIds === void 0 && $$bindings.expandedRowIds && expandedRowIds !== void 0)
        $$bindings.expandedRowIds(expandedRowIds);
      if ($$props.nonExpandableRowIds === void 0 && $$bindings.nonExpandableRowIds && nonExpandableRowIds !== void 0)
        $$bindings.nonExpandableRowIds(nonExpandableRowIds);
      if ($$props.radio === void 0 && $$bindings.radio && radio !== void 0)
        $$bindings.radio(radio);
      if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0)
        $$bindings.selectable(selectable);
      if ($$props.batchSelection === void 0 && $$bindings.batchSelection && batchSelection !== void 0)
        $$bindings.batchSelection(batchSelection);
      if ($$props.selectedRowIds === void 0 && $$bindings.selectedRowIds && selectedRowIds !== void 0)
        $$bindings.selectedRowIds(selectedRowIds);
      if ($$props.nonSelectableRowIds === void 0 && $$bindings.nonSelectableRowIds && nonSelectableRowIds !== void 0)
        $$bindings.nonSelectableRowIds(nonSelectableRowIds);
      if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0)
        $$bindings.stickyHeader(stickyHeader);
      if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0)
        $$bindings.useStaticWidth(useStaticWidth);
      if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0)
        $$bindings.pageSize(pageSize);
      if ($$props.page === void 0 && $$bindings.page && page !== void 0)
        $$bindings.page(page);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        expandedRows = expandedRowIds.reduce((a, id) => __spreadProps4(__spreadValues4({}, a), { [id]: true }), {});
        {
          batchSelectedIds.set(selectedRowIds);
        }
        headerKeys = headers.map(({ key: key2 }) => key2);
        set_store_value(tableRows, $tableRows = rows.map((row) => __spreadProps4(__spreadValues4({}, row), {
          cells: headerKeys.map((key2, index) => ({
            key: key2,
            value: resolvePath(row, key2),
            display: headers[index].display
          }))
        })), $tableRows);
        rowIds = $tableRows.map((row) => row.id);
        expandableRowIds = rowIds.filter((id) => !nonExpandableRowIds.includes(id));
        selectableRowIds = rowIds.filter((id) => !nonSelectableRowIds.includes(id));
        selectAll = selectableRowIds.length > 0 && selectedRowIds.length === selectableRowIds.length;
        indeterminate = selectedRowIds.length > 0 && selectedRowIds.length < selectableRowIds.length;
        {
          if (batchExpansion) {
            expandable = true;
            expanded = expandedRowIds.length === expandableRowIds.length;
          }
        }
        {
          if (radio || batchSelection)
            selectable = true;
        }
        {
          tableSortable.set(sortable);
        }
        sortedRows = [...$tableRows];
        ascending = $sortHeader.sortDirection === "ascending";
        sortKey = $sortHeader.key;
        sorting = sortable && sortKey != null;
        {
          if (sorting) {
            if ($sortHeader.sortDirection === "none") {
              sortedRows = $tableRows;
            } else {
              sortedRows = [...$tableRows].sort((a, b) => {
                const itemA = ascending ? resolvePath(a, sortKey) : resolvePath(b, sortKey);
                const itemB = ascending ? resolvePath(b, sortKey) : resolvePath(a, sortKey);
                if ($sortHeader.sort)
                  return $sortHeader.sort(itemA, itemB);
                if (typeof itemA === "number" && typeof itemB === "number")
                  return itemA - itemB;
                if ([itemA, itemB].every((item) => !item && item !== 0))
                  return 0;
                if (!itemA && itemA !== 0)
                  return ascending ? 1 : -1;
                if (!itemB && itemB !== 0)
                  return ascending ? -1 : 1;
                return itemA.toString().localeCompare(itemB.toString(), "en", { numeric: true });
              });
            }
          }
        }
        displayedRows = getDisplayedRows($tableRows, page, pageSize);
        displayedSortedRows = getDisplayedRows(sortedRows, page, pageSize);
        $$rendered = `${validate_component(TableContainer, "TableContainer").$$render($$result, Object.assign({ useStaticWidth }, $$restProps), {}, {
          default: () => {
            return `${title || $$slots.title || description || $$slots.description ? `<div${add_classes("bx--data-table-header".trim())}>${title || $$slots.title ? `<h4${add_classes("bx--data-table-header__title".trim())}>${slots.title ? slots.title({}) : `${escape(title)}`}</h4>` : ``}
      ${description || $$slots.description ? `<p${add_classes("bx--data-table-header__description".trim())}>${slots.description ? slots.description({}) : `${escape(description)}`}</p>` : ``}</div>` : ``}
  ${slots.default ? slots.default({}) : ``}
  ${validate_component(Table, "Table").$$render($$result, {
              zebra,
              size,
              stickyHeader,
              sortable,
              useStaticWidth
            }, {}, {
              default: () => {
                return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(TableRow, "TableRow").$$render($$result, {}, {}, {
                      default: () => {
                        return `${expandable ? `<th scope="${"col"}"${add_attribute("data-previous-value", expanded ? "collapsed" : void 0, 0)}${add_classes("bx--table-expand".trim())}>${batchExpansion ? `<button type="${"button"}"${add_classes("bx--table-expand__button".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "bx--table-expand__svg" }, {}, {})}</button>` : ``}</th>` : ``}
        ${selectable && !batchSelection ? `<th scope="${"col"}"></th>` : ``}
        ${batchSelection && !radio ? `<th scope="${"col"}"${add_classes("bx--table-column-checkbox".trim())}>${validate_component(InlineCheckbox, "InlineCheckbox").$$render($$result, {
                          "aria-label": "Select all rows",
                          checked: selectAll,
                          indeterminate,
                          ref: refSelectAll
                        }, {
                          ref: ($$value) => {
                            refSelectAll = $$value;
                            $$settled = false;
                          }
                        }, {})}</th>` : ``}
        ${each(headers, (header, i2) => {
                          return `${header.empty ? `<th scope="${"col"}"></th>` : `${validate_component(TableHeader, "TableHeader").$$render($$result, {
                            id: header.key,
                            disableSorting: header.sort === false
                          }, {}, {
                            default: () => {
                              return `${slots["cell-header"] ? slots["cell-header"]({ header }) : `${escape(header.value)}`}
            `;
                            }
                          })}`}`;
                        })}`;
                      }
                    })}`;
                  }
                })}
    ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                  default: () => {
                    return `${each(sorting ? displayedSortedRows : displayedRows, (row, i2) => {
                      return `${validate_component(TableRow, "TableRow").$$render($$result, {
                        id: "row-" + row.id,
                        "data-parent-row": expandable ? true : void 0,
                        class: (selectedRowIds.includes(row.id) ? "bx--data-table--selected" : "") + " " + (expandedRows[row.id] ? "bx--expandable-row" : "") + " " + (expandable ? "bx--parent-row" : "") + " " + (expandable && parentRowId === row.id ? "bx--expandable-row--hover" : "")
                      }, {}, {
                        default: () => {
                          return `${expandable ? `${validate_component(TableCell, "TableCell").$$render($$result, {
                            class: "bx--table-expand",
                            headers: "expand",
                            "data-previous-value": !nonExpandableRowIds.includes(row.id) && expandedRows[row.id] ? "collapsed" : void 0
                          }, {}, {
                            default: () => {
                              return `${!nonExpandableRowIds.includes(row.id) ? `<button type="${"button"}"${add_attribute("aria-label", expandedRows[row.id] ? "Collapse current row" : "Expand current row", 0)}${add_classes("bx--table-expand__button".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "bx--table-expand__svg" }, {}, {})}
                </button>` : ``}
            `;
                            }
                          })}` : ``}
          ${selectable ? `<td${add_classes(("bx--table-column-checkbox " + (radio ? "bx--table-column-radio" : "")).trim())}>${!nonSelectableRowIds.includes(row.id) ? `${radio ? `${validate_component(RadioButton, "RadioButton").$$render($$result, {
                            name: "select-row-" + row.id,
                            checked: selectedRowIds.includes(row.id)
                          }, {}, {})}` : `${validate_component(InlineCheckbox, "InlineCheckbox").$$render($$result, {
                            name: "select-row-" + row.id,
                            checked: selectedRowIds.includes(row.id)
                          }, {}, {})}`}` : ``}
            </td>` : ``}
          ${each(row.cells, (cell, j) => {
                            return `${headers[j].empty ? `<td${add_classes((headers[j].columnMenu ? "bx--table-column-menu" : "").trim())}>${slots.cell ? slots.cell({ row, cell, rowIndex: i2, cellIndex: j }) : `
                  ${escape(cell.display ? cell.display(cell.value) : cell.value)}
                `}
              </td>` : `${validate_component(TableCell, "TableCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${slots.cell ? slots.cell({ row, cell, rowIndex: i2, cellIndex: j }) : `
                  ${escape(cell.display ? cell.display(cell.value) : cell.value)}
                `}
              `;
                              }
                            })}`}`;
                          })}
        `;
                        }
                      })}

        ${expandable ? `<tr data-child-row${add_classes("bx--expandable-row".trim())}>${expandedRows[row.id] && !nonExpandableRowIds.includes(row.id) ? `${validate_component(TableCell, "TableCell").$$render($$result, {
                        colspan: selectable ? headers.length + 2 : headers.length + 1
                      }, {}, {
                        default: () => {
                          return `<div${add_classes("bx--child-row-inner-container".trim())}>${slots["expanded-row"] ? slots["expanded-row"]({ row }) : ``}</div>
              `;
                        }
                      })}` : ``}
          </tr>` : ``}`;
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_tableRows();
      $$unsubscribe_sortHeader();
      $$unsubscribe_thKeys();
      return $$rendered;
    });
    Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let modalLabelId;
      let modalHeadingId;
      let modalBodyId;
      let ariaLabel;
      let $$restProps = compute_rest_props($$props, [
        "size",
        "open",
        "danger",
        "alert",
        "passiveModal",
        "modalHeading",
        "modalLabel",
        "modalAriaLabel",
        "iconDescription",
        "hasForm",
        "hasScrollingContent",
        "primaryButtonText",
        "primaryButtonDisabled",
        "primaryButtonIcon",
        "shouldSubmitOnEnter",
        "secondaryButtonText",
        "secondaryButtons",
        "selectorPrimaryFocus",
        "preventCloseOnClickOutside",
        "id",
        "ref"
      ]);
      let { size = void 0 } = $$props;
      let { open = false } = $$props;
      let { danger = false } = $$props;
      let { alert = false } = $$props;
      let { passiveModal = false } = $$props;
      let { modalHeading = void 0 } = $$props;
      let { modalLabel = void 0 } = $$props;
      let { modalAriaLabel = void 0 } = $$props;
      let { iconDescription = "Close the modal" } = $$props;
      let { hasForm = false } = $$props;
      let { hasScrollingContent = false } = $$props;
      let { primaryButtonText = "" } = $$props;
      let { primaryButtonDisabled = false } = $$props;
      let { primaryButtonIcon = void 0 } = $$props;
      let { shouldSubmitOnEnter = true } = $$props;
      let { secondaryButtonText = "" } = $$props;
      let { secondaryButtons = [] } = $$props;
      let { selectorPrimaryFocus = "[data-modal-primary-focus]" } = $$props;
      let { preventCloseOnClickOutside = false } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { ref = null } = $$props;
      createEventDispatcher();
      let buttonRef = null;
      let innerModal = null;
      let alertDialogProps = {};
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
        $$bindings.danger(danger);
      if ($$props.alert === void 0 && $$bindings.alert && alert !== void 0)
        $$bindings.alert(alert);
      if ($$props.passiveModal === void 0 && $$bindings.passiveModal && passiveModal !== void 0)
        $$bindings.passiveModal(passiveModal);
      if ($$props.modalHeading === void 0 && $$bindings.modalHeading && modalHeading !== void 0)
        $$bindings.modalHeading(modalHeading);
      if ($$props.modalLabel === void 0 && $$bindings.modalLabel && modalLabel !== void 0)
        $$bindings.modalLabel(modalLabel);
      if ($$props.modalAriaLabel === void 0 && $$bindings.modalAriaLabel && modalAriaLabel !== void 0)
        $$bindings.modalAriaLabel(modalAriaLabel);
      if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
        $$bindings.iconDescription(iconDescription);
      if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
        $$bindings.hasForm(hasForm);
      if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
        $$bindings.hasScrollingContent(hasScrollingContent);
      if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
        $$bindings.primaryButtonText(primaryButtonText);
      if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
        $$bindings.primaryButtonDisabled(primaryButtonDisabled);
      if ($$props.primaryButtonIcon === void 0 && $$bindings.primaryButtonIcon && primaryButtonIcon !== void 0)
        $$bindings.primaryButtonIcon(primaryButtonIcon);
      if ($$props.shouldSubmitOnEnter === void 0 && $$bindings.shouldSubmitOnEnter && shouldSubmitOnEnter !== void 0)
        $$bindings.shouldSubmitOnEnter(shouldSubmitOnEnter);
      if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
        $$bindings.secondaryButtonText(secondaryButtonText);
      if ($$props.secondaryButtons === void 0 && $$bindings.secondaryButtons && secondaryButtons !== void 0)
        $$bindings.secondaryButtons(secondaryButtons);
      if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
        $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
      if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
        $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      modalLabelId = `bx--modal-header__label--modal-${id}`;
      modalHeadingId = `bx--modal-header__heading--modal-${id}`;
      modalBodyId = `bx--modal-body--${id}`;
      ariaLabel = modalLabel || $$props["aria-label"] || modalAriaLabel || modalHeading;
      {
        if (alert) {
          if (passiveModal) {
            alertDialogProps.role = "alert";
          }
          if (!passiveModal) {
            alertDialogProps.role = "alertdialog";
            alertDialogProps["aria-describedby"] = modalBodyId;
          }
        }
      }
      return `
<div${spread([
        { role: "presentation" },
        { id: escape_attribute_value(id) },
        escape_object($$restProps)
      ], {
        classes: "bx--modal " + (!passiveModal ? "bx--modal-tall" : "") + " " + (open ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : "")
      })}${add_attribute("this", ref, 0)}><div${spread([
        { role: "dialog" },
        { tabindex: "-1" },
        escape_object(alertDialogProps),
        { "aria-modal": "true" },
        {
          "aria-label": escape_attribute_value(ariaLabel)
        }
      ], {
        classes: "bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : "")
      })}${add_attribute("this", innerModal, 0)}><div${add_classes("bx--modal-header".trim())}>${passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_attribute("title", iconDescription, 0)}${add_classes("bx--modal-close".trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close, "Close").$$render($$result, {
        size: 20,
        "aria-label": iconDescription,
        class: "bx--modal-close__icon"
      }, {}, {})}</button>` : ``}
      ${modalLabel ? `<h2${add_attribute("id", modalLabelId, 0)}${add_classes("bx--modal-header__label".trim())}>${slots.label ? slots.label({}) : `${escape(modalLabel)}`}</h2>` : ``}
      <h3${add_attribute("id", modalHeadingId, 0)}${add_classes("bx--modal-header__heading".trim())}>${slots.heading ? slots.heading({}) : `${escape(modalHeading)}`}</h3>
      ${!passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_attribute("title", iconDescription, 0)}${add_classes("bx--modal-close".trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close, "Close").$$render($$result, {
        size: 20,
        "aria-label": iconDescription,
        class: "bx--modal-close__icon"
      }, {}, {})}</button>` : ``}</div>
    <div${add_attribute("id", modalBodyId, 0)}${add_attribute("tabindex", hasScrollingContent ? "0" : void 0, 0)}${add_attribute("role", hasScrollingContent ? "region" : void 0, 0)}${add_attribute("aria-label", hasScrollingContent ? ariaLabel : void 0, 0)}${add_attribute("aria-labelledby", modalLabel ? modalLabelId : modalHeadingId, 0)}${add_classes(("bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : "")).trim())}>${slots.default ? slots.default({}) : ``}</div>
    ${hasScrollingContent ? `<div${add_classes("bx--modal-content--overflow-indicator".trim())}></div>` : ``}
    ${!passiveModal ? `<div${add_classes(("bx--modal-footer " + (secondaryButtons.length === 2 ? "bx--modal-footer--three-button" : "")).trim())}>${secondaryButtons.length > 0 ? `${each(secondaryButtons, (button) => {
        return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
          default: () => {
            return `${escape(button.text)}
            `;
          }
        })}`;
      })}` : `${secondaryButtonText ? `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
        default: () => {
          return `${escape(secondaryButtonText)}`;
        }
      })}` : ``}`}
        ${validate_component(Button, "Button").$$render($$result, {
        kind: danger ? "danger" : "primary",
        disabled: primaryButtonDisabled,
        icon: primaryButtonIcon
      }, {}, {
        default: () => {
          return `${escape(primaryButtonText)}`;
        }
      })}</div>` : ``}</div></div>`;
    });
    Customer = class {
      constructor(firstname, lastname, address) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = this.firstname + " " + this.lastname;
        this.address = address;
      }
      static fromVariables(customer) {
        return new Customer(customer.value.firstname, customer.value.lastname, customer.value.address);
      }
    };
    Value = class {
      constructor(value) {
        this.value = value.value;
      }
    };
    Order = class {
      constructor(id, ski, customer) {
        this.id = new Value(id);
        this.ski = new Value(ski);
        this.customer = new Value(customer);
      }
      static mapper() {
        return (vars) => {
          return new Order(vars.id, vars.ski, {
            value: Customer.fromVariables(vars.customer)
          });
        };
      }
    };
    tasks = writable2([]);
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $tasks, $$unsubscribe_tasks;
      $$unsubscribe_tasks = subscribe(tasks, (value) => $tasks = value);
      interval = setInterval(() => loadOrders(), 5e3);
      onDestroy(() => clearInterval(interval));
      $$unsubscribe_tasks();
      return `${error2 ? `${validate_component(Modal, "Modal").$$render($$result, {
        passiveModal: true,
        open: true,
        modalHeading: "Error loading task"
      }, {}, {
        default: () => {
          return `<p>${escape(error2)}</p>`;
        }
      })}` : `${$tasks.length == 0 ? `<h1>Waiting for tasks...</h1>` : `<p>Choose tasks for packaging</p>
	${validate_component(DataTable, "DataTable").$$render($$result, {
        headers: [
          { key: "id", value: "ID" },
          {
            key: "variables.id.value",
            value: "Order ID"
          },
          {
            key: "variables.ski.value.model",
            value: "Ski"
          },
          {
            key: "variables.customer.value.fullname",
            value: "Customer"
          },
          { key: "name", value: "Task" }
        ],
        rows: $tasks
      }, {}, {})}`}`}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css4,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css4;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-efca45a0.js";
    js3 = ["pages/index.svelte-efca45a0.js", "chunks/index-75c0c6bc.js", "chunks/navigation-b6af1653.js", "chunks/singletons-267f4abd.js", "chunks/camunda-54acc2c1.js"];
    css4 = ["assets/camunda-758c18e1.css"];
  }
});

// .svelte-kit/output/server/entries/pages/orders/_id_.svelte.js
var id_svelte_exports = {};
__export(id_svelte_exports, {
  default: () => U5Bidu5D,
  load: () => load4
});
async function load4({ params }) {
  return { status: 200 };
}
var import_ts_retry_promise4, __defProp5, __defProps5, __getOwnPropDescs5, __getOwnPropSymbols5, __hasOwnProp5, __propIsEnum5, __defNormalProp5, __spreadValues5, __spreadProps5, AspectRatio, ButtonSet, CheckboxSkeleton, Checkbox, WarningFilled, WarningAltFilled, CheckmarkFilled, Loading, Form, FormGroup, Grid, Row, Column, ImageLoader, ErrorFilled, InlineLoading, ListItem, EditOff, OrderedList, TextInput, StepType, css$5, AddDeliveryNote, css$4, DeliveryNote, css$3, Material, css$2, Package, css$1, Warehouse, css5, U5Bidu5D;
var init_id_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/orders/_id_.svelte.js"() {
    init_index_97f4c8ab();
    import_ts_retry_promise4 = __toESM(require_retry_promise(), 1);
    init_HeaderSearch_svelte_svelte_type_style_lang_e51739eb();
    init_Button_5592944e();
    __defProp5 = Object.defineProperty;
    __defProps5 = Object.defineProperties;
    __getOwnPropDescs5 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols5 = Object.getOwnPropertySymbols;
    __hasOwnProp5 = Object.prototype.hasOwnProperty;
    __propIsEnum5 = Object.prototype.propertyIsEnumerable;
    __defNormalProp5 = (obj, key2, value) => key2 in obj ? __defProp5(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues5 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp5.call(b, prop))
          __defNormalProp5(a, prop, b[prop]);
      if (__getOwnPropSymbols5)
        for (var prop of __getOwnPropSymbols5(b)) {
          if (__propIsEnum5.call(b, prop))
            __defNormalProp5(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps5 = (a, b) => __defProps5(a, __getOwnPropDescs5(b));
    AspectRatio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["ratio"]);
      let { ratio = "2x1" } = $$props;
      if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
        $$bindings.ratio(ratio);
      return `<div${spread([escape_object($$restProps)], {
        classes: "bx--aspect-ratio " + (ratio === "2x1" ? "bx--aspect-ratio--2x1" : "") + " " + (ratio === "2x3" ? "bx--aspect-ratio--2x3" : "") + " " + (ratio === "16x9" ? "bx--aspect-ratio--16x9" : "") + " " + (ratio === "4x3" ? "bx--aspect-ratio--4x3" : "") + " " + (ratio === "1x1" ? "bx--aspect-ratio--1x1" : "") + " " + (ratio === "3x4" ? "bx--aspect-ratio--3x4" : "") + " " + (ratio === "3x2" ? "bx--aspect-ratio--3x2" : "") + " " + (ratio === "9x16" ? "bx--aspect-ratio--9x16" : "") + " " + (ratio === "1x2" ? "bx--aspect-ratio--1x2" : "")
      })}><div${add_classes("bx--aspect-ratio--object".trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
    });
    ButtonSet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["stacked"]);
      let { stacked = false } = $$props;
      if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
        $$bindings.stacked(stacked);
      return `<div${spread([escape_object($$restProps)], {
        classes: "bx--btn-set " + (stacked ? "bx--btn-set--stacked" : "")
      })}>${slots.default ? slots.default({}) : ``}</div>`;
    });
    CheckboxSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `
<div${spread([escape_object($$restProps)], {
        classes: "bx--form-item bx--checkbox-wrapper bx--checkbox-label"
      })}><span${add_classes("bx--checkbox-label-text bx--skeleton".trim())}></span></div>`;
    });
    Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let useGroup;
      let $$restProps = compute_rest_props($$props, [
        "value",
        "checked",
        "group",
        "indeterminate",
        "skeleton",
        "required",
        "readonly",
        "disabled",
        "labelText",
        "hideLabel",
        "name",
        "title",
        "id",
        "ref"
      ]);
      let { value = "" } = $$props;
      let { checked = false } = $$props;
      let { group = void 0 } = $$props;
      let { indeterminate = false } = $$props;
      let { skeleton = false } = $$props;
      let { required = false } = $$props;
      let { readonly = false } = $$props;
      let { disabled = false } = $$props;
      let { labelText = "" } = $$props;
      let { hideLabel = false } = $$props;
      let { name = "" } = $$props;
      let { title = void 0 } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { ref = null } = $$props;
      const dispatch = createEventDispatcher();
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.group === void 0 && $$bindings.group && group !== void 0)
        $$bindings.group(group);
      if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
        $$bindings.indeterminate(indeterminate);
      if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
        $$bindings.skeleton(skeleton);
      if ($$props.required === void 0 && $$bindings.required && required !== void 0)
        $$bindings.required(required);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
        $$bindings.readonly(readonly);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
        $$bindings.labelText(labelText);
      if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
        $$bindings.hideLabel(hideLabel);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      useGroup = Array.isArray(group);
      checked = useGroup ? group.includes(value) : checked;
      {
        dispatch("check", checked);
      }
      return `
${skeleton ? `${validate_component(CheckboxSkeleton, "CheckboxSkeleton").$$render($$result, Object.assign($$restProps), {}, {})}` : `<div${spread([escape_object($$restProps)], {
        classes: "bx--form-item bx--checkbox-wrapper"
      })}><input type="${"checkbox"}"${add_attribute("value", value, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("indeterminate", indeterminate, 0)}${add_attribute("name", name, 0)} ${required ? "required" : ""} ${readonly ? "readonly" : ""}${add_classes("bx--checkbox".trim())}${add_attribute("this", ref, 0)}>
    <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_classes("bx--checkbox-label".trim())}><span${add_classes(("bx--checkbox-label-text " + (hideLabel ? "bx--visually-hidden" : "")).trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</span></label></div>`}`;
    });
    WarningFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"}"></path><path fill="${"none"}" d="${"M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path></svg>`;
    });
    WarningAltFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path fill="${"none"}" d="${"M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"}"></path><path d="${"M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"}"></path></svg>`;
    });
    CheckmarkFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z"}"></path><path fill="${"none"}" d="${"M14 21.591L9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591z"}" data-icon-path="${"inner-path"}"></path></svg>`;
    });
    Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let spinnerRadius;
      let $$restProps = compute_rest_props($$props, ["small", "active", "withOverlay", "description", "id"]);
      let { small = false } = $$props;
      let { active = true } = $$props;
      let { withOverlay = true } = $$props;
      let { description = "Active loading indicator" } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      if ($$props.small === void 0 && $$bindings.small && small !== void 0)
        $$bindings.small(small);
      if ($$props.active === void 0 && $$bindings.active && active !== void 0)
        $$bindings.active(active);
      if ($$props.withOverlay === void 0 && $$bindings.withOverlay && withOverlay !== void 0)
        $$bindings.withOverlay(withOverlay);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      spinnerRadius = small ? "42" : "44";
      return `${withOverlay ? `<div${spread([escape_object($$restProps)], {
        classes: "bx--loading-overlay " + (!active ? "bx--loading-overlay--stop" : "")
      })}><div aria-atomic="${"true"}"${add_attribute("aria-labelledby", id, 0)}${add_attribute("aria-live", active ? "assertive" : "off", 0)}${add_classes(("bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")).trim())}>
      <label${add_attribute("id", id, 0)}${add_classes("bx--visually-hidden".trim())}>${escape(description)}</label>
      <svg viewBox="${"0 0 100 100"}"${add_classes("bx--loading__svg".trim())}><title>${escape(description)}</title>${small ? `<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__background".trim())}></circle>` : ``}<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__stroke".trim())}></circle></svg></div></div>` : `<div${spread([
        { "aria-atomic": "true" },
        {
          "aria-labelledby": escape_attribute_value(id)
        },
        {
          "aria-live": escape_attribute_value(active ? "assertive" : "off")
        },
        escape_object($$restProps)
      ], {
        classes: "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")
      })}>
    <label${add_attribute("id", id, 0)}${add_classes("bx--visually-hidden".trim())}>${escape(description)}</label>
    <svg viewBox="${"0 0 100 100"}"${add_classes("bx--loading__svg".trim())}><title>${escape(description)}</title>${small ? `<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__background".trim())}></circle>` : ``}<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__stroke".trim())}></circle></svg></div>`}`;
    });
    Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["ref"]);
      let { ref = null } = $$props;
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `
<form${spread([escape_object($$restProps)], { classes: "bx--form" })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</form>`;
    });
    FormGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["noMargin", "invalid", "message", "messageText", "legendText", "legendId"]);
      let { noMargin = false } = $$props;
      let { invalid = false } = $$props;
      let { message = false } = $$props;
      let { messageText = "" } = $$props;
      let { legendText = "" } = $$props;
      let { legendId = "" } = $$props;
      if ($$props.noMargin === void 0 && $$bindings.noMargin && noMargin !== void 0)
        $$bindings.noMargin(noMargin);
      if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
        $$bindings.invalid(invalid);
      if ($$props.message === void 0 && $$bindings.message && message !== void 0)
        $$bindings.message(message);
      if ($$props.messageText === void 0 && $$bindings.messageText && messageText !== void 0)
        $$bindings.messageText(messageText);
      if ($$props.legendText === void 0 && $$bindings.legendText && legendText !== void 0)
        $$bindings.legendText(legendText);
      if ($$props.legendId === void 0 && $$bindings.legendId && legendId !== void 0)
        $$bindings.legendId(legendId);
      return `
<fieldset${spread([
        {
          "data-invalid": escape_attribute_value(invalid || void 0)
        },
        {
          "aria-labelledby": escape_attribute_value($$restProps["aria-labelledby"] || legendId)
        },
        escape_object($$restProps)
      ], {
        classes: "bx--fieldset " + (noMargin ? "bx--fieldset--no-margin" : "")
      })}>${legendText ? `<legend${add_attribute("id", legendId || $$restProps["aria-labelledby"], 0)}${add_classes("bx--label".trim())}>${escape(legendText)}</legend>` : ``}
  ${slots.default ? slots.default({}) : ``}
  ${message ? `<div${add_classes("bx--form__requirement".trim())}>${escape(messageText)}</div>` : ``}</fieldset>`;
    });
    Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let props;
      let $$restProps = compute_rest_props($$props, [
        "as",
        "condensed",
        "narrow",
        "fullWidth",
        "noGutter",
        "noGutterLeft",
        "noGutterRight",
        "padding"
      ]);
      let { as = false } = $$props;
      let { condensed = false } = $$props;
      let { narrow = false } = $$props;
      let { fullWidth = false } = $$props;
      let { noGutter = false } = $$props;
      let { noGutterLeft = false } = $$props;
      let { noGutterRight = false } = $$props;
      let { padding = false } = $$props;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
        $$bindings.condensed(condensed);
      if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
        $$bindings.narrow(narrow);
      if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
        $$bindings.fullWidth(fullWidth);
      if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
        $$bindings.noGutter(noGutter);
      if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
        $$bindings.noGutterLeft(noGutterLeft);
      if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
        $$bindings.noGutterRight(noGutterRight);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      props = __spreadProps5(__spreadValues5({}, $$restProps), {
        class: [
          $$restProps.class,
          "bx--grid",
          condensed && "bx--grid--condensed",
          narrow && "bx--grid--narrow",
          fullWidth && "bx--grid--full-width",
          noGutter && "bx--no-gutter",
          noGutterLeft && "bx--no-gutter--left",
          noGutterRight && "bx--no-gutter--right",
          padding && "bx--row-padding"
        ].filter(Boolean).join(" ")
      });
      return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
    });
    Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let props;
      let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
      let { as = false } = $$props;
      let { condensed = false } = $$props;
      let { narrow = false } = $$props;
      let { noGutter = false } = $$props;
      let { noGutterLeft = false } = $$props;
      let { noGutterRight = false } = $$props;
      let { padding = false } = $$props;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
        $$bindings.condensed(condensed);
      if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
        $$bindings.narrow(narrow);
      if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
        $$bindings.noGutter(noGutter);
      if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
        $$bindings.noGutterLeft(noGutterLeft);
      if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
        $$bindings.noGutterRight(noGutterRight);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      props = __spreadProps5(__spreadValues5({}, $$restProps), {
        class: [
          $$restProps.class,
          "bx--row",
          condensed && "bx--row--condensed",
          narrow && "bx--row--narrow",
          noGutter && "bx--no-gutter",
          noGutterLeft && "bx--no-gutter--left",
          noGutterRight && "bx--no-gutter--right",
          padding && "bx--row-padding"
        ].filter(Boolean).join(" ")
      });
      return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
    });
    Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let columnClass;
      let props;
      let $$restProps = compute_rest_props($$props, [
        "as",
        "noGutter",
        "noGutterLeft",
        "noGutterRight",
        "padding",
        "aspectRatio",
        "sm",
        "md",
        "lg",
        "xlg",
        "max"
      ]);
      let { as = false } = $$props;
      let { noGutter = false } = $$props;
      let { noGutterLeft = false } = $$props;
      let { noGutterRight = false } = $$props;
      let { padding = false } = $$props;
      let { aspectRatio = void 0 } = $$props;
      let { sm = void 0 } = $$props;
      let { md = void 0 } = $$props;
      let { lg = void 0 } = $$props;
      let { xlg = void 0 } = $$props;
      let { max = void 0 } = $$props;
      const breakpoints = ["sm", "md", "lg", "xlg", "max"];
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
        $$bindings.noGutter(noGutter);
      if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
        $$bindings.noGutterLeft(noGutterLeft);
      if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
        $$bindings.noGutterRight(noGutterRight);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
        $$bindings.aspectRatio(aspectRatio);
      if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
        $$bindings.sm(sm);
      if ($$props.md === void 0 && $$bindings.md && md !== void 0)
        $$bindings.md(md);
      if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
        $$bindings.lg(lg);
      if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0)
        $$bindings.xlg(xlg);
      if ($$props.max === void 0 && $$bindings.max && max !== void 0)
        $$bindings.max(max);
      columnClass = [sm, md, lg, xlg, max].map((breakpoint, i2) => {
        const name = breakpoints[i2];
        if (breakpoint === true) {
          return `bx--col-${name}`;
        } else if (typeof breakpoint === "number") {
          return `bx--col-${name}-${breakpoint}`;
        } else if (typeof breakpoint === "object") {
          let bp = [];
          if (typeof breakpoint.span === "number") {
            bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
          } else if (breakpoint.span === true) {
            bp = [...bp, `bx--col-${name}`];
          }
          if (typeof breakpoint.offset === "number") {
            bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
          }
          return bp.join(" ");
        }
      }).filter(Boolean).join(" ");
      props = __spreadProps5(__spreadValues5({}, $$restProps), {
        class: [
          $$restProps.class,
          columnClass,
          !columnClass && "bx--col",
          noGutter && "bx--no-gutter",
          noGutterLeft && "bx--no-gutter--left",
          noGutterRight && "bx--no-gutter--right",
          aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
          padding && "bx--col-padding"
        ].filter(Boolean).join(" ")
      });
      return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
    });
    ImageLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["src", "alt", "ratio", "loading", "loaded", "error", "fadeIn", "loadImage"]);
      let { src = "" } = $$props;
      let { alt = "" } = $$props;
      let { ratio = void 0 } = $$props;
      let { loading = false } = $$props;
      let { loaded = false } = $$props;
      let { error: error3 = false } = $$props;
      let { fadeIn = false } = $$props;
      const loadImage = (url) => {
        if (image != null)
          image = null;
        loaded = false;
        error3 = false;
        image = new Image();
        image.src = url || src;
        image.onload = () => loaded = true;
        image.onerror = () => error3 = true;
      };
      const dispatch = createEventDispatcher();
      let image = null;
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
        $$bindings.alt(alt);
      if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
        $$bindings.ratio(ratio);
      if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
        $$bindings.loading(loading);
      if ($$props.loaded === void 0 && $$bindings.loaded && loaded !== void 0)
        $$bindings.loaded(loaded);
      if ($$props.error === void 0 && $$bindings.error && error3 !== void 0)
        $$bindings.error(error3);
      if ($$props.fadeIn === void 0 && $$bindings.fadeIn && fadeIn !== void 0)
        $$bindings.fadeIn(fadeIn);
      if ($$props.loadImage === void 0 && $$bindings.loadImage && loadImage !== void 0)
        $$bindings.loadImage(loadImage);
      loading = !loaded && !error3;
      {
        if (src && typeof window !== "undefined")
          loadImage();
      }
      {
        if (loaded)
          dispatch("load");
      }
      {
        if (error3)
          dispatch("error");
      }
      return `${ratio === void 0 ? `${loading ? `${slots.loading ? slots.loading({}) : ``}` : ``}
  ${loaded ? `<img${spread([
        escape_object($$restProps),
        {
          style: "width: 100%;" + escape($$restProps.style)
        },
        { src: escape_attribute_value(src) },
        { alt: escape_attribute_value(alt) }
      ], {})}>` : ``}
  ${error3 ? `${slots.error ? slots.error({}) : ``}` : ``}` : `${validate_component(AspectRatio, "AspectRatio").$$render($$result, { ratio }, {}, {
        default: () => {
          return `${loading ? `${slots.loading ? slots.loading({}) : ``}` : ``}
    ${loaded ? `<img${spread([
            escape_object($$restProps),
            {
              style: "width: 100%;" + escape($$restProps.style)
            },
            { src: escape_attribute_value(src) },
            { alt: escape_attribute_value(alt) }
          ], {})}>` : ``}
    ${error3 ? `${slots.error ? slots.error({}) : ``}` : ``}`;
        }
      })}`}`;
    });
    ErrorFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path fill="${"none"}" d="${"M14.9 7.2H17.1V24.799H14.9z"}" data-icon-path="${"inner-path"}" transform="${"rotate(-45 16 16)"}"></path><path d="${"M16,2A13.914,13.914,0,0,0,2,16,13.914,13.914,0,0,0,16,30,13.914,13.914,0,0,0,30,16,13.914,13.914,0,0,0,16,2Zm5.4449,21L9,10.5557,10.5557,9,23,21.4448Z"}"></path></svg>`;
    });
    InlineLoading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["status", "description", "iconDescription", "successDelay"]);
      let { status = "active" } = $$props;
      let { description = void 0 } = $$props;
      let { iconDescription = void 0 } = $$props;
      let { successDelay = 1500 } = $$props;
      createEventDispatcher();
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
        $$bindings.iconDescription(iconDescription);
      if ($$props.successDelay === void 0 && $$bindings.successDelay && successDelay !== void 0)
        $$bindings.successDelay(successDelay);
      return `
<div${spread([{ "aria-live": "assertive" }, escape_object($$restProps)], {
        classes: "bx--inline-loading"
      })}><div${add_classes("bx--inline-loading__animation".trim())}>${status === "error" ? `${validate_component(ErrorFilled, "ErrorFilled").$$render($$result, {
        class: "bx--inline-loading--error",
        title: iconDescription
      }, {}, {})}` : `${status === "finished" ? `${validate_component(CheckmarkFilled, "CheckmarkFilled").$$render($$result, {
        class: "bx--inline-loading__checkmark-container",
        title: iconDescription
      }, {}, {})}` : `${status === "inactive" || status === "active" ? `${validate_component(Loading, "Loading").$$render($$result, {
        small: true,
        description: iconDescription,
        withOverlay: false,
        active: status === "active"
      }, {}, {})}` : ``}`}`}</div>
  ${description ? `<div${add_classes("bx--inline-loading__text".trim())}>${escape(description)}</div>` : ``}</div>`;
    });
    ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `
<li${spread([escape_object($$restProps)], { classes: "bx--list__item" })}>${slots.default ? slots.default({}) : ``}</li>`;
    });
    EditOff = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread([
        { xmlns: "http://www.w3.org/2000/svg" },
        { viewBox: "0 0 32 32" },
        { fill: "currentColor" },
        { preserveAspectRatio: "xMidYMid meet" },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        escape_object(attributes),
        escape_object($$restProps)
      ], {})}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"}"></path></svg>`;
    });
    OrderedList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["nested", "native", "expressive"]);
      let { nested = false } = $$props;
      let { native = false } = $$props;
      let { expressive = false } = $$props;
      if ($$props.nested === void 0 && $$bindings.nested && nested !== void 0)
        $$bindings.nested(nested);
      if ($$props.native === void 0 && $$bindings.native && native !== void 0)
        $$bindings.native(native);
      if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0)
        $$bindings.expressive(expressive);
      return `
<ol${spread([escape_object($$restProps)], {
        classes: (!native ? "bx--list--ordered" : "") + " " + (native ? "bx--list--ordered--native" : "") + " " + (nested ? "bx--list--nested" : "") + " " + (expressive ? "bx--list--expressive" : "")
      })}>${slots.default ? slots.default({}) : ``}</ol>`;
    });
    TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isFluid;
      let errorId;
      let warnId;
      let $$restProps = compute_rest_props($$props, [
        "size",
        "value",
        "placeholder",
        "light",
        "disabled",
        "helperText",
        "id",
        "name",
        "labelText",
        "hideLabel",
        "invalid",
        "invalidText",
        "warn",
        "warnText",
        "ref",
        "required",
        "inline",
        "readonly"
      ]);
      let $$slots = compute_slots(slots);
      let { size = void 0 } = $$props;
      let { value = "" } = $$props;
      let { placeholder = "" } = $$props;
      let { light = false } = $$props;
      let { disabled = false } = $$props;
      let { helperText = "" } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { name = void 0 } = $$props;
      let { labelText = "" } = $$props;
      let { hideLabel = false } = $$props;
      let { invalid = false } = $$props;
      let { invalidText = "" } = $$props;
      let { warn = false } = $$props;
      let { warnText = "" } = $$props;
      let { ref = null } = $$props;
      let { required = false } = $$props;
      let { inline = false } = $$props;
      let { readonly = false } = $$props;
      const ctx = getContext("Form");
      createEventDispatcher();
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.light === void 0 && $$bindings.light && light !== void 0)
        $$bindings.light(light);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
        $$bindings.helperText(helperText);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
        $$bindings.labelText(labelText);
      if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
        $$bindings.hideLabel(hideLabel);
      if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
        $$bindings.invalid(invalid);
      if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
        $$bindings.invalidText(invalidText);
      if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
        $$bindings.warn(warn);
      if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
        $$bindings.warnText(warnText);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      if ($$props.required === void 0 && $$bindings.required && required !== void 0)
        $$bindings.required(required);
      if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
        $$bindings.inline(inline);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
        $$bindings.readonly(readonly);
      isFluid = !!ctx && ctx.isFluid;
      errorId = `error-${id}`;
      warnId = `warn-${id}`;
      return `
<div${add_classes(("bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (readonly ? "bx--text-input-wrapper--readonly" : "")).trim())}>${inline ? `<div${add_classes("bx--text-input__label-helper-wrapper".trim())}>${labelText ? `<label${add_attribute("for", id, 0)} class="${[
        escape(inline && !!size && `bx--label--inline--${size}`),
        "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
      ].join(" ").trim()}">${slots.labelText ? slots.labelText({}) : `
            ${escape(labelText)}
          `}</label>` : ``}
      ${!isFluid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``}</div>` : ``}
  ${!inline && (labelText || $$slots.labelText) ? `<label${add_attribute("for", id, 0)} class="${[
        escape(inline && !!size && `bx--label--inline--${size}`),
        "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
      ].join(" ").trim()}">${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>` : ``}
  <div${add_classes(("bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")).trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes(("bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")).trim())}>${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render($$result, {
        class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
      }, {}, {})}` : ``}
      ${readonly ? `${validate_component(EditOff, "EditOff").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : ``}
      <input${spread([
        {
          "data-invalid": escape_attribute_value(invalid || void 0)
        },
        {
          "aria-invalid": escape_attribute_value(invalid || void 0)
        },
        {
          "data-warn": escape_attribute_value(warn || void 0)
        },
        {
          "aria-describedby": escape_attribute_value(invalid ? errorId : warn ? warnId : void 0)
        },
        { disabled: disabled || null },
        { id: escape_attribute_value(id) },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { required: required || null },
        { readonly: readonly || null },
        escape_object($$restProps),
        {
          class: escape_attribute_value(size && `bx--text-input--${size}`)
        }
      ], {
        classes: "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warn" : "")
      })}${add_attribute("this", ref, 0)}${add_attribute("value", value, 0)}>
      ${isFluid ? `<hr${add_classes("bx--text-input__divider".trim())}>` : ``}
      ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
      ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div>
    ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``}
    ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
    ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
    });
    StepType = /* @__PURE__ */ ((StepType2) => {
      StepType2["Accept"] = "Accept for Packaging";
      StepType2["Material"] = "Collect packaging material";
      StepType2["Package"] = "Package";
      StepType2["DeliveryNote"] = "Check delivery note";
      StepType2["AddDeliveryNote"] = "Add delivery note";
      StepType2["FinalCheck"] = "Put into warehouse";
      return StepType2;
    })(StepType || {});
    css$5 = {
      code: ".form-head.svelte-1ob47dx{text-align:center}h2.svelte-1ob47dx{margin-bottom:var(--cds-spacing-06)}p.svelte-1ob47dx{margin-bottom:var(--cds-spacing-06)}.list.svelte-1ob47dx{margin-bottom:var(--cds-spacing-06)}",
      map: null
    };
    AddDeliveryNote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { task } = $$props;
      createEventDispatcher();
      if ($$props.task === void 0 && $$bindings.task && task !== void 0)
        $$bindings.task(task);
      $$result.css.add(css$5);
      return `<div><div class="${"form-head svelte-1ob47dx"}"><h2 class="${"svelte-1ob47dx"}">Add delivery note and label</h2>
		<p class="${"svelte-1ob47dx"}">The delivery note and label has been printed. Please follow the instructions to apply the note
			and label to the packaging
		</p></div>
	${validate_component(Form, "Form").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="${"list svelte-1ob47dx"}">${validate_component(OrderedList, "OrderedList").$$render($$result, { expressive: true }, {}, {
            default: () => {
              return `${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Checkbox, "Checkbox").$$render($$result, {
                    required: true,
                    labelText: "Put the delivery note into the packaging with the skis"
                  }, {}, {})}`;
                }
              })}
				${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Checkbox, "Checkbox").$$render($$result, {
                    required: true,
                    labelText: "Close the packaging throuruly"
                  }, {}, {})}`;
                }
              })}
				${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Checkbox, "Checkbox").$$render($$result, {
                    required: true,
                    labelText: "Remove the adhesive from the back of the label and stick it on top of the packaging"
                  }, {}, {})}`;
                }
              })}`;
            }
          })}</div>

		<div style="${"display: flex; width: 84%; justify-content: center;"}">${validate_component(ButtonSet, "ButtonSet").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
                default: () => {
                  return `Cancel`;
                }
              })}
				${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
                default: () => {
                  return `Next`;
                }
              })}`;
            }
          })}</div>`;
        }
      })}
</div>`;
    });
    css$4 = {
      code: ".form-head.svelte-1brpv5h{text-align:center}h2.svelte-1brpv5h{margin-bottom:var(--cds-spacing-06)}p.svelte-1brpv5h{margin-bottom:var(--cds-spacing-06)}",
      map: null
    };
    DeliveryNote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { task } = $$props;
      createEventDispatcher();
      if ($$props.task === void 0 && $$bindings.task && task !== void 0)
        $$bindings.task(task);
      $$result.css.add(css$4);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${task ? `<div><div class="${"form-head svelte-1brpv5h"}"><h2 class="${"svelte-1brpv5h"}">Delivery Note</h2>
			<p class="${"svelte-1brpv5h"}">Please check the delivery note.</p></div>
		${validate_component(Form, "Form").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render($$result, { legendText: "Customer" }, {}, {
              default: () => {
                return `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "Firstname",
                              placeholder: "Please enter a firstname...",
                              value: task.variables.customer.value.firstname
                            }, {
                              value: ($$value) => {
                                task.variables.customer.value.firstname = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}`;
                      }
                    })}
					${validate_component(Row, "Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "Lastname",
                              placeholder: "Please enter the lastname...",
                              value: task.variables.customer.value.lastname
                            }, {
                              value: ($$value) => {
                                task.variables.customer.value.lastname = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}`;
                      }
                    })}
					${validate_component(Row, "Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `
							${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "Street",
                              placeholder: "Please enter the street...",
                              value: task.variables.customer.value.address.street
                            }, {
                              value: ($$value) => {
                                task.variables.customer.value.address.street = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}`;
                      }
                    })}
					${validate_component(Row, "Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "Zip",
                              placeholder: "Please enter the zip-code...",
                              value: task.variables.customer.value.address.zip
                            }, {
                              value: ($$value) => {
                                task.variables.customer.value.address.zip = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}
						${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "City",
                              placeholder: "Please enter the city...",
                              value: task.variables.customer.value.address.city
                            }, {
                              value: ($$value) => {
                                task.variables.customer.value.address.city = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}`;
                      }
                    })}
					${validate_component(Row, "Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "Country",
                              placeholder: "Please enter the country...",
                              value: task.variables.customer.value.address.country
                            }, {
                              value: ($$value) => {
                                task.variables.customer.value.address.country = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}
			${validate_component(FormGroup, "FormGroup").$$render($$result, { legendText: "Product" }, {}, {
              default: () => {
                return `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextInput, "TextInput").$$render($$result, {
                              labelText: "Model",
                              placeholder: "Please enter a model name...",
                              value: task.variables.ski.value.model
                            }, {
                              value: ($$value) => {
                                task.variables.ski.value.model = $$value;
                                $$settled = false;
                              }
                            }, {})}`;
                          }
                        })}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}
			${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(ButtonSet, "ButtonSet").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
                              default: () => {
                                return `Cancel`;
                              }
                            })}
							${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
                              default: () => {
                                return `Print`;
                              }
                            })}`;
                          }
                        })}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        })}

		<div style="${"display: flex; width: 84%; justify-content: center;"}"></div></div>` : ``}`;
      } while (!$$settled);
      return $$rendered;
    });
    css$3 = {
      code: ".svelte-1v1spdv{text-align:center}h2.svelte-1v1spdv,h3.svelte-1v1spdv{margin-bottom:var(--cds-spacing-06)}p.svelte-1v1spdv{margin-bottom:var(--cds-spacing-06)}.image.svelte-1v1spdv img{width:auto !important;height:28em}",
      map: null
    };
    Material = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { task } = $$props;
      createEventDispatcher();
      const shelfs = [
        { label: "A", img: "/materialA.jpg" },
        { label: "B", img: "/materialB.jpg" },
        { label: "C", img: "/materialC.jpg" },
        { label: "D", img: "/materialD.jpg" },
        { label: "E", img: "/materialE.jpg" }
      ];
      const shelf = shelfs[Math.floor(Math.random() * 5)];
      if ($$props.task === void 0 && $$bindings.task && task !== void 0)
        $$bindings.task(task);
      $$result.css.add(css$3);
      return `<div class="${"svelte-1v1spdv"}"><h2 class="${"svelte-1v1spdv"}">Get Material</h2>
	<p class="${"svelte-1v1spdv"}">Please pickup the appropiate packaging materials from shelf</p>
	<h3 class="${"svelte-1v1spdv"}">${escape(shelf.label)}</h3>
	<div class="${"image svelte-1v1spdv"}">${validate_component(ImageLoader, "ImageLoader").$$render($$result, { src: shelf.img }, {}, {
        error: () => {
          return `An error occurred.`;
        },
        loading: () => {
          return `${validate_component(InlineLoading, "InlineLoading").$$render($$result, {}, {}, {})}`;
        }
      })}</div>

	<div style="${"display: flex; width: 84%; justify-content: center;"}" class="${"svelte-1v1spdv"}">${validate_component(ButtonSet, "ButtonSet").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}
			${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Next`;
            }
          })}`;
        }
      })}</div>
</div>`;
    });
    css$2 = {
      code: ".svelte-ge3j7t{text-align:center}h2.svelte-ge3j7t{margin-bottom:var(--cds-spacing-06)}p.svelte-ge3j7t{margin-bottom:var(--cds-spacing-06)}.image.svelte-ge3j7t img{width:auto !important;height:28em}",
      map: null
    };
    Package = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { task } = $$props;
      createEventDispatcher();
      if ($$props.task === void 0 && $$bindings.task && task !== void 0)
        $$bindings.task(task);
      $$result.css.add(css$2);
      return `<div class="${"svelte-ge3j7t"}"><h2 class="${"svelte-ge3j7t"}">Package</h2>
	<p class="${"svelte-ge3j7t"}">Please put the skis into the packaging. Take care of the edges and wrap in cushion material</p>
	<div class="${"image svelte-ge3j7t"}">${validate_component(ImageLoader, "ImageLoader").$$render($$result, { src: "/package.jpg" }, {}, {
        error: () => {
          return `An error occurred.`;
        },
        loading: () => {
          return `${validate_component(InlineLoading, "InlineLoading").$$render($$result, {}, {}, {})}`;
        }
      })}</div>

	<div style="${"display: flex; width: 84%; justify-content: center;"}" class="${"svelte-ge3j7t"}">${validate_component(ButtonSet, "ButtonSet").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}
			${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Next`;
            }
          })}`;
        }
      })}</div>
</div>`;
    });
    css$1 = {
      code: ".svelte-i3w2dw{text-align:center}h2.svelte-i3w2dw{margin-bottom:var(--cds-spacing-06)}p.svelte-i3w2dw{margin-bottom:var(--cds-spacing-06)}",
      map: null
    };
    Warehouse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { task } = $$props;
      createEventDispatcher();
      if ($$props.task === void 0 && $$bindings.task && task !== void 0)
        $$bindings.task(task);
      $$result.css.add(css$1);
      return `<div class="${"svelte-i3w2dw"}"><h2 class="${"svelte-i3w2dw"}">Store in warehouse</h2>
	<p class="${"svelte-i3w2dw"}">Check the packaging for faults and a clearly visible label. Package is ready for shipping,
		please store it in the warehouse.
	</p>

	<div style="${"display: flex; width: 84%; justify-content: center;"}" class="${"svelte-i3w2dw"}">${validate_component(ButtonSet, "ButtonSet").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}
			${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Finish`;
            }
          })}`;
        }
      })}</div>
</div>`;
    });
    css5 = {
      code: ".tab-container.svelte-114vene .bx--tabs{display:flex;justify-content:center;margin-bottom:3em}",
      map: null
    };
    U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { task } = $$props;
      [
        {
          label: StepType.Material,
          disabled: false,
          component: Material
        },
        {
          label: StepType.Package,
          disabled: true,
          component: Package
        },
        {
          label: StepType.DeliveryNote,
          disabled: true,
          component: DeliveryNote
        },
        {
          label: StepType.AddDeliveryNote,
          disabled: true,
          component: AddDeliveryNote
        },
        {
          label: StepType.FinalCheck,
          disabled: true,
          component: Warehouse
        }
      ];
      if ($$props.task === void 0 && $$bindings.task && task !== void 0)
        $$bindings.task(task);
      $$result.css.add(css5);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${`${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css6,
  entry: () => entry4,
  js: () => js4,
  module: () => id_svelte_exports
});
var entry4, js4, css6;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_id_svelte();
    entry4 = "pages/orders/_id_.svelte-06af49f0.js";
    js4 = ["pages/orders/_id_.svelte-06af49f0.js", "chunks/index-75c0c6bc.js", "chunks/navigation-b6af1653.js", "chunks/singletons-267f4abd.js", "chunks/camunda-54acc2c1.js"];
    css6 = ["assets/pages/orders/_id_.svelte-1d1a320a.css", "assets/camunda-758c18e1.css"];
  }
});

// .svelte-kit/vercel-tmp/serverless.js
var serverless_exports = {};
__export(serverless_exports, {
  default: () => serverless_default
});
module.exports = __toCommonJS(serverless_exports);
init_install_fetch();

// node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_97f4c8ab();
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler2 = mod[method];
  if (!handler2 && method === "head") {
    handler2 = mod.get;
  }
  if (!handler2) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler2(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry5) {
    return entry5[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry5, i2) {
    names.set(entry5[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode$1(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _dev, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _dev, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateSet(this, _use_hashes, mode === "hash" || mode === "auto" && prerender);
    __privateSet(this, _directives, dev ? __spreadValues2({}, directives) : directives);
    __privateSet(this, _dev, dev);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues2({}, __privateGet(this, _directives));
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = new WeakMap();
_dev = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
var updated = __spreadProps2(__spreadValues2({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error22 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error22) {
    error22.stack = options.get_stack(error22);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps2(__spreadValues2({}, session), {
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error22,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error22)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-sveltekit");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
      if (shadow_props) {
        body += render_json_payload_script({ type: "props" }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error22) {
  if (!error22)
    return null;
  let serialized = try_serialize(error22);
  if (!serialized) {
    const { name, message, stack } = error22;
    serialized = try_serialize(__spreadProps2(__spreadValues2({}, error22), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error22 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error22 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error22}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error22 };
    }
    return { status, error: error22 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error22
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues2({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = __spreadValues2({}, cookies);
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadProps2(__spreadValues2({}, opts), { credentials: void 0 })), options, __spreadProps2(__spreadValues2({}, state), {
            initiator: route
          }));
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_1(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues2({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error22 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a4 = new_cookie, { name, value } = _a4, options2 = __objRest(_a4, ["name", "value"]);
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler2 = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler2 && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler2(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get = method === "head" && mod.head || mod.get;
    if (get) {
      const result = await get(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = __spreadValues2(__spreadValues2({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error22 = coalesce_to_error(e2);
    options.handle_error(error22, event);
    return {
      status: 500,
      error: error22
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error22,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error22
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error22,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps2(__spreadValues2({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error22 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
            node,
            stuff,
            is_error: false,
            is_leaf: i2 === nodes.length - 1
          }));
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error22 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error22 = e2;
        }
        if (loaded && !error22) {
          branch.push(loaded);
        }
        if (error22) {
          while (i2--) {
            if (route.b[i2]) {
              const index = route.b[i2];
              const error_node = await options.manifest._.nodes[index]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error22
                }));
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = __spreadValues2(__spreadValues2({}, node_loaded.stuff), error_loaded.stuff);
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error22,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = __spreadValues2(__spreadValues2({}, stuff), loaded.loaded.stuff);
      }
    }
  }
  try {
    return with_cookies(await render_response(__spreadProps2(__spreadValues2({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error22,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps2(__spreadValues2({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a4, _b, _c;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a4 = url.searchParams.get(parameter)) == null ? void 0 : _a4.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerender) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -DATA_SUFFIX.length) + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if ((route == null ? void 0 : route.type) === "page") {
    const normalized = normalize_path(url.pathname, options.trailing_slash);
    if (normalized !== url.pathname && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
      return new Response(void 0, {
        status: 301,
        headers: {
          "x-sveltekit-normalize": "1",
          location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
        }
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps2(__spreadValues2({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error22 = coalesce_to_error(e2);
    options.handle_error(error22, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error22,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + "\n	</head>\n	<body>\n		<div>" + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error22) => String(error22),
      handle_error: (error22, event) => {
        this.options.hooks.handleError({
          error: error22,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error22.stack = this.options.get_stack(error22);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_ccac934e(), hooks_ccac934e_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error22 }) => console.error(error22.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "materialA.jpg", "materialB.jpg", "materialC.jpg", "materialD.jpg", "materialE.jpg", "package.jpg"]),
  mimeTypes: { ".png": "image/png", ".jpg": "image/jpeg" },
  _: {
    entry: { "file": "start-fe096a64.js", "js": ["start-fe096a64.js", "chunks/index-75c0c6bc.js", "chunks/singletons-267f4abd.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        id: "orders/[id]",
        pattern: /^\/orders\/([^/]+?)\/?$/,
        names: ["id"],
        types: [null],
        path: null,
        shadow: null,
        a: [0, 3],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installFetch();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
