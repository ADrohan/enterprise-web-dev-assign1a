"use strict";

const Accounts = require("./app/controllers/accounts");
const Pois = require("./app/controllers/pois");

module.exports = [
  // routes for accounts autentication
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: "GET", path: "/settings", config: Accounts.showSettings },
  { method: "POST", path: "/settings", config: Accounts.updateSettings },

  // routes for Pois
  { method: "GET", path: "/home", config: Pois.home },
  { method: "GET", path: "/allpois", config: Pois.allpois },
  { method: "POST", path: "/addpoi", config: Pois.addpoi },
  { method: "GET", path: "/deletepoi/{id}", config: Pois.deletepoi},
  { method: "GET", path: "/poisettings/{id}", config: Pois.showpoi},
  { method: "POST", path: "/poisettings/{id}", config: Pois.updatepoi},

  // routes for images
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];


