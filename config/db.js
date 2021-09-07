const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    //todo: delete log
    console.log('mongo connection string:', process.env.mongoTestURI);
    if (process.env.mongoTestURI) {
      /** we have to use "" around variable because of odd character but we need to trim them in windows
       * do we need this for heroku?
       */
      // todo check if running local and use default.json or cut connection strings else just use secret
      console.log('mongoTestURI existsssssssssssssssss');
      const testdb = process.env.mongoTestURI;
      const noQuotes = testdb.substr(1, testdb.length - 2);
      console.log('mongo testdb string:', testdb.substr(1, testdb.length - 2));

      await mongoose.connect(testdb, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });

      console.log('MongoDB Connected..');
      // set mongoTestURI=mongodb+srv://ericgeppert2:Henry4likes2run@devconnector-94qza.mongodb.net/test?retryWrites=true&w=majority
    } else {
      console.log('mongoTestURI DNEEEEEEEEEEEEEEE');
    }
    // await mongoose.connect(db, {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    // });

    // console.log('MongoDB Connected..');
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
