interface ICalendarData {
  meta: ICalendarMeta,
  rows: string[][]
}
interface ICalendarMeta {
  issuer: string,
  filter: string,
  span: string
}

export function parseCalendarCsv (data): ICalendarData {
  const rows: string[] = data.split('\n')

  if (rows.length < 5) {
    throw new Error('Invalid CSV. Must contain at least 5 rows.')
  }

  const metaRows = rows.slice(1, 3).map(splitRow)
  // const headerRow = rows[3]
  const dataRows = rows.slice(4).map(splitRow)

  const metadata: ICalendarMeta = {
    issuer: metaRows[0][1],
    filter: metaRows[1][0],
    span: metaRows[1][1]
  }

  const calendar: ICalendarData = {
    meta: metadata,
    rows: dataRows
  }

  return calendar
}

function splitRow (row) {
  return row
    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    .map(cell => cell
      .trim()
      .replace(/^"(.*)"$/, '$1'))
}
