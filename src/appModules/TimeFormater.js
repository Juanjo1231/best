/**
 * Converts hh:mm:ss formatted string to milliseconds.
 * 
 * @param   {String} str Time string in hh:mm:ss format.
 * @returns {Number} Time in milliseconds.
 */
function stringToMilliseconds (...strings) {
  strings = strings[0].constructor === Array ? strings[0] : strings
  try
  {
    let res = []
    strings.forEach(str => {
      let values = str.split(":").reverse()
      let ss = Number(values[0])
      let mm = Number(values[1]) || 0
      let hh = Number(values[2]) || 0

      ss *= 1000
      mm *= 60000
      hh *= 3600000

      res.push(ss + mm + hh)
    })
 
    return res.length === 1 ? res[0] : res
  }
  catch (e)
  {
    console.log(e)
    let funcName = 'stringToMilliseconds'
    if(e instanceof TypeError) {
      console.error(`${funcName}: Invalid param, expected string in hh:mm:ss format.\n${e.stack}`)
    }
  }
}
/**
 * Converts milliseconds to hh:mm:ss formatted string.
 * 
 * @param   {Number} int Time in milliseconds.
 * @returns {String} Time represented in hh:mm:ss formatted string. 
 */
function millisecondsToString (...ints) {
  ints = ints[0].constructor === Array ? ints[0] : ints
  try
  {
    let res = []
    ints.forEach(int => {
      let hh     = Math.floor(int / 3600000)
      let hh_mod = int % 3600000
      let mm     = Math.floor(hh_mod / 60000)
      let mm_mod = hh_mod % 60000
      let ss     = Math.floor(mm_mod / 1000)

      mm = mm < 10 ? `0${mm}` : mm
      ss = ss < 10 ? `0${ss}` : ss

      res.push(hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`)
    })
    
    return res.length === 1 ? res[0] : res
  }
  catch (e)
  {
    console.error(e)
  }
}

module.exports = {stringToMilliseconds, millisecondsToString}
