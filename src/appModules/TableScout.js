const TimeFormater = require('./TimeFormater')

class Scout {
  constructor(query_selector='#dataTable') {
    this.dataTable   = document.querySelector(query_selector)
    this.summaryRows = []
    this.dataRows    = []
    this.sites       = []

    this.getRows({data: 'time'})
    this.getUniqueDataValues('site')
    this.getUniqueDataValues('skill')
  }
}
/**
 * Gets all rows that has 12 or 14 cells from the this.dataTable DOM Object.
 * 
 * @params {Object} [sortBy]         Object containing the name(s) of the column(s) to sort the data by.
 * @params {String} [sortBy.data]    Column name to sort the data rows by.
 * @params {String} [sortBy.summary] Column name to sort the summary rows by.
 * 
 * @returns {Object} Object containing both dataRows and summaryRow sorted if sortBy was provided.
 */
Scout.prototype.getRows = function (sortBy) {
  let dataRows = []
  let summaryRows = []
  let rows = this.dataTable.querySelectorAll('tr')
  rows = Array.from(rows)

  rows.forEach(row => {
    if(row.childElementCount === 12)
    {
      let data = row.children
      let agent_row = {
        id     : data[0].textContent.trim(),
        site   : data[1].textContent.trim(),
        name   : data[2].textContent.trim(),
        state  : data[3].textContent.trim(),
        reason : data[4].textContent.trim(),
        skill  : data[5].textContent.trim(),
        time   : TimeFormater.stringToMilliseconds(data[6].textContent)
      }

      if(agent_row.reason.length > 0) {
        agent_row.state += ` - ${agent_row.reason}`
      }

      dataRows.push(agent_row)
    }
    else if(row.childElementCount === 14)
    {
      let data = row.children
      summaryRows.push({
        skill          : data[0].textContent.trim(),
        callsInQueue   : data[1].textContent.trim(),
        answered       : data[2].textContent.trim(),
        abandons       : data[3].textContent.trim(),
        oldestCall     : data[4].textContent.trim(),
        maxDelay       : data[5].textContent.trim(),
        avgAnswerSpeed : data[6].textContent.trim(),
        serviceLevel   : data[7].textContent.trim(),
        skilled        : data[8].textContent.trim(),
        available      : data[9].textContent.trim(),
        acw            : data[10].textContent.trim(),
        acd            : data[11].textContent.trim(),
        aux            : data[12].textContent.trim(),
        other          : data[13].textContent.trim()
      })
    }
  })

  this.dataRowsHeaders = dataRows.splice(0, 1)
  this.summaryRowsHeaders = summaryRows.splice(0, 1)
  // Sort dataRows
  if(sortBy && sortBy.data)
  {
    if(dataRows[0][sortBy.data] != undefined)
    {
      dataRows = this.sortBy(dataRows, sortBy.data)
    }
  }
  // Sort summaryRows
  if(sortBy && sortBy.summary)
  {
    if(summaryRows[0][sortBy.summary])
    {
      summaryRows = this.sortBy(summaryRows, sortBy.summary)
    }
  }

  this.dataRows    = dataRows
  this.summaryRows = summaryRows
  return {dataRows, summaryRows}
}
/**
 * Sort data by specified column(field).
 * 
 * @params {Array}  data        List of rows to sort.
 * @params {String} column_name Key column to sort the by.
 * 
 * @returns {Array} Sorted array.
 */
Scout.prototype.sortBy = function (data, column_name) {
  return data.sort((rowa, rowb) => {
    if(rowa[column_name] < rowb[column_name]) {
      return 1
    } else if(rowa[column_name] > rowb[column_name]) {
      return -1
    }

    return 0
  })
}

Scout.prototype.getDataRowsBy = function(column_filters={}, data_source=this.dataRows) {
  let filtered_rows = []
  data_source.forEach(row => {
    for(let key in column_filters) {
      let value = column_filters[key]
      if(!row[key].match(value)) {
        valid = false
        return
      }
    }

    filtered_rows.push(row)
  })
  return filtered_rows
}

Scout.prototype.getSummaryRowsBy = function(column_filters={}, data_source=this.summaryRows) {
  let filtered_rows = []
  data_source.forEach(row => {
    for(let key in column_filters) {
      let value = column_filters[key]
      if(row[key] != value ) return
    }

    filtered_rows.push(row)
  })
  return filtered_rows
}

Scout.prototype.getSummaryRowsBySite = function(site) {
  let summary = this.getSummaryRowsBy()
  if(!site) return summary

  let all_agents = this.getDataRowsBy({site})

  summary.map(summaryRow => {
    let skill = summaryRow.skill
    summaryRow.skilled   = this.getDataRowsBy({skill}                , all_agents).length
    summaryRow.available = this.getDataRowsBy({skill, state: 'AVAIL'}, all_agents).length
    summaryRow.acw       = this.getDataRowsBy({skill, state:   'ACW'}, all_agents).length
    summaryRow.acd       = this.getDataRowsBy({skill, state:   'ACD'}, all_agents).length
    summaryRow.aux       = this.getDataRowsBy({skill, state:   'AUX'}, all_agents).length
    summaryRow.other     = this.getDataRowsBy({skill, state: /OTHER/}, all_agents).length

    return summaryRow
  })

  return summary
}

Scout.prototype.getUniqueDataValues = function (column, source_data = this.dataRows) {
  if(!column) throw new Error('No column specified')
  let unique_values = []
  let column_key

  source_data.forEach(row => {
    let type = column.constructor
    column_key = type === String ? column : Object.keys(row)[column]

    if(!unique_values.includes(row[column_key])) {
      unique_values.push(row[column_key])
    }
  })

  this[column_key] = unique_values
  return unique_values
}

module.exports = Scout
