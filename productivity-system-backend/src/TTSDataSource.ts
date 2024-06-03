import { Knex } from 'knex'

export class TTSDataSource {
    private knex : Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    async getTasks() {
        return await this.knex
            .select('*')
            .from('task');
    }

    async getDayCardTasks(dayCard: number) {
        return await this.knex
            .select('*')
            .from('dayTask')
            .innerJoin('task', 'dayTask.task', 'task.id')
            .where('day', dayCard)
            .orderBy('order');
    }

    async getDays() {
        return await this.knex
            .select('*')
            .from('day');
    }

    async getTaskDayCard(task: number) {
        let result = await this.knex
            .select('*')
            .from('dayTask')
            .innerJoin('day', 'dayTask.day', 'day.id')
            .where('task', task);
        if (result.length == 0)
            return null;
        if (result.length == 1)
            return result[0];
        throw "Multiple dayCards for task found";
    }
}
