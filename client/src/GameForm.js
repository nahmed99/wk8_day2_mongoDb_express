import {useState} from "react";

import {postGame} from "./GamesService";

const GameForm = ({addGame}) =>{
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        postGame(formData);
        addGame(formData);
    }

    const onChange = (e) => {
        formData[e.target.id] = e.target.value;
        setFormData(formData);
    }

    return (
        <form class="" onSubmit={handleSubmit} method="post">
            <label for="name">Name:</label>
            <input  onChange={onChange}type="text" id="name" v-model="name" required/>

            <label for="playingTime">Playing Time:</label>
            <input  onChange={onChange}type="number" id="playingTime"  required/>

            <label for="minNumPlayers">Min Players:</label>
            <input  onChange={onChange}type="number" id="minNumPlayers" required/>

            <label for="maxNumPlayers">Max Players:</label>
            <input  onChange={onChange}type="number" id="maxNumPlayers"  required/>

            <input type="submit" value="Save" id="save"/>

        </form>
    )
}
export default GameForm;