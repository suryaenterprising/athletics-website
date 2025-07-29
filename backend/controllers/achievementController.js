exports.getAllAchievements = (req, res) => {
  res.send('Get all achievements');
};

exports.getAchievementByEvent = (req, res) => {
  res.send(`Get achievements for event: ${req.params.event}`);
};

exports.createAchievement = (req, res) => {
  res.send('Create a new achievement');
};

exports.updateAchievement = (req, res) => {
  res.send(`Update achievement with ID: ${req.params.id}`);
};

exports.deleteAchievement = (req, res) => {
  res.send(`Delete achievement with ID: ${req.params.id}`);
};
