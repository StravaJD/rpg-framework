export default function Party(characterList, maxSize, minSize, inventory){
	this.characterList = characterList || [];
	this.maxSize = maxSize;
	this.minSize = minSize;
	this.inventory = inventory;

	this.addCharacter = function(character){
		if (this.maxSize != undefined || this.characterList.length < this.maxSize){
			this.characterList.push(character);
			return true;
		} else{
			return false;
		}
	}

	this.removeCharacter = function(characterToRemove){
		if (this.minSize != undefined || this.characterList.length > this.minSize){
			var removedCharacter = false;
			this.characterList = this.characterList.filter(function (character){
				removedCharacter = character.id == characterToRemove.id;
				return character.id != characterToRemove.id;
			});
			return removedCharacter;
		} else{
			return false;
		}
		
	}

	this.getCharacter = function(index){
		return this.characterList[index];
	}
}