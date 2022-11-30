const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongo connected");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63684e5547995ba2aee113c4",
      location: `${cities[randomNum].city},${cities[randomNum].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, reprehenderit, eaque reiciendis tenetur eveniet possimus vero eum blanditiis voluptatum culpa iusto fuga? Atque rerum molestiae cumque, ducimus debitis ipsam! Voluptatem.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [cities[randomNum].longitude, cities[randomNum].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dnbiqqqer/image/upload/v1668481392/YelpCamp/mfq3jr9y6qxv2xuhsh10.jpg",
          filename: "YelpCamp/mfq3jr9y6qxv2xuhsh10",
        },
        {
          url: "https://res.cloudinary.com/dnbiqqqer/image/upload/v1668481392/YelpCamp/nfgane8h2wsucew3wht3.jpg",
          filename: "YelpCamp/nfgane8h2wsucew3wht3",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
