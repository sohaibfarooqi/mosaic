/*
Utility function to flatten nested objects for table display.
*/
export function transformRows(data){
  if(data){
    return data.map((obj) =>
      { return {...obj, movements: obj.movements.map((m) => m.title).join()}})
  }
  return []
}
