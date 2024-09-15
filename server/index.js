//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Correct MongoDB connection string with anime4u database
mongoose.connect("mongodb+srv://sanskarmundaniya:AjE8CQ8cyHhN2iKd@cluster0.bx6l2.mongodb.net/anime4u?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });

// Chat schema and model
const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
const Chat = mongoose.model('Chat', chatSchema);

// User schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model('User', userSchema);

// Name schema and model (seems unrelated to Anime)
const nameSchema = {
  title: String,
  content: String
};
const Name = mongoose.model("Name", nameSchema);

// Anime schema and model for Anime collection
const animeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  pictures: {
    type: [String],
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  },
  userReviews: {
    type: [String],
    required: true
  },
  cast: {
    type: [String],
    required: true
  },
  episodes: {
    type: Number,
    required: true
  }
});
const Anime = mongoose.model('Anime', animeSchema);

// Example Name entry (Demon Slayer)
const name = new Name({
  title: "Demon Slayer",
  content: "Demon Slayer, also known as Kimetsu no Yaiba in Japanese, is an action-packed anime series that has captivated audiences worldwide. Based on the manga by Koyoharu Gotouge, the show takes us on a thrilling journey set in a historical fantasy world. The story revolves around a young boy named Tanjiro Kamado, whose life takes a tragic turn when his family is brutally attacked by demons. Tanjiro becomes one of the few surviving members, but his younger sister, Nezuko, is transformed into a demon herself. Determined to save his sister and avenge his family, Tanjiro joins the Demon Slayer Corps, an organization dedicated to eradicating demons and protecting humanity."
});

// Uncomment to save the sample Name entry
// name.save()
//   .then(() => {
//     res.redirect("/");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.get("/", function (req, res) {
  Name.find()
    .then((names) => {
      res.render("home", {
        names: names
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/home", async (req, res) => {
  res.send("This is the data for the home page");
});

app.get("/names", async (req, res) => {
  Name.find()
    .then((names) => {
      console.log(names);
      res.send(names);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/animes", async (req, res) => {
  Anime.find()
    .then((animes) => {
      console.log(animes);
      res.send(animes);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/post_name", cors(), async (req, res) => {
  let { name } = req.body;
  console.log(req.body);
});

app.get("/chat", cors(), async (req, res) => {
  Chat.find()
    .then((chats) => {
      console.log(chats);
      res.send(chats);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/send', cors(), async (req, res) => {
  try {
    const { name1, message1 } = req.body;
    const chat = new Chat({
      name: name1,
      message: message1
    });
    await chat.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/review', cors(), async (req, res) => {
  try {
    const { review, naam } = req.body;
    const anime = await Anime.findOne({ name: naam });

    if (anime) {
      // Update the userReviews field by pushing the new review
      anime.userReviews.push(review);

      // Save the updated anime document
      await anime.save();

      console.log('Review added successfully!');
      res.status(200).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ message: 'Anime not found' });
      console.log('Anime not found!');
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register route
app.post('/register', cors(), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', cors(), (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const username = user.name;
            res.send({ success: true, username });
          } else {
            return res.status(400).json({ error: 'Invalid password' });
          }
        });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    });
});

// Start the server on port 8000
app.listen(8000, function () {
  console.log("Server started on port 8000");
});
