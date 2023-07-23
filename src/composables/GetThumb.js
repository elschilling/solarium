import { Buffer } from 'buffer'

const prepareBase64DataUrl = (base64) => base64.replace('data:image/png;', 'data:image/png;charset=utf-8;').replace(/^.+,/, '')

export default async function handleThumb(file, supabase, user_id) {
  const canvas = document.querySelector('canvas')
  const dataURL = canvas.toDataURL('image/jpeg')
  const timestamp = new Date().getTime()
  const filename = 'thumb-' + timestamp + '-' + file + '.jpg'
  const { data, error } = await supabase.storage
    .from('solarium')
    .upload(user_id + '/' + filename, Buffer.from(prepareBase64DataUrl(dataURL), 'base64'), {
      contentType: 'image/jpeg',
      upsert: true,
    })
  if (data) {
    return data.path
  }
  if (error) {
    alert(error.message)
    return
  }
}
