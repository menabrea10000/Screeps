var roleUpgrader = require('role.upgrader');
var roleBuilder = {
    run: function (creep) {
        if (creep.memory.stanza != creep.pos.roomName && creep.memory.stanza != undefined) {
            var Uscita = creep.room.findExitTo(creep.memory.stanza);
            creep.moveTo(creep.pos.findClosestByRange(Uscita));
        }
        else {
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
                creep.say('costruisco');
            }

            if (creep.memory.lavora) {
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (target != undefined) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity)
                        }
                    });
                    if (target != undefined) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                    else {
                        roleUpgrader.run(creep);
                    }
                }
            }
            else {
                if (creep.room.storage == undefined) {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                }
                else {
                    if (creep.room.storage.store[RESOURCE_ENERGY] == 0) {
                        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    }
                    else {
                        var source = creep.room.storage;
                    }
                }
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};

module.exports = roleBuilder;