import url from 'url';

export default class ExpressMiddleware {
  static cookieParser(req, res, next) {
    const parsedCookie = {};
    const { cookie } = req.headers;

    if (cookie) {
      const entries = cookie.split('; ');
      entries.forEach((entry) => {
        const values = entry.split('=');
        parsedCookie[values['0']] = values['1'];
      });
    }

    req.parsedCookie = parsedCookie;
    next();
  }

  static queryParser(req, res, next) {
    const parsedQuery = {};
    const { query } = url.parse(req.url);

    if (query) {
      const entries = query.split('&');
      entries.forEach((entry) => {
        const values = entry.split('=');
        parsedQuery[values['0']] = values['1'];
      });
    }

    req.parsedQuery = parsedQuery;
    next();
  }
}
