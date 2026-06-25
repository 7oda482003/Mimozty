const express = require("express");

const app = express();

app.use(express.json());

app.post("/send-telegram", async (req, res) => {

    try {

        console.log("Message:", req.body.message);

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});