import { CardModel } from "../types";
import { useRef } from "react";

interface CardProps {
    data: CardModel;
}

function Card({ data }: CardProps) {

    const yRange = [-10, 10];
    const xRange = [-10, 10];
    const magicCardRef = useRef<HTMLDivElement>(null);
    const propertyRef = useRef<HTMLDivElement>(null);

    function getRotate(range: number[], value: number, max: number) {
        return (value / max) * (range[1] - range[0]) + range[0];
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const magicCard = magicCardRef.current;
        const { offsetX, offsetY } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = magicCard as HTMLElement;
        const ry = -getRotate(yRange, offsetX, offsetWidth);
        const rx = getRotate(xRange, offsetY, offsetHeight);
        console.log(rx,ry);
        
        (magicCard as HTMLElement).style.setProperty('--rx', `${rx}deg`);
        (magicCard as HTMLElement).style.setProperty('--ry', `${ry}deg`);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) =>{
        const magicCard = magicCardRef.current;
        const propertyCard = propertyRef.current;
        (propertyCard as HTMLElement).style.display = 'none';

        (magicCard as HTMLElement).style.setProperty('--rx', `0deg`);
        (magicCard as HTMLElement).style.setProperty('--ry', `0deg`);
    }
    const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) =>{
        const propertyCard = propertyRef.current;
        (propertyCard as HTMLElement).style.display = 'block';

    }
    return (
        <>
        <div className="relative">
            <div className="magic-card m-5 hover:shadow-lg rounded-xl hover:shadow-cyan-300 " 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseOver={handleMouseOver}
                ref={(magicCardRef)}
            >
                <img className="w-[20rem] rounded-xl " src={data.image_uris.border_crop} />
            </div>
          
                <div className="absolute  left-1/2 top-0 translate-x-1/2 bg-gray-100 z-10 hidden"
                ref={(propertyRef)}>
                    <h6>Name</h6>
                    <span>{data.name}</span>
                    <h6>Set Name</h6>
                    <span>{data.set_name}</span>
                </div>

      

            </div>
        </>
    );
}

export default Card;
