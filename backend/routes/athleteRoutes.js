// backend/routes/athleteRoutes.js
const express = require("express");
const router = express.Router();
const {
getAllAthletes,
getAthleteById,
createAthlete,
updateAthlete,
deleteAthlete
} = require("../controllers/athleteController");

router.get("/", getAllAthletes);
router.get("/:id", getAthleteById);
router.post("/", createAthlete);
router.put("/:id", updateAthlete);
router.delete("/:id", deleteAthlete);

module.exports = router;