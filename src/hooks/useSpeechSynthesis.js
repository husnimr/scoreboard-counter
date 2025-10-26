import { useEffect, useState } from 'react'

export default function useSpeechSynthesis() {
  const [voices, setVoices] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    function load() {
      const v = window.speechSynthesis.getVoices() || []
      setVoices(v)
      if (v.length > 0 && !selected) setSelected(v[0])
    }
    load()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load
    }
  }, [])

  return { voices, selected, setSelected }
}
