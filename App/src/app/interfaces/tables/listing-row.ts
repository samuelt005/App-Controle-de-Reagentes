import { Tags } from "./tags"

export interface ListingRow {
    cod: string
    desc: string
    tags: Tags
    estoque: number
    un: string
    localizacao: string
    valor_un: number
    valor_tot: number
    prod_id: number
}
