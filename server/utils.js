const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, 'db.json');
function readDB() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
function writeDB(json) { fs.writeFileSync(DB_PATH, JSON.stringify(json, null, 2)); }
function makeId(prefix = '') { return prefix + Math.random().toString(36).slice(2, 9); }
module.exports = { readDB, writeDB, makeId };