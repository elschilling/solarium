export default async function storageUpload(database, user, file) {
  const timestamp = new Date().getTime()
  const { data, error } = await database.storage.from('solarium').upload(user + '/' + timestamp + '-' + file.name, file)
  if (data) {
    return data.path
  }
  if (error) {
    alert(error.message)
    console.error('error', error)
    return
  }
}
