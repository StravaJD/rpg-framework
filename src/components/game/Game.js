import React, { Component } from 'react';
import sword from "../../images/sword.png";
import kick from "../../images/kick.png";
import magic from "../../images/magic.png";
import knapsack from "../../images/knapsack.png";
import hero from "../../images/hero.png";
import farmer from "../../images/farmer.png";
import './game.css';
import Character from "../../utils/character";
import Stats from "../../utils/stats";
import Encounter from "../encounter/Encounter";
import World from "../world/World";


class Game extends Component {
	constructor(props){
		super(props);
		this.state={
			enemy:new Character("Enemy", new Stats(40, 5, 5, 5, 5)),
			player:new Character("Hero", new Stats(40, 10, 15, 10, 5)),
			log:[]
		};
	}
	swordAttack(){
		let damage = this.state.player.swordAttack(this.state.enemy);
		let newState = Object.assign({},this.state);
		newState.log.push(`${newState.player.name} attacked using a sword for ${damage} damage!`);
		this.setState(newState);
	}

	kickAttack(){
		let damage = this.state.player.kickAttack(this.state.enemy);
		let newState = Object.assign({},this.state);
		newState.log.push(`${newState.player.name} kicked the enemy for ${damage} damage!`);
		this.setState(newState);
	}

	magicAttack(){
		let damage = this.state.player.magicAttack(this.state.enemy);
		let newState = Object.assign({},this.state);
		newState.log.push(`${newState.player.name} attacked using magic for ${damage} damage!`);
		this.setState(newState);
	}

	useKnapsack(){
		let newState = Object.assign({},this.state);
		newState.log.push(`${newState.player.name} doesn't have any items!`);
		this.setState(newState);
	}

	render(){
		return (
			<div className="game">
				<World />
				<Encounter />
				<div className="icon">
					<div className="action sword" title="Sword Attack" onClick={this.swordAttack.bind(this)} />
					<div className="action kick" title="Kick" onClick={this.kickAttack.bind(this)} />
					<div className="action magic" title="Magic Attack" onClick={this.magicAttack.bind(this)}/>
					<div className="action knapsack" title="Inventory" onClick={this.useKnapsack.bind(this)}/>
				</div>

				<div className="field">
					<div className="sprite">
						<img src={hero} title="Hero" />
						<div className="healthOutline" title={this.state.player.stats.health}>
							<div
								className="healthBar"
								style={({width:`${(this.state.player.stats.health/this.state.player.stats.maxHealth)*100}%`})}	
							></div>
						</div>					
					</div>
					
					<div className="sprite">
						<img src={farmer} title="Farmer" />
						<div className="healthOutline" title={this.state.enemy.stats.health}>
							<div
								className="healthBar"
								style={({width:`${(this.state.enemy.stats.health/this.state.enemy.stats.maxHealth)*100}%`})}	
							></div>
						</div>
					</div>
					<div className="info">
						{
							this.state.log.map((message, index)=><div key={index}>{message}</div>)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Game;