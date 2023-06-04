export default class Basepath {
  static get(url) {
    // replace /# with # to avoid page reload
    url = `${process.env.NEXT_PUBLIC_BASEPATH || ''}${url}`;
    url = url.replace(/\/#/g, "#");
    return url;
  }
}

export class Navigate {
  static push(url) {
    window.location.assign(Basepath.get(url));
  }

  static replace(url) {
    window.location.replace(Basepath.get(url));
  }

  static back() {
    window.history.back();
  }

  static pushState(data, unused, url) {
    window.history.pushState(data, unused, Basepath.get(url));
  }
}
