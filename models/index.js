const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

// db.UserHobbiesInterests = require("../models/user_hobbies_interests.js")(sequelize, Sequelize);
// db.HobbiesInterests = require("../models/hobbies_interests.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// const HobbiesInterests = require('./hobbiesInterests');
// const UserHobbiesInterests = require('./userHobbiesInterests.js');
// HobbiesInterests.hasMany(UserHobbiesInterests, { foreignKey: 'hobby_interest_id' });
// UserHobbiesInterests.belongsTo(HobbiesInterests, { foreignKey: 'hobby_interest_id' });


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
