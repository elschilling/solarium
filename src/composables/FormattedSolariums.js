import { format, formatDistanceToNow } from 'date-fns'
import { computed } from 'vue'

export default function formatSolariums(solariums) {
  const formattedSolariums = computed((solariums) => {
    console.log(solariums)
    if (solariums.value) {
      let data = solariums.value.sort((a, b) => Number(new Date(b.last_edit)) - Number(new Date(a.last_edit)))
      return data.map((doc) => {
        let createdData = format(new Date(doc.created_at), 'MM/dd/yyyy')
        let lastEdit = 'Last edited ' + formatDistanceToNow(new Date(doc.last_edit)) + ' ago'
        let solariumPath = window.location.origin + '/' + doc.path
        doc.thumb_url = storage_path + doc.thumb_url
        return { ...doc, createdData, lastEdit, solariumPath }
      })
    }
  })
}
