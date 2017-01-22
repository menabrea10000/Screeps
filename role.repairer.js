var roleUpgrader = require('role.upgrader');
var roleRepairer = {
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        if (creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
            creep.say('succhio');
        }
        if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
            creep.say('riparo');
        }

        if (creep.memory.lavora) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
    }
};

module.exports = roleRepairer;