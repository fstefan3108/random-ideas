
const Idea = require("../models/Idea");

const ideas = [
    {
        id: 1,
        text: "I like to move it",
        tag: "technology",
        username: "tonyStark",
        date: "2022-01-02",
    },
    {
        id: 2,
        text: "I like big butts and i cannot lie",
        tag: "productivity",
        username: "bruceBanner",
        date: "2021-03-05",
    },
    {
        id: 3,
        text: "I like eggs",
        tag: "innovation",
        username: "steveRogers",
        date: "2022-05-09",
    }
];



const express = require("express");

const router = express.Router();


router.get("/", async (request, response) => {

    try {
        const ideas = await Idea.find();
        response.json({ success: true, data: ideas });
    } catch (error) {
        response.status(500).json({ success: false, error: "somethibng went wrong lol" });
    }

})




router.get("/:id", async (request, response) => {

    try {

        const idea = await Idea.findById(request.params.id);
        response.json({ success: true, data: idea });

    } catch (error) {

        response.status(500).json({ success: false, error: "not found" });

    }

});


// Add Idea //

router.post("/", async (request, response) => {

    const idea = new Idea({
        text: request.body.text,
        tag: request.body.tag,
        username: request.body.username,
    });

    try {
        const savedIdea = await idea.save();
        response.json({ success: true, data: savedIdea });
    } catch (error) {
        response.status(500).json({ success: false, error: "something went wrong" });
    }

});

// Update Idea //

router.put("/:id", async (request, response) => {

    try {

        const idea = await Idea.findById(request.params.id);

        if (idea.username === request.body.username) {

            const updatedIdea = await Idea.findByIdAndUpdate(request.params.id, {
                $set: {

                    text: request.body.text,
                    tag: request.body.tag,

                }
            },
                {
                    new: true
                });

            return response.json({ success: true, data: updatedIdea });

        }

        response.status(403).json({ success: false, error: "you are not authorized" });


    } catch (error) {
        response.status(500).json({ success: false, error: "something went wrong" });
    }


});


router.delete("/:id", async (request, response) => {

    try {

        const idea = await Idea.findById(request.params.id);

        if (idea.username === request.body.username) {

            await Idea.findByIdAndDelete(request.params.id);
            return response.json({ success: true, data: {} });

        }

        response.status(403).json({ success: false, error: "you are not authorized" });

    } catch (error) {
        response.status(500).json({ success: false, error: "something wnet wrongs" });
    }

});


module.exports = router;