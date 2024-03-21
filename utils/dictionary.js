const all = {
  guest: "Гость",
  admin: "Админ",
  realtor: "Риелтор",
  REALTOR: "Риелтор",
  builder: "Застройщик",
  agency: "АГЕНТСТВО НЕДВИЖИМОСТИ",
};

const distionary = (word) => {
  try {
    if (all.hasOwnProperty(word)) {
      return all[word];
    } else {
      return null;
    }
  } catch (error) {}
};

export default distionary;
