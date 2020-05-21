import {
    connect,
    connection,
    disconnect
} from "mongoose"
connect("mongodb://localhost:27017/manage", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
connection.on("open", () => {
    console.log("数据库已连接")
})
connection.on("error", err => {
    console.log(err)
    disconnect();
})
connection.on('close', () => {
    connect("mongodb://localhost:27017/manage", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})