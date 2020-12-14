const localJSON = {
  getItem: (itemKey: string) => {
    try {
      return JSON.parse(localStorage.getItem(itemKey) || "");
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  setItem: (itemKey: string, item: any) =>
    localStorage.setItem(itemKey, JSON.stringify(item))
};

export default localJSON;
