import { escapeRegExp } from './util/common'

export class Group {
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