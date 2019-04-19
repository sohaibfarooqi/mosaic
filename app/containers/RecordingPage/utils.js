/*
Utility function to flatten nested objects for table display.
*/
export function transformRows(data){
  console.log(data)
  if(data){
    return data.map((obj) =>
      { return {...obj, performers: obj.performers.map((m) => m.name).join()}})
  }
  return []
}
