require("dotenv").config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const { default: User } = await import("../models/User.mjs");

  const user = await knex("users").where({ username: process.env.DEFAULT_USER }).first();
  
  if (!user) {
    await knex("users").insert({
      username: process.env.DEFAULT_USER,
      password: await User.hashPassword(process.env.DEFAULT_PASSWORD),
      email: process.env.DEFAULT_EMAIL,
      fullname: "Super User",
    });
  }

};
