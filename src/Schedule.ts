import { get } from './util/http'
import { parseCalendarCsv } from './util/calendar'
import { escapeRegExp } from './util/common'

class GroupCollection {
  groups: Group[]
  groupNumbers?: number[]

  constructor (groups: Group [], groupNumbers?: number[]) {
    this.groups = groups

    if (groupNumbers) {
      this.groupNumbers = groupNumbers
    }
  }

  static fromGroupString (course: string, groupString: string): GroupCollection {
    const groups: Group[] = Group.fromGroupString(course, groupString)

    let hasGroupNumbers = false
    const groupNumbers = groups.reduce((numbers, group) => {
      if (group.groupNumbers) {
        hasGroupNumbers = true
        return [
          ...numbers,
          ...group.groupNumbers
        ]
      } else {
        return numbers
      }
    }, [])

    const groupCollection = new GroupCollection(groups)

    if (hasGroupNumbers) {
      groupCollection.groupNumbers = groupNumbers
    }

    return groupCollection
  }
}

class Group {
  course: string
  groupName: string

  groupNumbers?: number[]

  static fromGroupString (course: string, groupString: string): Group[] {
    const groups: Group[] = []
    
    if (course) {
      const groupRegex = new RegExp(`${escapeRegExp(course)}\s*-\s*(.*)`, 'i')
      const groupStrings: string[] = groupString.split(',')
  
      for (const groupString of groupStrings) {
        const match = groupString.trim().match(groupRegex)
 
        if (match) {
          const group: Group = {
            course,
            groupName: match[1]
          }

          const rangeMatch = group.groupName
            .replace(/\s/g, '')
            .match(/gr\.([0-9]+)(?:-([0-9]+))?/)

          if (rangeMatch) {
            const start = parseInt(rangeMatch[1])
            const end = parseInt(rangeMatch[2])

            if (start >= 0) {
              if (end >= start) {
                group.groupNumbers = new Array(end - start + 1)
                  .fill(null)
                  .map((_, index) => start + index)
              } else {
                group.groupNumbers = [start]
              }
            }

          }

          groups.push(group)
        }
      }
    }

    return groups
  }
}

class Lesson {
  start: Date
  end: Date
  course: string
  studentGroups?: GroupCollection
  subGroups?: GroupCollection
  student: string
  subCourse: string
  educationalType: string
  title: string
  location: string
  locationComment: string
  locationBooking: string
  educator: string
  externalEducator: string
  comment: string
  url: string
  reason: string
  count: string
  id: string
}

export class Schedule {
  programmeId: string
  id: string
  issuer: string
  filter: string
  span: string

  lessons: Lesson[]

  constructor (programmeId: string, id: string) {
    this.programmeId = programmeId
    this.id = id
  }

  async load () {
    const requestUrl: string = `https://cloud.timeedit.net/lu/web/${this.programmeId}/${this.id}.csv`
    
    const response = await get(requestUrl)

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