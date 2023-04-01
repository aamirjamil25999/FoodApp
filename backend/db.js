const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://gofood:mern123@cluster0.a4ptsfv.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURL, { useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log('some erroe', err);
        } else {
            console.log('connected')
            const fetched_data = await mongoose.connection.db.collection("some_data");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCatogery = await mongoose.connection.db.collection("foodCatogery");
                foodCatogery.find({}).toArray(function (err, catData) {
                    if (err) {
                        console.log(err)
                    } else {
                        global.some_data = data;
                        global.foodCatogery = catData;
                        // console.log(global.some_data)
                    }
                })
                // if(err){
                //     console.log(err)
                // }else{
                //     global.some_data = data;
                // }
            })

        }

    });
}

module.exports = mongoDB;
