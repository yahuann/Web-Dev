// no () bc we dont want to call the function when "required"
// if require(),require(__dirname+"/date.js");
// the object has 2 funtions/property: getDate and getDay,each of which is a function

exports.getDay = getDay;
module.exports.getDate =
  // getDate;
  // var getDate =
  function() {
    let today = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long'
    };
    let day = today.toDateString("en-US", options);

    return day;
  }


function getDay() {
  let today = new Date();
  const options = {
    weekday: 'long',
  };
  let day = today.toDateString("en-US", options);

  return day;
}
