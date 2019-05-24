var userData = require('../data/friends.js')

module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(userData)
  })

  app.post("/api/friends", function(req, res) {
      
    userData.push(req.body)

    var currentAnswers = req.body.scores
    var storedAnswers
    var totalDifference = []
    
    
    for (var i = 0; i < (userData.length - 1); i++) {
      var value = 0
      storedAnswers = userData[i].scores

      for (var j = 0; j < storedAnswers.length; j++) {
        value += Math.abs((parseInt(storedAnswers[j]) - parseInt(currentAnswers[j])))
        
        if (j === (storedAnswers.length - 1)){
          totalDifference.push(value)
          console.log(totalDifference)
        }
      }
    }
    var lowestScore = (Math.min(... totalDifference))
    var index = []
    for (var k = 0; k < totalDifference.length; k++) {
      //var lowestScore = (Math.min(... totalDifference))
      if (totalDifference[k] === lowestScore) {
        index.push(userData[k])
      }

    }
    
    //var index = totalDifference.indexOf(lowestScore)
    res.json(index)
  })
}