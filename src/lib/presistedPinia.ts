import { type Pinia, createPinia } from "pinia"
import { useSettingStore } from "../store/settings"
import { invoke } from "@tauri-apps/api"
import { map } from "ramda"

async function getPresistItem(name: string): Promise<string | null> {
  return await invoke<string | null>("get_presist_item", { name })
}
async function setPresistItem(name: string, value: string): Promise<void> {
  await invoke("set_presist_item", { name, value })
}

// Reference: https://github.com/prazdevs/pinia-plugin-persistedstate/issues/214#issuecomment-1605923720
export async function createPresistedPinia(): Promise<Pinia> {
  const pinia = createPinia()

  async function recoverStore(): Promise<void> {
    const stores = [useSettingStore(pinia)]

    await Promise.all(
      map(async (store): Promise<void> => {
        const data = await getPresistItem(store.$id)
        console.log(data)
        if (data !== null) {
          store.$patch(JSON.parse(data))
        }

        store.$subscribe(() => {
          setPresistItem(store.$id, JSON.stringify(store.$state)).catch(console.error)
        })
      }, stores),
    )
  }

  await recoverStore()
  return pinia
}
