const Formidable = require('formidable');

exports = module.exports = function bodyParser(opt) {
    return function bodyParser(req, res, next) {
        let parser = exports.parse[mime(req)];
        if (parser && !req.body) {
            parser(opt, req, res, next);
        }
        else {
            next();
        }
    };
};

// Grab the general mime type from a request.
function mime(req) {
    let str = req.headers['content-type'] || '';
    return str.split(';')[0];
}

function parseMultipart(opt, req, res, next) {
    let form = new Formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err)
            next(err);
        else {
            req.body = extend(fields, files);
            next();
        }
    });
}

function extend(target) {
    let key, obj;

    for (let i = 1, l = arguments.length; i < l; i++) {
        if ((obj = arguments[i])) {
            for (key in obj)
                target[key] = obj[key];
        }
    }

    return target;
}

exports.parse = {
    'multipart/form-data': parseMultipart,
    'multipart/alternative': parseMultipart
};
