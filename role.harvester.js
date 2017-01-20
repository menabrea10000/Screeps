var roleUpgrader = require('role.upgrader');
var roleHarvester = {
    run: function (creep) {

        if (creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
            creep.say('succhio');
        }
        if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
            creep.say('svuoto');
        }

        if (creep.carry.energy < creep.carryCapacity && !creep.memory.lavora) {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }	
            }
			else {
				roleUpgrader.run(creep);
			}
        }
    }
};

module.exports = roleHarvester;