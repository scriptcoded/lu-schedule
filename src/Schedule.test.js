const { Schedule } = require('./Schedule')

const MOCK_RESPONSE = `
TimeEdit, Lunds universitet
"M-RoN, RoN", 2019-09-02 - 2020-01-19 v 36-3, 
Startdatum, Starttid, Slutdatum, Sluttid, Kurs, Studentgrupp, Undergrupp, Student, Moment/Delkurs, Undervisningstyp, Titel, Lokal, Platskommentar, Lokalbokningsaktivitet, Lärare/ansvarig, Extern lärare, Kommentar, URL, Orsak, Antal, ID 
2019-09-02, 10:15, 2019-09-02, 11:00, M-RoN, M-RoN-Helkurs, , , , Introduktion, Introduktion RoN, Fernströmsalen, , , Fredrik Bengtsson, , , , , , 2031167
`

function mockSchedule () {
  const schedule = new Schedule('someId', 'someOtherId')
  schedule.httpGet = async () => ({
    data: MOCK_RESPONSE
  })

  return schedule
}

describe('creates schedule from URL', () => {
  test('with extension', () => {
    const schedule = Schedule.fromUrl('https://cloud.timeedit.net/lu/web/someProgrammeId/someId.html')
  
    expect(schedule.programmeId).toBe('someProgrammeId')
    expect(schedule.id).toBe('someId')
  })
  test('without extension', () => {
    const schedule = Schedule.fromUrl('https://cloud.timeedit.net/lu/web/someProgrammeId/someId')
  
    expect(schedule.programmeId).toBe('someProgrammeId')
    expect(schedule.id).toBe('someId')
  })
})

test('loads data correctly', async () => {
  const schedule = mockSchedule()

  await schedule.load()

  expect(schedule.issuer).toBe('Lunds universitet')
  expect(schedule.filter).toBe('M-RoN, RoN')
  expect(schedule.span).toBe('2019-09-02 - 2020-01-19 v 36-3')
  expect(schedule.lessons).toHaveLength(1)
})
