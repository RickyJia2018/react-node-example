
export type ParentCardModel = {
    id: string
    name: string
    color: string
}
export type CardModel = {
    scryfall_id: string
    name: string
    set_name: string
    number: number
    rarity: string
    image_uris: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
    };
    parent_card?: ParentCardModel
}