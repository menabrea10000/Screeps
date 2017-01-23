var roleRepairer = require('role.repairer');
var roleMuratore = {
    run: function (creep) {
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
            creep.say('riparomuri');
        }
        if (creep.memory.lavora) {
            if (creep.memory.PercMuro == undefined) {creep.memory.PercMuro = 0.001}
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( structure.hits < structure.hitsMax*creep.memory.PercMuro && structure.structureType == STRUCTURE_WALL)
                }
            });
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                if (creep.memory.PercMuro < 1) {
                    creep.memory.PercMuro = creep.memory.PercMuro + 0.001;
                }
                roleRepairer.run(creep);
            }
        }
        else {
            if (creep.room.storage.store[RESOURCE_ENERGY] == 0) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else {
                var source = creep.room.storage;
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};

module.exports = roleMuratore;