export default function Stats(health, attack, magic, defense, item) {
	this.maxHealth = health;
	this.hp = health;
	this.attack = attack;
	this.magic = magic;
	this.defense = defense;

	this.__defineSetter__("health", function(val){
		this.hp = val >= 0 ? val : 0;
	});

	this.__defineGetter__("health", function(){
		return this.hp;
	});
}