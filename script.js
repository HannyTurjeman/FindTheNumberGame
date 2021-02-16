const $gameBoard = document.getElementById('board'),
      $language = document.getElementById('language'),
      $audioTag = document.getElementById('audio'),
      numbers = [0,1,2,3,4,5,6,7,8,9];

//function to play sounds
const playSound = (language, sound) =>{
        $audioTag.src = soundsUrls[language][sound];
        $audioTag.play();
    }
 
//function to play where is the number
const playSounds = (number) => {
        playSound($language.value, 'where');
    
        setTimeout(()=> {
            playSound($language.value, number);
           }, 1300);
    }
    
//map for the sounds
const soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    he: {
        where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.mp3'
    },
    en: {
        where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.en.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.en.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.en.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.en.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.en.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.en.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.en.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.en.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.en.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.en.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.en.mp3'
    }
    
}

//swapping the numbers inside the array
const shuffle = (numberArray) => {
    let counter = numberArray.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = numberArray[counter];
        numberArray[counter] = numberArray[index];
        numberArray[index] = temp;
    }

    return numberArray;
}

//creaing the level
const createLevel = () => {
    $gameBoard.innerHTML = "";
    $gameBoard.classList.remove('correct')
    const random = Math.floor(Math.random() * 10); //return 0 till 9
    $gameBoard.dataset.answer = random;


    const randomNumbers = shuffle(numbers);
    randomNumbers.forEach((number) => {
        const liElement = document.createElement("li");
        liElement.innerText = number;
        liElement.dataset.id = number;
        $gameBoard.appendChild(liElement);

    });

    const playSButton = document.createElement("li");
    playSButton.classList.add('play-sound');
    playSButton.dataset.id ='play-sound';
    $gameBoard.appendChild(playSButton);

    playSounds(random);

}

createLevel();


//check if user answer is correct
const selectedAnswer = ($event) => {
   isLiElement = $event.target.nodeName === 'LI'
   if (!isLiElement) {
       return false;
   }

   const selectedUserAnswer = $event.target.dataset.id;
   const correctAnswer = $gameBoard.dataset.answer

   const currentLang = $language.value;

   if (selectedUserAnswer === 'play-sound') {
     return playSounds(correctAnswer);
   
   }
   

   if (selectedUserAnswer === correctAnswer) {
       $gameBoard.classList.add('correct');

       $audioTag.src = soundsUrls.correct;
       $audioTag.play();

       setTimeout(()=> {
        createLevel();
       }, 1300);

   } else {
       console.log("No");
       $gameBoard.classList.add('wrong');

       $audioTag.src = soundsUrls.wrong;
       $audioTag.play();

       setTimeout(()=> {
          playSound(currentLang, selectedUserAnswer);
       }, 1300);

       setTimeout(()=> {
        $gameBoard.classList.remove('wrong')
       }, 2000)
   } 

   
    console.log($event.target.dataset.id);
} 

//listener on the father (deligation)
$gameBoard.addEventListener('click', selectedAnswer);







///////////creating audio element instead of creating directly on the HTML and then just to catch
// const audioTag = document.createElement('audio');
// audioTag.type = 'audio/mpeg';
// audioTag.id = 'audio';
// document.body.appendChild(audioTag);
/////////////////////////////////////////////////
