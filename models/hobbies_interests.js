// // Import Sequelize library and create a connection to the database
// // const { sequelize, Sequelize } = require('sequelize');


// // Define the HobbiesInterests model
// module.exports = (sequelize, Sequelize) => {
//   const HobbiesInterests = sequelize.define('hobbies_interests', {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
//   });
//   return HobbiesInterests;
// };

// // Export the HobbiesInterests model for use in other parts of the application
// // module.exports = HobbiesInterests;


/////////////////////////////////////////////////////////////////////////////////////

module.exports = (sequelize, Sequelize) => {
  const Hobby = sequelize.define("hobby", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  // Define the many-to-many association with User
  Hobby.belongsToMany(User, { through: "user_hobbies" });

  // Define the one-to-many association with Interest
  Hobby.hasMany(Interest);

  return Hobby;
};
