import React from 'react';

function Header(props){
    const {score,highscore,displayText} = props
    return(
        <section className = 'header'>
            <div className = 'title'>The Memory Game</div>
            <div className = 'rules'>Get points for choosing a card, but don't click on the same card more than once!</div>
            <div className = 'scoreboard'>
                <div className='score'>Score: {score}</div>
                <div className='highscore'>Highscore: {highscore}</div>
            </div>
            <div className = 'displayText'>{displayText}</div>
        </section>
    );
}
export default Header;
