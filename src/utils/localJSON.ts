const localJSON = {
  getItem: (itemKey: string) => {
    try {
      const item: string | null = localStorage.getItem(itemKey);
      if (item == null) {
        return null;
      } else {
        return JSON.parse(item);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  setItem: (itemKey: string, item: any) =>
    localStorage.setItem(itemKey, JSON.stringify(item))
};

export default localJSON;
