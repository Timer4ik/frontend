export const useCollections = () => {
  return {
    alertStatuses:[
      {
        id:"archive",
        value:"Архивный"
      },
      {
        id:"sended",
        value:"Отправлено"
      },
      {
        id:"processing",
        value:"В обработке"
      },
      {
        id:"new",
        value:"Новый"
      },
    ],
    alertTypes: [
      {
        id: "news",
        value: "Новости",
      },
    ],
    objects: [
      {
        id: 1,
        name: "апартаменты",
        value: "апартаменты",
        type: "квартира",
      },
      {
        id: 2,
        name: "таунхаус",
        value: "таунхаус",
        type: "квартира",
      },
      {
        id: 11,
        name: "таунхаус",
        value: "таунхаус",
        type: "квартира",
      },
      {
        id: 14,
        name: "пентхаус",
        value: "пентхаус",
        type: "квартира",
      },
      {
        id: 20,
        name: "мезонет",
        value: "мезонет",
        type: "квартира",
      },
      {
        id: 21,
        name: "студия",
        value: "студия",
        type: "квартира",
      },
      {
        id: 22,
        name: "лофт",
        value: "лофт",
        type: "квартира",
      },
      {
        id: 5,
        name: "кафе, ресторан",
        value: "кафе, ресторан",
        type: "коммерческая недвижимост",
      },
      {
        id: 6,
        name: "магазин",
        value: "магазин",
        type: "коммерческая недвижимост",
      },
      {
        id: 7,
        name: "офис",
        value: "офис",
        type: "коммерческая недвижимост",
      },
      {
        id: 8,
        name: "производство",
        value: "производство",
        type: "коммерческая недвижимост",
      },
      {
        id: 12,
        name: "отель, гостиница",
        value: "отель, гостиница",
        type: "коммерческая недвижимост",
      },
      {
        id: 13,
        name: "иная коммерческая недвижимость",
        value: "иная коммерческая недвижимость",
        type: "коммерческая недвижимост",
      },
      {
        id: 18,
        name: "доходный дом",
        value: "доходный дом",
        type: "коммерческая недвижимост",
      },
      {
        id: 34,
        name: "инвестиционный проект",
        value: "инвестиционный проект",
        type: "коммерческая недвижимост",
      },
      {
        id: 10,
        name: "земельный участок",
        value: "земельный участок",
        type: "земля",
      },
      {
        id: 19,
        name: "частный остров",
        value: "частный остров",
        type: "земля",
      },
      {
        id: 3,
        name: "дом",
        value: "дом",
        type: "дом",
      },
      {
        id: 24,
        name: "коттедж",
        value: "коттедж",
        type: "дом",
      },
      {
        id: 25,
        name: "вилла",
        value: "вилла",
        type: "дом",
      },
      {
        id: 26,
        name: "шале",
        value: "шале",
        type: "дом",
      },
      {
        id: 27,
        name: "бунгало",
        value: "бунгало",
        type: "дом",
      },
      {
        id: 28,
        name: "поместье",
        value: "поместье",
        type: "дом",
      },
      {
        id: 29,
        name: "замок",
        value: "замок",
        type: "дом",
      },
      {
        id: 30,
        name: "ферма",
        value: "ферма",
        type: "дом",
      },
      {
        id: 32,
        name: "особняк",
        value: "особняк",
        type: "дом",
      },
      {
        id: 33,
        name: "дом под реконструкцию",
        value: "дом под реконструкцию",
        type: "дом",
      },
    ],
    types: [
      {
        id: 1,
        name: "Продажа",
        value: "Продажа",
      },
      {
        id: 2,
        name: "Аренда",
        value: "Аренда",
      },
    ],
    building_types: [
      {
        id: 117,
        name: "Новый дом",
        value: "Новый дом",
      },
      {
        id: 118,
        name: "Строящийся объект",
        value: "Строящийся объект",
      },
      {
        id: 119,
        name: "Вторичная недвижимость",
        value: "Вторичная недвижимость",
      },
    ],
    currencySign: {
      RUR: "₽",
      EUR: "€",
      USD: "$",
    },
    currencies: [
      {
        id: 1,
        name: "$",
        value: "$",
      },
      {
        id: 2,
        name: "€",
        value: "€",
      },
      {
        id: 3,
        name: "₽",
        value: "₽",
      },
    ],
    currenciesText: [
      {
        id: 1,
        name: "USD",
        value: "USD",
      },
      {
        id: 2,
        name: "EUR",
        value: "EUR",
      },
      {
        id: 3,
        name: "RUR",
        value: "RUR",
      },
    ],
    roles: [
      {
        id: "client",
        value: "Покупатель",
      },
      {
        id: "admin",
        value: "Админ",
      },
      {
        id: "realtor",
        value: "Риелтор",
      },
      {
        id: "builder",
        value: "Застройщик",
      },
      {
        id: "agency",
        value: "Агентство недвижимости",
      },
    ],
    square_land_units: [
      {
        id: 129,
        name: "кв.м.",
        value: "кв.м.",
      },
      {
        id: 128,
        name: "сотки",
        value: "сотки",
      },
      {
        id: 130,
        name: "гектары",
        value: "гектары",
      },
      {
        id: 131,
        name: "акры",
        value: "акры",
      },
    ],
  };
};
