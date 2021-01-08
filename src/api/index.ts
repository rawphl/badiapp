import type { Badi } from "../models/Badi"
const WIE_WARM_API_URL = "https://www.wiewarm.ch/api/v1/bad.json?search=0"

export async function loadBadis(): Promise<Badi[]> {
    const response = await fetch(WIE_WARM_API_URL)
    const badis = await response.json()
    return badis  
}