import type { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    await knex.schema.alterTable('dayTask', function (table) {
        table.primary(['day', 'task', 'order']);
    });
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.alterTable('dayTask', function (table) {
        table.dropPrimary();
    });
};
