const express = require('express');
const authRoutes = require('./routes/authRoute');
const shelterRoutes = require('./routes/shelterRoutes')
const adoptionRoutes = require("./routes/adoptionRoutes");
const adminRoutes = require("./routes/adminRoutes")
const Shelter = require('./models/Shelter.model');
const PetRoutes = require('./routes/petRoutes');
const requestsRoutes = require("./routes/requestsRoutes");
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin : "*"
}));

// Mount authentication routes
app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use("/api/requests", requestsRoutes);
app.use("/api/adopt", adoptionRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/pets", PetRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/getallshelters',async (req,res)=>{
const allshelters= await Shelter.find()
res.status(200).json({allshelters})


})
// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
