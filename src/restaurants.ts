export interface Photo {
  url: string;
  caption: string;
  credit: string;
  source: string;
}

export interface DishMatch {
  name: string;
  reference: string;
  score: number;
  reason: string;
  photo?: Photo;
}

export interface Twin {
  name: string;
  area: string;
  tone: "rose" | "sage" | "honey";
  price: number;
  match: number;
  opening: string;
  format: string;
  note: string;
  room: Photo;
  dishes: DishMatch[];
}

export const atomix = {
  room: {
    url: "https://images.squarespace-cdn.com/content/v1/5ac3bec4aa49a18caab02bf4/1568266097028-NYA636EEL33OHVSW85N8/Atomix_Lounge-Downstairs_Photo%2BCredit%2BEvan%2BSung.jpg?format=1000w",
    caption: "Atomix downstairs dining space",
    credit: "Evan Sung / Atomix",
    source: "https://www.atomixnyc.com/gallery-1"
  },
  archive: {
    url: "https://images.squarespace-cdn.com/content/v1/5ac3bec4aa49a18caab02bf4/1568266055326-8REZ6A0XA4ULKEVTYGAC/Atomix_Jjim_Photo%2BCredit%2BEvan%2BSung.jpg?format=900w",
    caption: "Jjim from a previous Atomix menu",
    credit: "Evan Sung / Atomix",
    source: "https://www.atomixnyc.com/gallery-1"
  },
  dishes: [
    {
      name: "Honeysuckle sikhye",
      description: "A sweet Korean rice drink with honeysuckle."
    },
    {
      name: "Lamb saddle with neungi mushrooms"
    },
    {
      name: "Dubu mu",
      description: "Tofu and radish"
    },
    {
      name: "Gosari rice",
      description: "Rice with bracken fern"
    }
  ]
} satisfies {
  room: Photo;
  archive: Photo;
  dishes: { name: string; description?: string }[];
};

export const twins = {
  jungsik: {
    name: "Jungsik",
    area: "Tribeca",
    tone: "rose",
    price: 335,
    match: 68,
    opening: "Nov. 13 · 9:30 p.m.",
    format: "Signature tasting menu",
    note: "The earliest opening shown was for the main dining room.",
    dishes: [
      {
        name: "Galbi",
        reference: "Lamb saddle with neungi mushrooms",
        score: 75,
        reason: "Both are centerpiece meat courses with Korean accompaniments. Jungsik serves beef with white kimchi.",
        photo: {
          url: "https://pics.gourmandsyndrome.com/jungsik%2F22_galbi.webp",
          caption: "Galbi at Jungsik, shown with its earlier barley rice presentation",
          credit: "Gourmand Syndrome",
          source: "https://www.gourmandsyndrome.com/nyc/korean/jungsik/"
        }
      },
      {
        name: "Yellowtail kimbap",
        reference: "Gosari rice",
        score: 75,
        reason: "Both highlight seasoned rice. Jungsik uses truffle rice and crispy seaweed in a roll.",
        photo: {
          url: "https://www.theworlds50best.com/northamerica/en/filestore/jpg/NA50BR25-Jungsik-Dish-Kimbap.jpg",
          caption: "Jungsik signature kimbap",
          credit: "The 50 Best",
          source: "https://www.theworlds50best.com/northamerica/en/the-list/jungsik.html"
        }
      },
      {
        name: "Yun-dubu",
        reference: "Dubu mu",
        score: 70,
        reason: "Both feature tofu as a Korean side dish. Jungsik lists its version in the bar menu’s banchan selection.",
        photo: {
          url: "https://pics.gourmandsyndrome.com/jungsik%2F3_banchan.webp",
          caption: "Jungsik’s banchan platter, which includes yun-dubu",
          credit: "Gourmand Syndrome",
          source: "https://www.gourmandsyndrome.com/nyc/korean/jungsik/"
        }
      }
    ],
    room: {
      url: "https://tock-public.imgix.net/imagesprod/user_uploaded_images_v1/05836a82-d3ea-44f6-88f1-0bbd1131204b.jpg?auto=format&ixlib=java-2.3.2&ixlib=js-3.8.0&w=1000",
      caption: "Jungsik main dining room",
      credit: "Jungsik / Tock",
      source: "https://www.exploretock.com/jungsik/experience/625028/jungsik-main-dining-room-november-december-2026"
    }
  },
  naro: {
    name: "NARO",
    area: "Rockefeller Center",
    tone: "sage",
    price: 125,
    match: 48,
    opening: "Nov. 10 · 5:00 p.m.",
    format: "Five-course dinner tasting",
    note: "The matched dishes are à la carte. The five-course tasting menu rotates.",
    dishes: [
      {
        name: "Oyster mushroom bowl",
        reference: "Gosari rice",
        score: 80,
        reason: "Both offer earthy flavors over rice. NARO uses oyster mushrooms and black truffle, while Atomix uses bracken fern.",
        photo: {
          url: "https://d1w7312wesee68.cloudfront.net/wXhy9Dk7YFZqQ-TJuZfPUEsQ-TP-qMF7kdVgz_8Qego/resize%3Afit%3A720%3A720/plain/s3%3A/toasttab/restaurants/restaurant-113310000000000000/menu/items/2/item-200000051763030842_1749248781.jpg",
          caption: "NARO’s oyster mushroom bowl with black truffle and sunchoke chips",
          credit: "NARO’s ordering menu",
          source: "https://order.toasttab.com/online/naro-nyc/item-oyster-mushroom-bowl_aed83a33-48e8-4372-819b-d4a72b4f92f9"
        }
      },
      {
        name: "Galbi beef patty bowl",
        reference: "Lamb saddle with neungi mushrooms",
        score: 65,
        reason: "Both pair a savory meat preparation with rice. NARO uses a sweet-soy beef patty.",
        photo: {
          url: "https://www.nyculturebeat.com/files/attach/images/3947434/876/159/004/b28bb1dcff1d01be42afd616d6aebccb.jpg",
          caption: "Galbi beef patty bowl from NARO’s 2025 lunch menu",
          credit: "NYCultureBeat",
          source: "https://www.nyculturebeat.com/index.php?document_srl=4159876&mid=FoodDrink2"
        }
      },
      {
        name: "Fried eggplant with smoked tofu",
        reference: "Dubu mu",
        score: 60,
        reason: "Both pair tofu with vegetables. NARO uses smoked tofu and eggplant for a different flavor and texture."
      }
    ],
    room: {
      url: "https://cdn.sanity.io/images/bs9rmafh/main/2694ba4196bca6d0ccf8229b926a44962d03dcc9-5997x4000.jpg?w=1000&auto=format",
      caption: "NARO main dining room",
      credit: "Rockefeller Center",
      source: "https://www.rockefellercenter.com/magazine/food-drinks/naro-at-rockefeller-center/"
    }
  },
  jua: {
    name: "Jua",
    area: "Flatiron",
    tone: "honey",
    price: 150,
    match: 41,
    opening: "Nov. 17 · 8:30 p.m.",
    format: "Seven-course tasting menu",
    note: "Jua releases tables three weeks ahead. Some later dates in the research window were still unreleased.",
    dishes: [
      {
        name: "Duck & Chan",
        reference: "Lamb saddle with neungi mushrooms",
        score: 65,
        reason: "Both center a protein course around Korean accompaniments. Jua serves duck.",
        photo: {
          url: "https://images.squarespace-cdn.com/content/v1/54ff4fa6e4b048b3e7348ab4/95ba4f63-f081-4b38-8e2c-ff7f939a203e/jua-nyc-012.jpg?format=900w",
          caption: "Duck & Chan from a 2023 visit to Jua",
          credit: "Jenn Pan",
          source: "https://www.jenn.la/posts/2023/8/4/jua-new-york-city"
        }
      },
      {
        name: "Jook",
        reference: "Gosari rice",
        score: 60,
        reason: "Both feature rice in a Korean tasting menu. Jua serves it as porridge.",
        photo: {
          url: "https://images.squarespace-cdn.com/content/v1/54ff4fa6e4b048b3e7348ab4/21c5838d-92ff-4ec3-bde0-24e5a1016dc9/jua-nyc-009.jpg?format=900w",
          caption: "Jook from a 2023 visit to Jua",
          credit: "Jenn Pan",
          source: "https://www.jenn.la/posts/2023/8/4/jua-new-york-city"
        }
      }
    ],
    room: {
      url: "https://bestofkorea.com/wp-content/uploads/2022/09/JuaWeb021_recopy_c-2.jpg",
      caption: "Jua dining room",
      credit: "Best of Korea",
      source: "https://bestofkorea.com/review-jua-nyc-modern-korean-restaurant/"
    }
  }
} satisfies Record<string, Twin>;

export type TwinId = keyof typeof twins;

export function isTwinId(value: unknown): value is TwinId {
  return typeof value === "string" && Object.hasOwn(twins, value);
}
