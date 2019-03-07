/**
 * Gets all data rows from the data table.
 * @param {String} query_selector Identifier to find the table with the data to scout.
 */
function getAllDataRows(query_selector = '#dataTable') {
  let main_table = document.querySelector(query_selector)
  let rows = main_table.querySelectorAll('tr')
  let data_rows = []

  rows.forEach(row => {
    if(row.childElementCount === 12) {
      let data = row.children
      let site = data[1].textContent.trim()
      if(site === 'Site') return
      data_rows.push(row)
    }
  })

  return data_rows
}
/**
 * Gets all unique sites in the data table.
 * @param {String} query_selector Identifier to find the table with the data to scout.
 */
function getSites(query_selector = '#dataTable') {
  let main_table = document.querySelector(query_selector)
  let rows = getAllDataRows()
  let sites = []

  rows.forEach(row => {
    let site = row.children[1].textContent.trim()
    if(!sites.includes(site)) sites.push(site)
  })

  return sites
}
/**
 * Get all unique skills in the data table.
 * @param {String} query_selector Identifier to find the table with the data to scout.
 */
function getAllSkills(query_selector = '#dataTable') {
  let main_table = document.querySelector(query_selector)
  let rows = getAllDataRows()
  let skills = []

  rows.forEach(row => {
    let skill = row.children[5].textContent.trim()
    if(!skills.includes(skill)) skills.push(skill)
  })

  return skills
}
/**
 * Gets agents based on the values provided.
 * @param {JSON} args Values to filter the search by.
 */
function getAgentsBy(args = {}) {
  args.id     = args.id     || ""
  args.site   = args.site   || ""
  args.name   = args.name   || ""
  args.state  = args.state  || ""
  args.reason = args.reason || ""
  args.skill  = args.skill  || ""

  let rows = getAllDataRows()
  let matched_rows = []

  rows.forEach(row => {
    let tds = row.children
    let uid      = tds[0].textContent.trim()
    let site     = tds[1].textContent.trim()
    let name     = tds[2].textContent.trim()
    let state    = tds[3].textContent.trim()
    let reason   = tds[4].textContent.trim()
    let skill    = tds[5].textContent.trim()
    let duration = tds[6].textContent.trim()

    if(uid.match(args.id)        &&
       site.match(args.site)     &&
       name.match(args.name)     &&
       state.match(args.state)   &&
       reason.match(args.reason) &&
       skill.match(args.skill))
    {
      matched_rows.push({uid, site, name, state, reason, skill, duration})
    }
  })

  return matched_rows
}

module.exports = {
  getSites,
  getAllSkills,
  getAgentsBy
}
