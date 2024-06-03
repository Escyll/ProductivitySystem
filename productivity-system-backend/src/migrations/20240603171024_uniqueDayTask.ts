import type { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    await knex.schema.alterTable('dayTask', (table) => {
        table.unique(['day', 'task']);
        table.unique(['day', 'order']);
        table.unique(['task', 'order']);
        table.dropUnique(['day', 'task', 'order']);
    });  
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.alterTable('dayTask', (table) => {
        table.dropUnique(['day', 'task']);
        table.dropUnique(['day', 'order']);
        table.dropUnique(['task', 'order']);
        table.unique(['day', 'task', 'order']);
    });
};
