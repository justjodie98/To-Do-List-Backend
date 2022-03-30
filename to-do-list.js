const { Sequelize, DataTypes, Model } = require("@sequelize/core");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./toDoLists.sqlite",
});

// TDL object (id,title,desc)
class ToDoList extends Model {}

ToDoList.init(
  {
    list_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Must have a title" },
      },
    },
  },

  {
    sequelize,
    modelName: "toDoList",
    tableName: "toDoLists",
  }
);

async function main() {
  // create
  try {
    // await ToDoList.sync({ alter: true }); // creates table if there isn't one
    // await ToDoList.create({
    //   list_id: 1,
    //   title: "Daily chores",
    // });
    // await ToDoList.update(
    //   {
    //     title: "Chores",
    //   },
    //   {
    //     where: { id: "8" },
    //   }
    // );
    // await ToDoList.destroy({
    //   where: {
    //     id: 12,
    //   },
    // });

    const lists = await ToDoList.findAll();
    console.log(JSON.stringify(lists, null, 2)); // to format on multiple lines , 2 spaces
  } catch (error) {
    console.log(error);
  }
}

main();

module.exports = { sequelize, ToDoList };
