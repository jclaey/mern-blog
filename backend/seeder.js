const dotenv = require('dotenv');
const posts = require('./data/posts');
const users = require('./data/users');
const Post = require('./models/Post');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    const dummyUsers = await User.insertMany(users);
    const dummyPosts = posts.map(post => {
      return { ...post, author: dummyUsers[Math.floor(Math.random() * 3)]._id }
    });

    await Post.insertMany(dummyPosts);
    console.log('Data imported');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    console.log('Data destroyed');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if(process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}