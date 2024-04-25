export type MagicCard = {
    id: string
    scryfallId: string
    name: string
}

export type ParentCard = {
    id: string
    name: string
    color: string
}

export type MagicCardResponse = {
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
    parent_card?: ParentCard
}

export type SearchResponse = {
    total_cards: number,
    has_more: boolean,
    data: Array<MagicCardResponse>
}