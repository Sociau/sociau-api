import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { dbConfig } from './database/db.config';

export default new DataSource({
    ...dbConfig,
    namingStrategy: new SnakeNamingStrategy(),
});
