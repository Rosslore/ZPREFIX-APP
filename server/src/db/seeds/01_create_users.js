/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'John', last_name: 'Doe', username: 'johndoe', password: 'johndoe', email: 'johndoe@gmail.com', role: 'admin' },
    { first_name: 'Jane', last_name: 'Doe', username: 'janedoe', password: 'janedoe', email: 'janedoe@gmail.com', role: 'user' }
  ]);
};
