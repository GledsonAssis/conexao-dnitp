const clear = () => {
  const ISSERVER = typeof window === 'undefined';
  if (!ISSERVER) {
    localStorage.clear();
  }
};

const get = (key: string) => {
  const ISSERVER = typeof window === 'undefined';
  if (!ISSERVER) {
    const local = localStorage.getItem(key);
    if (local) {
      return JSON.parse(local);
    }
  }
};

const put = (key: string, value: any) => {
  const ISSERVER = typeof window === 'undefined';
  if (!ISSERVER) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const remove = (key: string) => {
  const ISSERVER = typeof window === 'undefined';
  if (!ISSERVER) {
    localStorage.removeItem(key);
  }
};

export default {
  clear,
  get,
  put,
  remove,
};
