"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const gallery_entity_1 = require("./galleries/entities/gallery.entity");
const user_entity_1 = require("./users/entities/user.entity");
const exhibition_entity_1 = require("./exhibitions/entities/exhibition.entity");
const artist_entity_1 = require("./artists/entities/artist.entity");
const artwork_entity_1 = require("./artworks/entities/artwork.entity");
const promotion_entity_1 = require("./promotions/entities/promotion.entity");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: true,
    entities: [user_entity_1.User, gallery_entity_1.Gallery, artist_entity_1.Artist, exhibition_entity_1.Exhibition, artwork_entity_1.Artwork, promotion_entity_1.Promotion],
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map