interface HSGroup {
  groupName: string
  programIDs: string
  subGroups: HSGroup[]
}

export default HSGroup;
