import type { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    let tableExists = await knex.schema.hasTable('dayTask');
    if (!tableExists) {
	    await knex.schema.createTable('dayTask', (table) => {
            table.specificType('day', 'int').notNullable();
            table.specificType('task', 'int').notNullable();
            table.specificType('order', 'int').notNullable();
            table.foreign('day').references('id').inTable('day');
            table.foreign('task').references('id').inTable('task');
            table.unique(['day', 'task', 'order'], {
                useConstraint: true,
            });
        });  
    }
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTableIfExists('dayTask');
};
