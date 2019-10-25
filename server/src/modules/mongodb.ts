import * as mongoose from "mongoose";
import * as config from "./config";
const mongoConf = config.get("mongo");

// mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
const DB_URL = "mongodb://" + mongoConf.host + ":" + mongoConf.port;

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose 连接断开");
});

class Mongo {
  constructor() {
    /**
     * 连接
     */
    mongoose.connect(DB_URL, err => {
      if (err) {
        this.isConnected = false;
        console.log("Mongoose 连接错误: " + err);
      } else {
        this.isConnected = true;
        console.log("Mongoose 连接成功 " + DB_URL);
      }
    });
  }
  // 条件查询或者查询所有
  find(collection: string, schema: any, condition?: Record<string, any>) {
    const Model = mongoose.model(collection, schema);
    if (condition) {
      return Model.find(condition);
    } else {
      return Model.find();
    }
  }
  // 插入一个
  insert(collection: string, schema: any, value: Record<string, any>) {
    const Model = mongoose.model(collection, schema);
    //使用链式写法
    return new Model(value).save();
  }
  // 更新一个
  update(
    collection: string,
    schema: any,
    condition: Record<string, any>,
    value: Record<string, any>
  ) {
    const Model = mongoose.model(collection, schema);
    return Model.updateOne(condition, value);
  }
  // 删除所有
  del(collection: string, schema: any, condition: Record<string, any>) {
    const Model = mongoose.model(collection, schema);
    return Model.remove(condition);
  }

  private isConnected = false;
}

export default new Mongo();