"use strict";

const Poi = require("../models/poi");
const User = require("../models/user");
const Category = require("../models/category");
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const Pois = {
  home: {
    handler: async function (request, h) {
      const categories = await Category.find().lean();
      return h.view("home", { title: "Add a Poi", categories: categories });
    },
  },
  // controller for listing all pois
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
  // controller for adding a poi
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
          user: user._id,
        });
        console.log(newPoi)
        await newPoi.save();
        return h.redirect("/allpois");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  // controller for deleting a poi
  deletepoi: {
    handler: async function (request, h)
    {
      try {
        const poi_id = request.params.id;
        await Poi.findByIdAndDelete(poi_id);
        return h.redirect("/allpois");
      } catch (err) {
        return h.view('login', {errors: [{message: err.message}]});
      }
    }
  },

  // controller for showing the current settings for a specific poi
  showpoi: {
    handler: async function (request, h)
    {
      try
      {
        const poi_id = request.params.id;
        const category = await Category.find().lean();
        const poi = await Poi.findById(poi_id).populate('category').lean();

        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();

        //For debiugging
        console.log("poi id: " + poi_id); // retuns poi id
        console.log("Poi category" + category); //
        console.log("POI category name: " + category._id);

        return h.view('poisettings', { title: 'Update POI', poi: poi, categories: category, user: user  });
      } catch (err)
      {
        return h.view('login', {errors: [{message: err.message}]});
      }
    }
  },
  // controller to update a poi
  updatepoi: {
    // joi validation of fields
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h.view("allpois", { title: "Error updating Poi", errors: error.details, })
          .takeover()
          .code(400);
      },
    },
    //assign new data to each field if joi validation passes
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        const poi_id = request.params.id;
        const poi= await Poi.findById(poi_id);

        const user_id = request.auth.credentials.id;
        const user = await User.findById(user_id);

        const rawCategory = userEdit.category;
        const category = await Category.findOne({
          name: rawCategory,
        });
        poi.name = userEdit.name;
        poi.description = userEdit.description;
        poi.category = category._id
        poi.user = user._id
        await poi.save();
        return h.redirect("/allpois");
      } catch (err)
      {
        return h.view("main",{ errors: [{ message: err.message }] });
      }
    },
  },

};

module.exports = Pois;
