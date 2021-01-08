import { useEffect, useState } from "react"
import { loadBadis } from "../api"
import type { Badi } from "../models/Badi"

const FAVORITES_KEY = "favorites"

type FavoritesHookReturnValue = {
    addFavorite: (id: number) => void,
    removeFavorite: (id: number) => void,
    isFavorite: (id: number) => boolean
}

export const useFavorites: () => FavoritesHookReturnValue = () => {
    const [favorites, setFavorites] = useState<number[]>([])

    useEffect(() => {
        const maybeFavorites = localStorage.getItem(FAVORITES_KEY)
        setFavorites(maybeFavorites !== null ? JSON.parse(maybeFavorites) : [])
    }, [])

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (id: number) => setFavorites([...favorites, id])
    const removeFavorite = (id: number) => setFavorites(favorites.filter(fid => fid !== id))
    const isFavorite = (id: number) => favorites.includes(id)

    return { addFavorite, removeFavorite, isFavorite }
}

const BADIS_KEY = "badis"

type BadiHookReturnValue = {
    isLoading: boolean,
    error: string,
    badis: Badi[]
}

export const useBadis: () => BadiHookReturnValue = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [badis, setBadis] = useState<Badi[]>([])

    useEffect(() => {
        if(isLoading) return
        const load = async () => {
            setIsLoading(true)
            try { 
                const badis = await loadBadis()
                setBadis(badis)
            } catch(e) {
                setError("Could not load badis")
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])

    useEffect(() => {
        localStorage.setItem(BADIS_KEY, JSON.stringify(badis))
    }, [badis])

    return { isLoading, error, badis }
}