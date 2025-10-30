/* eslint-disable no-unused-vars */
const KEY_PEOPLE = "dew.people"
const KEY_QUERY = "dew.query"

export function savePeople(data){
  try {
    localStorage.setItem(KEY_PEOPLE, JSON.stringify(data))
  } catch (e) {
    return null
  }
}

export function loadPeople(){
  try {
    const items = localStorage.getItem(KEY_PEOPLE)
    return items ? JSON.parse(items) : null
  } catch (e) {
    return null
  }
}

export function saveQuery(query){
  try {
    localStorage.setItem(KEY_QUERY, query)
  } catch (error) {
    return null
  }
}

export function loadQuery(){
  try {
    return localStorage.getItem(KEY_QUERY) || ""
  } catch (error) {
    return null
  }
}
