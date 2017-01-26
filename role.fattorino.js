var roleFattorino = {
    run: function (creep) {
        /** @param {creep} creep */
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
            }
            if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
                creep.memory.lavora = true;
            }
            if (creep.carry.energy < creep.carryCapacity && !creep.memory.lavora) {
                var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity;
                    }
                });
                if (source != undefined) {
                    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                else {
                    var energy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
                    if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(energy);
                    }
                }
            }
            else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                else {
                    var target = creep.room.storage;
                    if (target != undefined && creep.room.storage.store[RESOURCE_ENERGY] < 1000000) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleFattorino;