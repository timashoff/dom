import { dataUser } from './const.js'

const sortData = (e) => {
  const elem = e.target
  const sortName = elem.textContent

  const arr = elem.classList.contains('up')
    ? dataUser.toSorted((a, b) => (a[sortName] > b[sortName] ? 1 : -1))
    : dataUser.toSorted((a, b) => (b[sortName] > a[sortName] ? 1 : -1))

  return arr
}

const createTable = (data) => {
  const table = document.createElement('table')
  const head = createTableHead(data)
  const body = createTableBody(data)
  table.append(head, body)
  return table
}

const createTableHead = (data) => {
  const head = document.createElement('thead')
  const row = document.createElement('tr')

  const titles = Object.keys(data[0])
  for (const title of titles) {
    const cell = document.createElement('th')
    cell.textContent = title
    cell.setAttribute('data-head', title)
    cell.addEventListener('click', sortTable)
    row.append(cell)
  }
  head.append(row)
  return head
}

const createTableBody = (data) => {
  const body = document.createElement('tbody')
  const arr = []
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr')
    Object.values(data[i]).forEach((d) => {
      const cell = document.createElement('td')
      cell.textContent = d
      row.append(cell)
      arr.push(row)
    })
  }
  body.append(...arr)
  // body.id = new Date().getMilliseconds()
  return body
}

const sortTable = (e) => {
  if (!e.target.classList) e.target.classList.add('up')

  e.target.classList.contains('down')
    ? e.target.classList.replace('down', 'up')
    : (e.target.classList.value = 'down')

  const ups = document.querySelectorAll('.up')
  const downs = document.querySelectorAll('.down')

  if ((ups.length && downs.length) || ups.length > 1 || downs.length > 1) {
    for (const up of ups) up.classList.toggle('up')
    for (const down of downs) down.classList.toggle('down')
    e.target.classList.value === 'down' || !e.target.classList.value
      ? (e.target.classList.value = 'up')
      : (e.target.classList.value = 'down')
  }

  const data = sortData(e)

  const table = document.querySelector('table')
  const tbody = document.querySelector('tbody')
  tbody.remove()
  table.append(createTableBody(data))
}

document.body.append(createTable(dataUser))
