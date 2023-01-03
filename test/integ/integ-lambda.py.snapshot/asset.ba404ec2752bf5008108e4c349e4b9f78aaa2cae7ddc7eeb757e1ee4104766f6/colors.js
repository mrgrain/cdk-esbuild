"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../fixtures/handlers/colors.ts
var colors_exports = {};
__export(colors_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(colors_exports);
var handler = async (favorites) => {
  return `My favorite colour is ${favorites.colour}, I always like to eat some ${favorites.food} and ${favorites.season} is the best time of the year.`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
