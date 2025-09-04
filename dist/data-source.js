"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const galeria_entity_1 = require("./galerias/entities/galeria.entity");
const usuario_entity_1 = require("./usuarios/entities/usuario.entity");
const exposicion_entity_1 = require("./exposiciones/entities/exposicion.entity");
const artist_entity_1 = require("./artists/entities/artist.entity");
const obra_entity_1 = require("./obras/entities/obra.entity");
const promotion_entity_1 = require("./promotions/entities/promotion.entity");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: true,
    entities: [usuario_entity_1.Usuario, galeria_entity_1.Galeria, artist_entity_1.Artist, exposicion_entity_1.Exposicion, obra_entity_1.Obra, promotion_entity_1.Promotion],
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map