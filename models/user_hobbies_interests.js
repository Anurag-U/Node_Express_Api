// // Import Sequelize library and create a connection to the database
// const { sequelize, Sequelize } = require('sequelize');


// // Import the HobbiesInterests model
// const HobbiesInterests = require('./hobbies_interests');

// // Define the UserHobbiesInterests model
// module.exports = (sequelize, Sequelize) => {
//   const UserHobbiesInterests = sequelize.define('user_hobbies_interests', {
//     user_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'users',
//         key: 'id'
//       },
//       allowNull: false
//     },
//     hobby_interest_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'hobbies_interests',
//         key: 'id'
//       },
//       allowNull: false
//     }
//   });
//   return UserHobbiesInterests;
// };

//   // Define the relationships between the UserHobbiesInterests and HobbiesInterests models
//   // HobbiesInterests.hasMany(UserHobbiesInterests, { foreignKey: 'hobby_interest_id' });
//   // UserHobbiesInterests.belongsTo(HobbiesInterests, { foreignKey: 'hobby_interest_id' });

//   // Export the UserHobbiesInterests model for use in other parts of the application
//   // module.exports = UserHobbiesInterests;







module.exports = (sequelize, Sequelize) => {
  const Interest = sequelize.define("interest", {
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
  Interest.belongsToMany(User, { through: "user_interests" });

  // Define the one-to-many association with Hobby
  Interest.belongsTo(Hobby);

  return Interest;
};



