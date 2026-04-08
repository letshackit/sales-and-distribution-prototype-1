import { useCallback, useEffect, useState } from "react"
import { FIELD_BRIDGE_STORAGE_KEY, type FieldBridgePayload, readFieldBridge } from "../lib/fieldSessionBridge"

export function useFieldBridge() {
  const [bridge, setBridge] = useState<FieldBridgePayload | null>(() => readFieldBridge())

  const refresh = useCallback(() => {
    setBridge(readFieldBridge())
  }, [])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === FIELD_BRIDGE_STORAGE_KEY || e.key === null) refresh()
    }
    const onCustom = () => refresh()
    window.addEventListener("storage", onStorage)
    window.addEventListener("zamtel-field-bridge", onCustom)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("zamtel-field-bridge", onCustom)
    }
  }, [refresh])

  return { bridge, refresh }
}
