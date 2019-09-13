import { get } from './util/http'
import { parseCalendarCsv } from './util/calendar'
import { GroupCollection } from './GroupCollection'
import { Lesson } from './Lesson'

export class Schedule {
  programmeId: string
  id: string
  issuer: string
  filter: string
  span: string

  lessons: Lesson[]

  httpGet = get

  constructor (programmeId: string, id: string) {
    this.programmeId = programmeId
    this.id = id
  }

  async load () {
    const requestUrl: string = `https://cloud.timeedit.net/lu/web/${this.programmeId}/${this.id}.csv`
    
    const response = await this.httpGet(requestUrl)

    const calendarData = parseCalendarCsv(response.data)

    this.issuer = calendarData.meta.issuer
    this.filter = calendarData.meta.filter
    this.span = calendarData.meta.span

    this.loadFromCsvRows(calendarData.rows)
  }

  private loadFromCsvRows (rows: string[][]) {
    this.lessons = rows.map(row => {
      const course = row[4]

      let studentGroups: GroupCollection = GroupCollection.fromGroupString(course, row[5])
      let subGroups: GroupCollection = GroupCollection.fromGroupString(course, row[6])

      const lesson: Lesson = {
        start: new Date(`${row[0]}T${row[1]}`),
        end: new Date(`${row[2]}T${row[3]}`),
        course,
        studentGroups,
        subGroups,
        student: row[7],
        subCourse: row[8],
        educationalType: row[9],
        title: row[10],
        location: row[11],
        locationComment: row[12],
        locationBooking: row[13],
        educator: row[14],
        externalEducator: row[15],
        comment: row[16],
        url: row[17],
        reason: row[18],
        count: row[19],
        id: row[20],
      }

      return lesson
    })
  }

  static fromUrl (url: string): Schedule {
    const matched = url.match(/^https?:\/\/cloud.timeedit.net\/lu\/web\/([^/]+)\/([a-z0-9]+)/i)
    
    if (!matched) {
      throw new Error('Invalid URL. Must be a LU TimeEdit URL.') 
    }
  
    return new Schedule(matched[1], matched[2])
  }
}