import React, { useState, useEffect } from 'react';
import Card from './Card'
import data from '../data'

function CardContainer(props){
    //If you remove score & highscore, game goes bonkers
    const {handleGameLogic,score,highScore} = props;
    let validCardContainer = false;
    const generateDeck=()=>{
        let amountOfCards=data.cards.length;
        let generatedCards = [];
        for (let i=0; i<5; i++)
        {
            let randomId = Math.floor(Math.random() * amountOfCards);
            while (generatedCards.includes(data.cards[randomId])) //Generates a unique ID so a card doesn't appear twice in the array
            {
                randomId = Math.floor(Math.random() * amountOfCards);
            }
            if (!data.cards[randomId].chosen)
            {
                validCardContainer=true;
            }
            generatedCards = [...generatedCards,data.cards[randomId]];
        }
        if (validCardContainer)
        {
            validCardContainer=false;
            return generatedCards;
        }
        else
        {
            validCardContainer=false;
            return correctGeneratedCards(generatedCards);
        }
    }

    const correctGeneratedCards=(cards) =>{
        const unchosenCards = data.cards.filter(card => !card.chosen);
        if (unchosenCards === [])
        {
            return [];
        }
        cards[Math.floor(Math.random() * cards.length)] = unchosenCards[Math.floor(Math.random() * unchosenCards.length)];
        return cards;

    }
    const [displayCards, setDisplayCards] = useState([]);
    useEffect(() => {
        const newCards = generateDeck();
        if (newCards !==[])
            setDisplayCards(newCards);
        else
            console.log("You win!")
      }, [score, highScore]);
      
    return(
        <div className='card-container'>
        {displayCards.map((card) => (
            <Card 
                name={card.title}
                picture={card.pictureDir} 
                handleGameLogic={handleGameLogic}
                key={card.id} />
      ))}

      </div>
    )
}
export default CardContainer;
