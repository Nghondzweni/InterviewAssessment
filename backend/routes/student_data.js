const axios = require("axios");

module.exports.getStudentData = async function () {
    return(axios.all([
        axios.get("https://registree-coding-challenge.glitch.me/UJ/marks"),
        axios.get("https://registree-coding-challenge.glitch.me/UJ/names"),
        axios.get("https://registree-coding-challenge.glitch.me/SU/marks"),
        axios.get("https://registree-coding-challenge.glitch.me/SU/names")
      ]).then( await axios.spread((ujMarks, ujNames, suMarks, suNames) => {
        if(typeof ujMarks.data === 'string' || typeof ujNames.data === 'string' ||              // Assuming there is always and equal number of students and marks
            typeof suMarks.data === 'string' || typeof suNames.data === 'string'){              // and are in ascending order as returned by the endpoints.
                return({
                    success : false,
                    code : 503,
                    message : "There was a problem retrieving student data. Please try again"
                })
            } else {
                return({
                    success : true,
                    status : 200,
                    data : mergeObjects(ujMarks.data,ujNames.data, suMarks.data, suNames.data),
                    message : "Successfully retrieved student data"
                })
            }
        })).catch(error => {
            return({
                success : false,
                code : 500,
                error : error,
                message : "Internal Server Error"
            })
      }))

}


function mergeObjects (ujMarks, ujNames, suMarks, suNames) {
    var studentIdsUJ = Object.keys(ujMarks);
    var studentIdsSU = Object.keys(suMarks);


    
    var ujMarksArr = Object.entries(ujMarks);
    var ujNamesArr = Object.entries(ujNames);
    var suMarksArr = Object.entries(suMarks);
    var suNamesArr = Object.entries(suNames);

    var result = [];

    for(var i = 0; i < studentIdsUJ.length ; i++){
        if (ujMarksArr[i][0] === studentIdsUJ[i] && ujNamesArr[i][0] === studentIdsUJ[i]){
            result.push({
                student_id : studentIdsUJ[i],
                university : "UJ",
                name : ujNamesArr[i][1],
                mark : ujMarksArr[i][1]
            })
        }
    }

    for(var i = 0; i < studentIdsSU.length ; i++){
        if (suMarksArr[i][0] === studentIdsSU[i] && suNamesArr[i][0] === studentIdsSU[i]){
            result.push({
                student_id : studentIdsSU[i],
                university : "SU",
                name : suNamesArr[i][1],
                mark : suMarksArr[i][1]
            })
        }
    }
    return(result);
}