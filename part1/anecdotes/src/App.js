import { useState } from 'react'

const AnecdoteOfTheDay = ({anecdote, votes}) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{anecdote}</p>
      <p>has {votes ? votes : 0} votes</p>
    </>
  )
}

const AnecdoteMostVoted = ({anecdote}) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote ? anecdote : 'No votes submit yet. Be the first one to vote!'}</p>
    </>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [mostVoted, setMostVoted] = useState(null)

  const randomNumber = (max) => {
    return Math.floor(Math.random() * max)
  }

  const randomAnecdote = () => {
    const max = anecdotes.length
    let random = randomNumber(max)

    //if it is the same anecdote, repeat until getting a new one
    while (selected === random) {
      random = randomNumber(max)
    }

    setSelected(random)
  }

  const getMostVoteAnecdote = (votes) => {
    let currentMostVoted = 0
    let mostVote = null

    //get most vote anecdote
    for (let i=0; i <= anecdotes.length; i++) {
      //if there is a vote saved for that anecdote, compare it to currentMostVoted and save it if it is greater
      if (votes[i] > currentMostVoted) {
        currentMostVoted = votes[i]
        mostVote = i
      }
    }

    //return most vote anecdote, otherwise return null
    return setMostVoted(anecdotes[mostVote])
  }

  const submitVote = () => {
    //copy votes AND set new value for selected anecdote
    const newVotes = {
      ...votes,
      ...{[selected]: votes[selected] ? votes[selected] + 1 : 1} //if there is already a vote, add +1, else set first vote as 1
    }
    setVotes(newVotes)

    //calculate "most vote anecdote" after new vote submited
    getMostVoteAnecdote(newVotes)
  }

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text='vote' onClick={submitVote} />
      <Button text='next anecdote' onClick={randomAnecdote} />
      <AnecdoteMostVoted anecdote={mostVoted} />
    </div>
  )
}

export default App