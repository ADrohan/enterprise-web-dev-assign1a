"use strict";

const Poi = require("../models/poi");
const User = require("../models/user");
const Category = require("../models/category");

const Pois = {
  home: {
    handler: async function (request, h) {
      const categories = await Category.find().lean();
      return h.view("home", { title: "Add a Poi", categories: categories });
    },
  },
  allpois: {
    handler: async function (request, h) {
      try {
        const poiList = await Poi.find().populate("user").populate("category").lean();
        return h.view("allpois", {
          title: "Pois so far",
          pois: poiList,
      });
      }catch (err) {
        return h.view( 'login', { errors: [{ message: err.message }] });
      }
    }
  },
  addpoi: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawCategory = request.payload.category;
        const category = await Category.findOne({
          name: rawCategory,
        });

        const newPoi = new Poi({
          name: data.name,
          category: category._id,
          description: data.description,
          //longitude: data.longitude,
          //latitude: data.latitude,
          user: user._id,
        });
        await newPoi.save();
        return h.redirect("/allpois");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Pois;
