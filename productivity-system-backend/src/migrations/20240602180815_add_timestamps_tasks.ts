import type { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    await knex.schema.alterTable('task', function (table) {
        table.timestamps(false, true);
    });
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.alterTable('task', function (table) {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
    });
};
