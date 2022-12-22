import { Order } from "src/entity/Order";
import { RoleAction } from "src/entity/RoleAction";
import { User } from "src/entity/User";
import { DataSource } from "typeorm";

// Using environment variables

const connectDB =  new DataSource({
    type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "aloteb-test",
      logging: true,
      synchronize: false,
      entities: [
          User, RoleAction, Order
      ],
      subscribers: [
          "subscriber/*.js"
      ],
      migrations: [
          "migration/*.js"
      ],
})

connectDB
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default connectDB;