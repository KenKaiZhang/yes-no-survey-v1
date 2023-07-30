export const setStorage = (key: string, value: any) => {
  console.log(key, value);
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("ITEM SET");
  }
};

export const getStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const removeStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const checkStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) ? true : false;
  }
};
