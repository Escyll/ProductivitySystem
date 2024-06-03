import type { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    let tableExists = await knex.schema.hasTable('task');
    if (!tableExists) {
	    await knex.schema.createTable('task', (table) => {
            table.increments('id').primary().unsigned();
            table.specificType('description', 'text').notNullable();
            table.specificType('status', 'text').notNullable().defaultTo('Todo');
        });  
    }
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTableIfExists('task');
};
