require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3456;
const saltRounds = 10;
// SSL
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_password = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox
console.log(store_id, store_password);
// Ensure directories exist
const ensureDirectories = () => {
  const directories = [
    path.join(__dirname, "./public/uploads/profile"),
    path.join(__dirname, "./public/uploads/store"),
    path.join(__dirname, "./public/uploads/space"),
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Call ensureDirectories before the server starts
ensureDirectories();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (req.uploadType === "profile") {
      uploadPath = path.join(__dirname, "./public/uploads/profile");
    } else if (req.uploadType === "store") {
      uploadPath = path.join(__dirname, "./public/uploads/store");
    } else if (req.uploadType === "space") {
      uploadPath = path.join(__dirname, "./public/uploads/space");
    } else {
      return cb(new Error("Invalid upload type"), false);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const userEmail = req.body.email;
    const sanitizedEmail = userEmail
      ? userEmail.replace(/[^a-zA-Z0-9]/g, "")
      : "unknown";
    const extension = path.extname(file.originalname);
    const filename = `${req.uploadType}_${sanitizedEmail}_${timestamp}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const setUploadType = (type) => (req, res, next) => {
  req.uploadType = type;
  next();
};

const uploadProfile = [setUploadType("profile"), upload.single("avatar")];
const uploadStore = [setUploadType("store"), upload.single("avatar")];
const uploadSpace = [setUploadType("space"), upload.single("avatar")];

// Images Routes
app.get("/api/v1/profile/:bucketId", (req, res) => {
  console.log("Img");
  const bucketId = req.params.bucketId;
  const imagePath = path.join(
    __dirname,
    "public",
    "uploads",
    "profile",
    bucketId
  );

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
    } else {
      const readStream = fs.createReadStream(imagePath);
      readStream.pipe(res);
    }
  });
});

// Database connection
const url = "mongodb://localhost:27017";
const dbName = "thermostore";

async function main() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const userCollection = db.collection("users");
    const storeCollection = db.collection("stores");
    const spaceCollection = db.collection("spaces");
    const paymentCollection = db.collection("payments");
    const reserveCollection = db.collection("reserve");

    // Auth
    app.post("/api/v1/signup", uploadProfile, async (req, res) => {
      const email = req.body?.email;
      const phone = req.body?.contact;
      const name = req.body?.fullName;
      const password = req.body?.password;
      const avatar = req.file ? req.file.filename : null;
      const role = "customer";

      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = {
          name,
          email,
          phone,
          avatar,
          role,
          password: hash,
        };

        const result = await userCollection.insertOne(newUser);
        res.status(200).send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while registering the user.");
      }
    });

    app.post("/api/v1/signin", async (req, res) => {
      const email = req.body?.email;
      const password = req.body?.password;

      try {
        const user = await userCollection.findOne({ email });
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            const id = user._id;
            const token = jwt.sign({ id }, "jwtSecret", {
              expiresIn: 300,
            });
            req.session.user = user;
            res.status(200).send({ auth: true, token, user });
          } else {
            res.json({ auth: false, message: "Wrong username or password" });
          }
        } else {
          res.json({ auth: false, message: "No user exists" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while signing in.");
      }
    });

    app.get("/api/v1/profile", (req, res) => {
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
      } else {
        res.send({ loggedIn: false });
      }
    });

    app.get("/api/v1/logout", (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          res.send({ success: false, message: "Logout Failed" });
        } else {
          res.clearCookie("userId");
          res.json({ success: true, message: "Logout successful" });
        }
      });
    });

    // Store Owner related Api
    // api for getting store of a owner
    app.get("/api/v1/mystores", async (req, res) => {
      try {
        const user = req.session.user;

        if (!user) {
          throw new Error("User not logged in");
        }

        const mystores = await storeCollection
          .find({ owner: user.email })
          .toArray();

        res.send(mystores);
      } catch (error) {
        res.status(401).send({ error: error.message });
      }
    });
    // api for getting spaces of a owner
    app.get("/api/v1/myspaces", async (req, res) => {
      try {
        const user = req.session.user;

        if (!user) {
          throw new Error("User not logged in");
        }

        const myspaces = await spaceCollection
          .find({ owner: user.email })
          .toArray();

        res.send(myspaces);
      } catch (error) {
        res.status(401).send({ error: error.message });
      }
    });

    app.post("/api/v1/addstore", uploadStore, async (req, res) => {
      const storeName = req.body?.storeName;
      const address = req.body?.address;
      const capacity = parseFloat(req.body?.capacity);
      const length = parseFloat(req.body?.length);
      const width = parseFloat(req.body?.width);
      const owner = req.session.user?.email;
      const avatar = req.file ? req.file.filename : null;

      try {
        const newStore = {
          storeName,
          address,
          capacity,
          length,
          width,
          owner,
          avatar,
        };

        const result = await storeCollection.insertOne(newStore);
        res.status(200).send({ success: true, result });
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while adding the store.");
      }
    });
    app.get("/api/v1/stores/:ownerEmail", async (req, res) => {
      const ownerEmail = req.params.ownerEmail;

      try {
        const stores = await storeCollection
          .find({ owner: ownerEmail })
          .toArray();

        if (stores.length > 0) {
          res.status(200).json(stores);
        } else {
          res
            .status(404)
            .json({ message: "No stores found for this owner email." });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    // Add Space Route
    app.post("/api/v1/addspace", uploadSpace, async (req, res) => {
      const storeId = req.body?.storeId;
      const storeName = req.body?.storeName;
      const length = parseFloat(req.body?.length);
      const width = parseFloat(req.body?.width);
      const pricePerDay = parseFloat(req.body?.pricePerDay);
      const capacity = parseFloat(req.body?.capacity);
      const productType = req.body?.productType;
      const avatar = req.file ? req.file.filename : null;
      const owner = req.session.user?.email;

      try {
        const newSpace = {
          storeId,
          storeName,
          length,
          width,
          pricePerDay,
          capacity,
          productType,
          avatar,
          owner,
        };

        const result = await spaceCollection.insertOne(newSpace);
        res.status(200).send({ success: true, result });
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while adding the space.");
      }
    });

    app.get("/api/v1/stores", async (req, res) => {
      try {
        const stores = await storeCollection.find().toArray();
        res.status(200).json(stores);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.get("/api/v1/spaces/:storeId", async (req, res) => {
      try {
        const spaces = await spaceCollection
          .find({ storeId: req.params.storeId })
          .toArray();
        const store = await storeCollection.findOne({
          _id: new ObjectId(req.params.storeId),
        });
        console.log(spaces);
        res.status(200).json({ store, spaces });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.get("/api/v1/spaces", async (req, res) => {
      try {
        const spaces = await spaceCollection.find().toArray();
        res.status(200).json(spaces);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.get("/api/v1/space/:spaceId", async (req, res) => {
      const spaceId = req.params.spaceId;
      try {
        const space = await spaceCollection.findOne({
          _id: new ObjectId(spaceId),
        });

        if (space) {
          res.status(200).json(space);
        } else {
          res.status(404).json({ message: "Space not found" });
        }
      } catch (err) {
        // If an error occurs, return a server error response
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });

    app.post("/api/v1/calculate-price", async (req, res) => {
      const { spaceId, fromDate, toDate } = req.body;

      try {
        // Fetch space info
        const spaceInfo = await spaceCollection.findOne({
          _id: new ObjectId(spaceId),
        });

        // Calculate duration in days
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const durationInDays = Math.floor(
          (end - start) / (1000 * 60 * 60 * 24)
        );

        const totalPrice = spaceInfo.pricePerDay * durationInDays;

        let discount = 0;
        if (durationInDays >= 0 && durationInDays < 90) {
          discount = 3;
        } else if (durationInDays >= 90 && durationInDays < 180) {
          discount = 5;
        } else if (durationInDays >= 180 && durationInDays < 365) {
          discount = 7;
        } else if (durationInDays >= 365) {
          discount = 10;
        }
        if (spaceInfo.productType.toLowerCase().includes("fruits")) {
          discount += 1;
        } else if (spaceInfo.productType.toLowerCase().includes("potato")) {
          discount += 2;
        } else if (spaceInfo.productType.toLowerCase().includes("meat")) {
          discount += 0.5;
        } else if (spaceInfo.productType.toLowerCase().includes("vegetables")) {
          discount += 1.5;
        }

        const area = spaceInfo.length * spaceInfo.width;
        if (area >= 100 && area < 200) {
          discount += 3;
        } else if (area >= 200 && area < 300) {
          discount += 5;
        } else if (area >= 300) {
          discount += 10;
        }

        // Calculate discounted price
        const discountedPrice = totalPrice - (totalPrice * discount) / 100;
        res.json({
          success: true,
          totalPrice: totalPrice.toFixed(2),
          price: discountedPrice.toFixed(2),
          discount: discount,
        });
      } catch (error) {
        console.error("Error calculating price:", error.message);
        res
          .status(500)
          .json({ success: false, message: "Failed to calculate price" });
      }
    });
    const tran_id = new ObjectId().toString();
    app.post("/api/v1/payment", async (req, res) => {
      const info = req.body;

      const data = {
        total_amount: info.totalPrice,
        currency: info.currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3456/payment/success/${tran_id}`,
        fail_url: `http://localhost:3456/payment/failed/${tran_id}`,
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Own",
        product_name: "Cold Storage Space",
        product_category: "Random",
        product_profile: "general",
        cus_name: info?.user?.name || "Unknown",
        cus_email: info?.user?.email || "Unknown",
        cus_add1: "Unknown",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: 7408,
        cus_country: "Bangladesh",
        cus_phone: info?.user?.contact || "Unknown",
        cus_fax: "01711111111",
        ship_name: "Unknown",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        // res.redirect(GatewayPageURL)
        res.send({ url: GatewayPageURL });

        // Transaction Info for user
        const paymentInfo = {
          paymentStatus: false,
          amount: info.totalPrice,
          transactionId: tran_id,
          space: info.space,
          customerId: info?.user?._id,
          customerEmail: info?.user?.email,
          customerName: info?.user?.name,
        };
        const result = paymentCollection.insertOne(paymentInfo);

        console.log("Redirecting to: ", GatewayPageURL);
      });
      app.post("/payment/success/:tranId", async (req, res) => {
        // console.log(req.params.tranId);
        const result = await paymentCollection.updateOne(
          { transactionId: req.params.tranId },
          {
            $set: {
              paymentStatus: true,
            },
          }
        );
        if (result.modifiedCount > 0) {
          const newreserve = {
            space: info.space,
            paymentInfo: paymentInfo,
          };
          await reserveCollection.insertOne(newreserve);
          res.redirect(
            `http://localhost:5173/payment/success/${req.params.tranId}`
          );
        }
      });
      app.post("/payment/failed/:tranId", async (req, res) => {
        // console.log(req.params.tranId);
        const result = await paymentCollection.deleteOne({
          transactionId: req.params.tranId,
        });
        if (result.deletedCount > 0) {
          res.redirect(
            `http://localhost:5173/payment/failed/${req.params.tranId}`
          );
        }
      });
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the connection
    // await client.close();
  }
}

main().catch(console.error);
