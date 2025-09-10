export const dbConfig = {
    type: 'postgres' as const,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'sociau',
    entities: ['dist/**/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: false,
};