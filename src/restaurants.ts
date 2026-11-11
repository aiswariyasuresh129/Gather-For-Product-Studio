import { restaurantPhotos, ruleDishPhotos } from './photos';

export interface Photo {
  url: string;
  caption: string;
  credit: string;
  source: string;
  originalUrl?: string;
}

interface Dish {
  name: string;
  description: string;
  price?: number;
  photo?: Photo;
}

interface DishMatch {
  name: string;
  score: 0 | 50 | 75 | 100;
  reason: string;
}

type DishMatches = [DishMatch, DishMatch, DishMatch, DishMatch, DishMatch];

export interface Booking {
  platform: string;
  url: string;
  opening?: string;
}

export interface Twin {
  meal: MealId;
  name: string;
  area: string;
  address: string;
  camis: string;
  tone: 'rose' | 'sage' | 'honey';
  price: number;
  order: string;
  atmosphere: number;
  atmosphereReason: string;
  menu: string;
  booking: Booking;
  affiliation?: string;
  photo: Photo;
  dishes: DishMatches;
}

export const restaurant = {
  name: 'Rule of Thirds',
  area: 'Greenpoint, Brooklyn',
  address: '171 Banker St, Brooklyn',
  description: 'Japanese home cooking and izakaya-style dining.',
  menu: 'https://www.thirdsbk.com/menus/',
  photo: restaurantPhotos.ruleOfThirds,
};

const ruleOfThirdsResy = 'https://resy.com/cities/new-york-ny/venues/rule-of-thirds';
const availabilityDate = 'Nov. 10, 2026';

export interface Meal {
  label: string;
  hours: string;
  price: number;
  order: string;
  priceMethod: string;
  booking: Booking;
  weights: [number, number, number, number, number];
  dishes: [Dish, Dish, Dish, Dish, Dish];
}

export const meals = {
  brunch: {
    label: 'Brunch',
    hours: 'Saturday and Sunday · 10 a.m.–3 p.m.',
    price: 31,
    order: 'Hottokeki, chicken katsu sando and gyudon',
    priceMethod: 'One shared pancake or hotcake and two savory mains for two.',
    booking: { platform: 'Resy', url: ruleOfThirdsResy },
    weights: [20, 10, 10, 10, 10],
    dishes: [
      {
        name: 'Hottokeki',
        description: 'Japanese soufflé pancake with honey maple butter and sesame.',
        price: 20,
        photo: ruleDishPhotos.hottokeki,
      },
      { name: 'Karaage', description: 'Fried chicken with ginger soy and tartar sauce.', price: 17, photo: ruleDishPhotos.karaage },
      { name: 'Chicken katsu sando', description: 'Panko-fried chicken thigh with pickled daikon, katsu sauce and mustard.', price: 18, photo: ruleDishPhotos.sando },
      { name: 'Gyudon', description: 'Thinly sliced wagyu and onion over rice, with almond miso soup.', price: 24, photo: ruleDishPhotos.gyudon },
      { name: 'Japanese breakfast set', description: 'Roasted market fish, short-grain rice, vegetables and almond miso soup.', photo: ruleDishPhotos.breakfast },
    ],
  },
  dinner: {
    label: 'Dinner',
    hours: 'Daily from 5 p.m. · À la carte',
    price: 57.5,
    order: 'Karaage, silken tofu, hamachi collar, tonkatsu and two yaki onigiri',
    priceMethod: 'Two starters, two mains and a shared rice side for two.',
    booking: { platform: 'Resy', url: ruleOfThirdsResy, opening: 'Nov. 10 · 5:45 p.m. ET' },
    weights: [12, 12, 12, 12, 12],
    dishes: [
      { name: 'Karaage', description: 'Fried chicken with ginger soy and tartar sauce.', price: 17, photo: ruleDishPhotos.karaage },
      { name: 'House silken tofu', description: 'Housemade silken tofu with seasonal accompaniments.', price: 16, photo: ruleDishPhotos.tofu },
      { name: 'Yaki onigiri', description: 'Crisp grilled rice ball with chicken fat. Vegan option available.', price: 5, photo: ruleDishPhotos.onigiri },
      { name: 'Binchotan chicken meatball', description: 'Charcoal-grilled chicken meatball with Worcestershire yolk jam.', price: 5, photo: ruleDishPhotos.meatball },
      { name: 'Tonkatsu', description: 'Breaded bone-in pork loin with cabbage and hatcho miso.', price: 37 },
    ],
  },
} satisfies Record<string, Meal>;

export type MealId = keyof typeof meals;
export { availabilityDate };

export const twins = {
  softbite: {
    photo: restaurantPhotos.softbite,
    meal: 'brunch', name: 'Softbite', area: 'Long Island City, Queens', address: '42-60 Crescent St', camis: '50133311', tone: 'rose',
    price: 31, order: 'Softbite crème pancakes, tonkatsu sando and gyudon',
    atmosphere: 11, atmosphereReason: 'A casual café built around pancakes, coffee and brunch plates.',
    menu: 'https://pos.chowbus.com/online-ordering/store/Softbite/23960',
    booking: { platform: 'Softbite', url: 'https://www.softbite.us/about' },
    dishes: [
      { name: 'Softbite crème soufflé pancakes', score: 100, reason: 'The same airy pancake style, topped with cream and fruit.' },
      { name: 'Chicken karaage', score: 100, reason: 'Japanese fried chicken with shichimi and spicy mayo.' },
      { name: 'Tonkatsu sando', score: 75, reason: 'A breaded-cutlet sandwich with katsu sauce, made with pork.' },
      { name: 'Gyudon', score: 100, reason: 'Sliced beef and onions over Japanese rice, with a poached egg.' },
      { name: 'Miso salmon', score: 50, reason: 'Fish, rice and vegetables overlap with the breakfast set. Softbite serves them as a plated entrée.' },
    ],
  },
  'vert-frais': {
    photo: restaurantPhotos['vert-frais'],
    meal: 'brunch', name: 'Vert Frais', area: 'Long Island City, Queens', address: '43-10 Crescent St', camis: '50129486', tone: 'sage',
    price: 32.5, order: 'Vert Frais matcha soufflé pancake, katsu don and salmon and ikura bowl',
    atmosphere: 12, atmosphereReason: 'A sit-down brunch with shareable plates and a relaxed French-Japanese bistro setting.',
    menu: 'https://vertfrais.squarespace.com/food',
    booking: { platform: 'Resy', url: 'https://resy.com/cities/new-york-ny/venues/vert-frais' },
    dishes: [
      { name: 'Matcha soufflé pancake', score: 100, reason: 'The same soufflé style, with matcha, cream and seasonal fruit.' },
      { name: 'Chicken karaage', score: 100, reason: 'Japanese fried chicken finished with fried garlic.' },
      { name: 'Katsu don', score: 50, reason: 'A breaded cutlet served as pork over rice instead of chicken on bread.' },
      { name: '', score: 0, reason: 'The brunch menu has rice bowls, but no comparable sliced-beef bowl was found.' },
      { name: 'Salmon and ikura bowl', score: 50, reason: 'Fish and rice overlap. This bowl uses raw salmon and roe instead of roasted fish and set sides.' },
    ],
  },
  'hi-collar': {
    photo: restaurantPhotos['hi-collar'],
    meal: 'brunch', name: 'Hi-Collar', area: 'East Village, Manhattan', address: '231 E. 9th St', camis: '50115872', tone: 'honey',
    price: 28, order: 'Gachi hotcake, katsu sandwich and Gachi hayashi rice',
    atmosphere: 9, atmosphereReason: 'A Japanese coffeehouse with a daytime menu, suited to a smaller café meal.',
    menu: 'https://www.hi-collar.com/menu',
    booking: { platform: 'Resy', url: 'https://resy.com/cities/new-york-ny/venues/hi-collar' },
    dishes: [
      { name: 'Gachi hotcake', score: 75, reason: 'A Japanese hotcake with butter and maple syrup. The menu describes it as a hotcake, with no soufflé preparation specified.' },
      { name: '', score: 0, reason: 'No comparable chicken karaage was found on the daytime menu.' },
      { name: 'Pork katsu sandwich', score: 75, reason: 'A breaded-cutlet sandwich on milk bread, made with pork.' },
      { name: 'Gachi hayashi rice', score: 50, reason: 'Beef and onion over rice, prepared as a demi-glace stew.' },
      { name: '', score: 0, reason: 'No comparable fish breakfast set was found on the daytime menu.' },
    ],
  },
  yopparai: {
    photo: restaurantPhotos.yopparai,
    meal: 'dinner', name: 'Yopparai', area: 'Lower East Side, Manhattan', address: '49 Clinton St', camis: '50008955', tone: 'rose',
    price: 57, order: 'Karaage, agedashi tofu, black cod, wagyu teppanyaki and yaki onigiri',
    atmosphere: 12, atmosphereReason: 'Japanese small plates and sake in an intimate dining room with tatami booths and counter seats.',
    menu: 'https://www.yopparainyc.com/yopparai-menu',
    booking: { platform: 'OpenTable', url: 'https://www.opentable.com/yopparai', opening: 'Nov. 10 · 5:30 p.m. ET' },
    dishes: [
      { name: 'Karaage', score: 100, reason: 'Japanese fried chicken marinated in rice malt and garlic.' },
      { name: 'Agedashi tofu', score: 50, reason: 'Tofu served deep-fried in thickened dashi.' },
      { name: 'Yaki onigiri', score: 100, reason: 'Two grilled rice balls with cod roe and uni toppings.' },
      { name: 'Tsukune', score: 100, reason: 'Japanese barbecue chicken meatball topped with egg yolk.' },
      { name: '', score: 0, reason: 'No comparable pork cutlet was found on the dinner menu.' },
    ],
  },
  teruko: {
    photo: restaurantPhotos.teruko,
    meal: 'dinner', name: 'Teruko', area: 'Chelsea, Manhattan', address: '222 W. 23rd St', camis: '50173099', tone: 'sage',
    price: 65, order: 'Housemade tofu, chicken nanban, black cod, pork katsu and shiso rice',
    atmosphere: 10, atmosphereReason: 'An intimate hotel dining room with a sushi counter and a more formal feel.',
    menu: 'https://hotelchelsea.com/dining-and-bar/teruko',
    booking: { platform: 'Resy', url: 'https://resy.com/cities/new-york-ny/venues/teruko', opening: 'Nov. 10 · 5:30 p.m. ET' },
    affiliation: 'https://www.sundayhg.com/restaurants-and-more/',
    dishes: [
      { name: 'Chicken nanban', score: 75, reason: 'Fried chicken thigh dressed with black vinegar and green yuzu mayo.' },
      { name: 'Housemade tofu', score: 100, reason: 'Chilled housemade tofu with shiso-scallion sauce.' },
      { name: '', score: 0, reason: 'No comparable grilled rice ball was found on the dinner menu.' },
      { name: 'Oyako tsukune', score: 100, reason: 'Robata-grilled chicken meatball with yakitori sauce and egg yolk.' },
      { name: 'Berkshire pork katsu', score: 100, reason: 'Breaded pork loin with mustard tonkatsu sauce.' },
    ],
  },
  wakuwaku: {
    photo: restaurantPhotos.wakuwaku,
    meal: 'dinner', name: 'WakuWaku', area: 'Sunset Park, Brooklyn', address: '269 36th St', camis: '50100043', tone: 'honey',
    price: 35, order: 'Karaage, agedashi tofu, kalbi beef, unagi and rice, and miso yaki onigiri',
    atmosphere: 13, atmosphereReason: 'A relaxed izakaya with shared plates and reservable tatami seating.',
    menu: 'https://www.wakuwakuny.com/info-menu',
    booking: { platform: 'Resy', url: 'https://resy.com/cities/new-york-ny/venues/oldies', opening: 'Nov. 11 · 5:15 p.m. ET' },
    dishes: [
      { name: 'Karaage', score: 100, reason: 'Japanese fried chicken served as a shared starter.' },
      { name: 'Agedashi tofu', score: 50, reason: 'Fried tofu served in dashi sauce.' },
      { name: 'Miso yaki onigiri', score: 100, reason: 'Two grilled rice balls seasoned with miso.' },
      { name: 'Tsukune skewer', score: 100, reason: 'Grilled chicken meatball with an optional egg yolk.' },
      { name: '', score: 0, reason: 'No comparable pork cutlet was found on the dinner menu.' },
    ],
  },
} satisfies Record<string, Twin>;

export type TwinId = keyof typeof twins;

export function isTwinId(value: unknown): value is TwinId {
  return typeof value === 'string' && Object.hasOwn(twins, value);
}

export function isMealId(value: unknown): value is MealId {
  return typeof value === 'string' && Object.hasOwn(meals, value);
}

export function matchPoints(twin: Twin) {
  const meal = meals[twin.meal];
  const dishes = Math.round(twin.dishes.reduce(
    (total, dish, index) => total + dish.score / 100 * meal.weights[index], 0,
  ));
  const priceGap = Math.abs(twin.price - meal.price) / meal.price;
  const price = Math.round(25 * Math.max(0, 1 - priceGap));

  return { dishes, price, atmosphere: twin.atmosphere, total: dishes + price + twin.atmosphere };
}

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2,
});

export function formatPrice(price: number) {
  return dollars.format(price);
}
