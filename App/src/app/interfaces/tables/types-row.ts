import { Tags } from "./tags"

export interface TypesRow {
    cod: string
    desc: string
    tags: Tags
    localizacao: string
    un: String
    valor_estoque: number
    prod_id: number
}
