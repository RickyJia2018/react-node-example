/* eslint-disable import/prefer-default-export */
import PrismaSingleton from '../lib/prisma';
import { MagicCard } from '../models';

const prism = PrismaSingleton.getInstance();



const findMagicCard = async (scryfallId: string): Promise<MagicCard | null> => {
    try {
        const result = await prism.$queryRaw<MagicCard[]>`        
            WITH ColorCounts AS (
                SELECT
                    mrc.color,
                    COUNT(*) AS color_count
                FROM
                    magicrelatedcards AS mrc
                GROUP BY
                    mrc.color
            ),
            MaxColorCount AS (
                SELECT
                    MAX(color_count) AS max_color_count
                FROM
                    ColorCounts
            )
            SELECT
                mrc.name,
                mrc.color,
                mrc.magicCardId
            FROM
                magicrelatedcards AS mrc
            JOIN
                ColorCounts AS cc ON mrc.color = cc.color
            JOIN
                MaxColorCount AS mcc ON cc.color_count = mcc.max_color_count
            WHERE
                mrc.parentCardId = (SELECT id FROM magiccards WHERE scryfallId = ${scryfallId})
            ORDER BY
                mrc.magicCardId DESC
            LIMIT 1;

        `;
        return result[0] || null;
    } catch (error) {
        //TODO: log error
        console.error("Error finding magic card:", error);
        return null;
    }
}
export { findMagicCard }