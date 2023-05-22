import { v4 as uuid } from "uuid";

export const categories = [
  {
    _id: uuid(),
    categoryName: "Topwear",
    description: "Check out our best Top Wear Collection",
    image:
      "https://image.clovia.com/media/clovia-images/images/400x600/clovia-picture-cotton-racerback-tank-top-1-355314.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Bottomwear",
    description: "Check out our best Bottom Wear Collection",
    image:
      "https://image.clovia.com/media/clovia-images/images/400x600/clovia-picture-lb0139a19-479514.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Nightsuit",
    description: "Check out our best Night Suit Collection",
    image:
      "https://image.clovia.com/media/clovia-images/images/400x600/clovia-picture-ls0680a08-624984.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Nightdress",
    description: "Check out our best Night Dress Collection",
    image:
      "https://image.clovia.com/media/clovia-images/images/400x600/clovia-picture-chic-basic-robe-short-nighty-set-in-rust-brown-satin-896300.jpg",
  },
];
