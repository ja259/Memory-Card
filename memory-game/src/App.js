import './App.css';
import data from './data';
import React, {useState} from 'react';
import CardContainer from './components/CardContainer';
import Header from './components/Header';

function App() {
  const [score, setScore]=useState(0);
  const [highScore,setHighScore]=useState(0);
  const [displayText,setDisplayText]=useState('');
  const [chosenCards,addCard]=useState([]);


  //Handles score 
  const handleScore = ()=> setScore((prevScore) => prevScore+1)

  //Handles highscore
  const checkForHighScore=()=>{
    if (score>=highScore)
      setHighScore(score+1);
  }
  //Toggles boolean switch in data, signaling we chose the card & adds card to local array that tracks the chosen cards
  const handleCard = (cardName) =>{
    let index=data.cards.findIndex(x => x.title===cardName);
    data.cards[index].chosen=true;
    addCard((chosenCards)=>[...chosenCards,cardName]); //We can change this if we value space over efficiency 
  }

  const handleDisplayText = (input)=> setDisplayText((input));
  //Resets boolean switch in data, clears chosencards array & resets score
  const reset = ()=>{
    data.cards.forEach(element => {
      element.chosen=false;
    });
    addCard([]);
    setScore(0);
  }
  
  //Progresses game if chosen card is unique, resets game otherwise
  const handleGameLogic = (cardName) =>{
    if (!chosenCards.includes(cardName)){
      if(chosenCards.length + 1 === data.cards.length)
      {
        handleScore();
        checkForHighScore();
        reset();
        setDisplayText('You win!')
        return;
      }
      handleCard(cardName);
      handleScore();
      checkForHighScore();
      setDisplayText('');
    }
    else{
      reset();
      setDisplayText('You chose the same card twice! Try again!')
    }
  }
  return (
    <div className="App">
      <Header
        score={score}
        highscore={highScore}
        displayText={displayText}
      />
      <CardContainer
        handleGameLogic={handleGameLogic}
        score={score}
        highscore={highScore}
      />
    </div>
  );
}

export default App;