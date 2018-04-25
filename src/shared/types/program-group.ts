interface ProgramGroup {
  groupName: string
  programIDs: string[]
  subGroups: ProgramGroup[]
}

export {ProgramGroup};
