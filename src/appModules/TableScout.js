class Scout {
  constructor(query_selector='#dataTable') {
    this.dataTable   = document.querySelector(query_selector)
    this.summaryRows = []
    this.dataRows    = []
    this.sites       = []

    this.getRows()
    this.getUniqueDataValues('site')
    this.getUniqueDataValues('skill')
  }
}

Scout.prototype.getRows = function () {
  let dataRows = []
  let summaryRows = []
  let rows = this.dataTable.querySelectorAll('tr')
  rows = Array.from(rows)

  rows.forEach(row => {
    if(row.childElementCount === 12)
    {
      let data = row.children
      dataRows.push({
        id     : data[0].textContent.trim(),
        site   : data[1].textContent.trim(),
        name   : data[2].textContent.trim(),
        state  : data[3].textContent.trim(),
        reason : data[4].textContent.trim(),
        skill  : data[5].textContent.trim(),
        time   : data[6].textContent.trim()
      })
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

  this.dataRows = dataRows
  this.summaryRows = summaryRows
  return {dataRows, summaryRows}
}

Scout.prototype.getDataRowsBy = function(column_filters={}, data_source=this.dataRows) {
  let filtered_rows = []
  data_source.forEach(row => {
    let valid = true

    for(let key in column_filters) {
      let value = column_filters[key]
      if(row[key] != value ) {
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
