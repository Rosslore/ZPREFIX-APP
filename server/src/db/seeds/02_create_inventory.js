/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex('inventory').del()
//   await knex('inventory').insert([
//     { name: 'TV', description: 'Samsung 55 inch', quantity: '5', user_id: '1' },
//     { name: 'Laptop', description: 'Macbook Pro', quantity: '2', user_id: '2' },
//     { name: 'Phone', description: 'iPhone 12', quantity: '10', user_id: '1' },
//     { name: 'Tablet', description: 'iPad Pro', quantity: '5', user_id: '2' },
//     { name: 'Desktop', description: 'Dell XPS', quantity: '3', user_id: '1' },
//   ]);
// };


const { faker } = require("@faker-js/faker");

const createFakeInventory = () => {
  fakeInventory = [];

  for (let i = 0; i < 10; i++) {
    const num = i % 2 === 0 ? 1 : 2;
    const inventory = {
      name: faker.helpers.arrayElement(['TV', 'Laptop', 'Phone', 'Tablet', 'Desktop']),
      description: faker.commerce.productDescription(),
      quantity: faker.random.numeric(),
      user_id: num
    }
    fakeInventory.push(inventory);
  }
  return fakeInventory;
}


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert(
    createFakeInventory()
  );
};
