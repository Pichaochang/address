const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const ObjectID = MongoDB.ObjectID

const Config = require('./config.js')

class Db {
  static getInstance () {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor () {
    this.dbClient = ''
    this.connect()
  }

  connect () {
    const _that = this
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) {
        MongoClient.connect(Config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
          if (err) {
            reject(err)
          } else {
            _that.dbClient = client.db(Config.dbName)
            resolve(_that.dbClient)
          }
        })
      } else {
        resolve(_that.dbClient)
      }
    })
  }

  find (collectionName, json1, json2, json3) {
    var attr, slipNum, pageSize
    if (arguments.length === 2) {
      attr = {}
      slipNum = 0
      pageSize = 0
    } else if (arguments.length === 3) {
      attr = json2
      slipNum = 0
      pageSize = 0
    } else if (arguments.length === 4) {
      attr = json2
      var page = json3.page || 1 // 第几页
      pageSize = json3.pageSize || 20 // 一页展示多少个数据
      slipNum = (page - 1) * pageSize // 第几个数据后，比如我要跳第8页那就是70个数据后
    } else {
      // console.log('出错了')
    }
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        // const result = db.collection(collectionName).find(json1, { fields: attr }).skip(slipNum).limit(pageSize)
        const result = db.collection(collectionName).find(json1, attr).skip(slipNum).limit(pageSize)

        result.toArray(function (err, docs) {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }

  update (collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        // db.user.update({},{$set:{}})
        db.collection(collectionName).updateOne(
          json1,
          {
            $set: json2
          },
          (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          }
        )
      })
    })
  }

  insert (collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  remove (collectionName, json) {
    console.log(collectionName, json)
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  getObjectId (id) {
    return (new ObjectID(id))
  }

  count (collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const result = db.collection(collectionName).count(json)
        result.then(count => {
          resolve(count)
        })
      })
    })
  }

  findData (collectionName, json, current, pageSize) {
    var slipNum = (current - 1) * pageSize // 第几个数据后，比如我要跳第8页那就是70个数据后
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        // const result = db.collection(collectionName).find(json).skip(slipNum).limit(pageSize)
        const result = db.collection(collectionName).find(json).skip(slipNum).limit(pageSize)

        result.toArray(function (err, docs) {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }
}

module.exports = Db.getInstance()
