import { Group } from './Group'

export class GroupCollection {
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