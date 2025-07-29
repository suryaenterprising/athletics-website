const express = require("express");
const router = express.Router();
const {
getAllCompetitions,
getCompetitionById,
createCompetition,
updateCompetition,
deleteCompetition
} = require("../controllers/competitionController");

router.get("/", getAllCompetitions);
router.get("/:id", getCompetitionById);
router.post("/", createCompetition);
router.put("/:id", updateCompetition);
router.delete("/:id", deleteCompetition);

module.exports = router;