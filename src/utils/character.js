export default function Character(name, stats, portrait, sprite, position, equipment) {
	this.name = name;
	this.stats = stats;
	this.portrait = portrait;
	this.sprite = sprite;
	this.position = position;
	this.equipment = equipment;
	this.id = this.name;

	this.move = function(direction, map) {
		return map.move(this, direction);
	}

	this.swordAttack = function(enemy) {
		if (this.stats.attack > enemy.stats.defense) {
			var damage = this.stats.attack - enemy.stats.defense;
			enemy.stats.health -= damage;
			return damage;
		} else { 
			return 0;
		}
	}

	this.kickAttack = function(enemy) {
		if (this.stats.attack > enemy.stats.defense) {
			var damage = this.stats.attack - enemy.stats.defense;
			enemy.stats.health -= damage;
			return damage;
		} else { 
			return 0;
		}
	}

	this.magicAttack = function(enemy) {
		if (this.stats.magic > enemy.stats.defense) {
			var damage = this.stats.magic - enemy.stats.defense;
			enemy.stats.health -= damage;
			return damage;
		} else { 
			return 0;
		}
	}

	this.useKnapsack = function(enemy) {
		
	}

}

