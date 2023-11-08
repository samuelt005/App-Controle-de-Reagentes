import { Tags } from "./tags"

export interface TypesRow {
    cod: string
    desc: string
    tags: Tags
    localizacao: string
    un: string
    valor_estoque: number
    prod_id: number
}
