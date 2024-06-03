import type { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    let tableExists = await knex.schema.hasTable('day');
    if (!tableExists) {
	    await knex.schema.createTable('day', (table) => {
            table.increments('id').primary().unsigned();
            table.timestamps(false, true);
            table.date('date').notNullable().defaultTo(knex.fn.now());
        });  
    }
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTableIfExists('day');
};
