const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const {ObjectId} = require('mongodb');

const url = process.env.DB_URL
const db_name = process.env.DB_NAME
const col_name = process.env.COL_NAME
const options = {
    useUnifiedTopology: true
}

const readTodos = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url,options, (err,client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({}).toArray((err,docs) => {
                assert.equal(err, null);
                resolve(docs);
                client.close();
            });
        });
    });
    return iou
}

const createTodos = (TodoObj) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url,options, (err,client) => {
            assert.equal(err,null)

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(TodoObj, (err, doc) => {
                assert.equal(err, null)
                resolve(doc.ops[0]);
                client.close();
            })
        })
    })
    return iou
}

//Added this function to return the product I am updating in the findOneAndUpdate fuction below
const readTodoById= (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({_id: new ObjectId(id)}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs[0]);
                client.close();
            });
        });
    });
    return iou
};
// Ask Wes about the new option if he was able to get it to return the modified document
const upsertTodos = (id, TodoObj) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndUpdate({_id: new ObjectId(id)},
            {$set: {...TodoObj}},
            (err, result) => {
                assert.equal(err, null);
                readTodoById(result.value._id)
                .then(product => resolve(product))
                .then(() => client.close())
            });
        });
    });
    return iou
};

// Delete a Product, using the 'delete' Mongo Function
const deleteTodos= (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options,(err, client) =>{
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete({_id: new ObjectId(id)}, (err, result) => {
                assert.equal(err, null)
                resolve(result.value);
                client.close();
            });
        });
    });  
    return iou     
};



module.exports = {
    readTodos,
    createTodos,
    upsertTodos,
    deleteTodos
}