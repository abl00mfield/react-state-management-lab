// src/App.jsx
import { useState } from "react";
import "./App.css";

let totalStrength;
let totalAgility;

const App = () => {
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: "Survivor",
      price: 12,
      strength: 6,
      agility: 4,
      img: "/assets/survivor.jpg",
    },
    {
      id: 2,
      name: "Scavenger",
      price: 10,
      strength: 5,
      agility: 5,
      img: "/assets/scavenger.jpg",
    },
    {
      id: 3,
      name: "Shadow",
      price: 18,
      strength: 7,
      agility: 8,
      img: "/assets/shadow.jpg",
    },
    {
      id: 4,
      name: "Tracker",
      price: 14,
      strength: 7,
      agility: 6,
      img: "/assets/tracker.jpg",
    },
    {
      id: 5,
      name: "Sharpshooter",
      price: 20,
      strength: 6,
      agility: 8,
      img: "/assets/sharpshooter.jpg",
    },
    {
      id: 6,
      name: "Medic",
      price: 15,
      strength: 5,
      agility: 7,
      img: "/assets/medic.jpg",
    },
    {
      id: 7,
      name: "Engineer",
      price: 16,
      strength: 6,
      agility: 5,
      img: "/assets/engineer.jpg",
    },
    {
      id: 8,
      name: "Brawler",
      price: 11,
      strength: 8,
      agility: 3,
      img: "/assets/brawler.jpg",
    },
    {
      id: 9,
      name: "Infiltrator",
      price: 17,
      strength: 5,
      agility: 9,
      img: "/assets/infiltrator.jpg",
    },
    {
      id: 10,
      name: "Leader",
      price: 22,
      strength: 7,
      agility: 6,
      img: "/assets/leader.jpg",
    },
  ]);

  const handleRemoveFighter = (fighter) => {
    //reset error message
    setMessage("");
    //remove fighter from team
    const updatedTeam = team.filter((member) => member.id !== fighter.id);
    //add price back in
    const funds = money + fighter.price;
    //update total strength
    totalStrength = updatedTeam.reduce(
      (acc, member) => acc + member.strength,
      0
    );
    //update total Agility
    totalAgility = updatedTeam.reduce((acc, member) => acc + member.agility, 0);
    //add fighter back to Zombie Fighters
    const updatedZombieFighters = [...zombieFighters, fighter];

    //update changed states
    setTeam(updatedTeam);
    setZombieFighters(updatedZombieFighters);
    setMoney(funds);
  };

  const handleAddFighter = (fighter) => {
    //first, check to see if you can afford the new fighter
    if (fighter.price > money) {
      console.log("Not Enough Money");
      setMessage("Not enough money");
    } else {
      //remove error message
      setMessage("");
      //subtract the cost of the fighter from current money
      const funds = money - fighter.price;
      //set the sate of the money
      setMoney(funds);
      //create a new array of the team and the fighter to add
      const newTeamFighters = [...team, fighter];
      //update the team's state with the new fighter
      setTeam(newTeamFighters);
      //remove the fighter from the list of available zombie fighters
      const newZombieFighters = zombieFighters.filter(
        (zombieFighter) => zombieFighter.id !== fighter.id
      );
      //update zombie fighters
      setZombieFighters(newZombieFighters);

      //update strength and agility values
      totalStrength = newTeamFighters.reduce(
        (acc, member) => acc + member.strength,
        0
      );
      totalAgility = newTeamFighters.reduce(
        (acc, member) => acc + member.agility,
        0
      );
    }
  };

  return (
    <>
      <h1>Zombie Fighters</h1>
      <h2>Money: {money}</h2>
      {message && <p className="message">{message}</p>}
      {team.length === 0 ? (
        <p>Pick Some Team Members</p>
      ) : (
        <>
          <h2>Your Team</h2>
          <p>Total Strength:{totalStrength}</p>
          <p>Total Agility: {totalAgility}</p>
          <ul>
            {team.map((member) => (
              <li key={member.id}>
                <img src={member.img} alt="team member" />
                <h3>{member.name}</h3>
                <p>Price: {member.price}</p>
                <p>Strength: {member.strength}</p>
                <p>Agility: {member.agility}</p>
                <button onClick={() => handleRemoveFighter(member)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Available Fighters</h2>
      <ul>
        {zombieFighters.map((zombieFighter) => (
          <li key={zombieFighter.id}>
            <img src={zombieFighter.img} alt="zombie fighter" />
            <h3>{zombieFighter.name}</h3>
            <p>Price: {zombieFighter.price}</p>
            <p>Strength: {zombieFighter.strength}</p>
            <p>Agility: {zombieFighter.agility}</p>
            <button onClick={() => handleAddFighter(zombieFighter)}>Add</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
