const mongoose = require('mongoose');
const Skatepark = require('../models/skatepark');
require('dotenv').config();

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const skateparks = [
            { name: "Skate Heaven", city: "Warszawa", description: "Largest skatepark in Warsaw." },
            { name: "Gdańsk Ramp", city: "Gdańsk", description: "Skatepark with multiple ramps and a bowl." },
            { name: "Krakow Rails", city: "Kraków", description: "Street style park with rails and ledges." },
            { name: "Wrocław Halfpipe", city: "Wrocław", description: "Ideal for vert skaters, featuring a classic halfpipe." },
            { name: "Bydgoszcz Park", city: "Bydgoszcz", description: "A community-focused park with areas for beginners and pros." }
        ];

        await Skatepark.deleteMany({});
        
        for (const skatepark of skateparks) {
            await new Skatepark(skatepark).save();
            console.log(`Added skatepark: ${skatepark.name}`);
        }
        
        console.log("Database seeded!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
