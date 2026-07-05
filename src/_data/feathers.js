const fs = require('fs');
const path = require('path');

// Groups feathers by intended size. Drop a vertical PNG into
// src/assets/feathers/{small,medium,large}/ and it is picked up on the next
// build; the folder it lives in decides how big it renders beside a heading.
const BUCKETS = ['small', 'medium', 'large'];

function listBucket(bucket) {
  const dir = path.join(__dirname, '../assets/feathers', bucket);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f))
      .sort()
      .map((f) => '/assets/feathers/' + bucket + '/' + f);
  } catch (e) {
    return [];
  }
}

module.exports = () => {
  const out = {};
  BUCKETS.forEach((b) => (out[b] = listBucket(b)));
  return out;
};
