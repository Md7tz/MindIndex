import { expect } from "chai";
import knex from "knex";
import dotenv from "dotenv";
import _dbConfig from "../knexfile.js";

import Note from "../models/note.mjs";
import User from "../models/User.mjs";
import Collection from "../models/Collection.mjs";
import Flashcard from "../models/Flashcard.mjs";

dotenv.config();

let dbConfig = null;

switch (process.env.NODE_ENV) {
  case "development":
    dbConfig = _dbConfig.development;
    break;
  case "test":
    dbConfig = _dbConfig.docker;
    break;
  default:
    throw new Error(`Unknown environment: ${NODE_ENV}`);
}

describe("Database connection test", () => {
  it("should connect to the database", async () => {
    const db = knex(dbConfig);
    await db.raw("SELECT 1");
    await db.destroy();
  }).timeout(5000);

  it("should throw an error if unable to connect to the database", async () => {
    const invalidConfig = {
      client: "pg",
      connection: {
        host: "invalid-host",
        user: "root",
        password: "password",
        database: "test_db",
        port: 1234,
      },
    };

    let error;

    try {
      const db = knex(invalidConfig);
      await db.raw("SELECT 1");
      await db.destroy();
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
  }).timeout(10000);

  describe("Note Model", () => {
    it('table name should be "notes"', () => {
      expect(Note.tableName).to.equal("notes");
    });
  });

  describe("User Model", () => {
    it('table name should be "users"', () => {
      expect(User.tableName).to.equal("users");
    });
  });

  describe("Collection Model", () => {
    it('table name should be "collections"', () => {
      expect(Collection.tableName).to.equal("collections");
    });
  });

  describe("Flashcard Model", () => {
    it('table name should be "flashcards"', () => {
      expect(Flashcard.tableName).to.equal("flashcards");
    });
  });
});
