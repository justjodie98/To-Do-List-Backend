const { Sequelize, DataTypes, Model } = require("@sequelize/core");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./toDoLists.sqlite",
});

// TDL object (id,title,desc)
class Task extends Model {}

Task.init(
  {
    list_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Must have a description" },
      },
    },
  },

  {
    sequelize,
    modelName: "Task",
    tableName: "Tasks",
  }
);

async function main() {
  // create
  try {
    // await Task.sync(); // creates table if there isn't one
    // await Task.create({
    //   list_id: "1",
    //   description: "Do the laundry",
    // });
    // await Task.update(
    //   {
    //     title: "Chores",
    //   },
    //   {
    //     where: { id: "8" },
    //   }
    // );
    // await Task.destroy({
    //   where: {
    //     id: 12,
    //   },
    // });

    const lists = await Task.findAll();
    console.log(JSON.stringify(lists, null, 2)); // to format on multiple lines , 2 spaces
  } catch (error) {
    console.log(error);
  }
}

main();

module.exports = { sequelize, Task };
