var roleUpgrader = {
    run: function(creep) {
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
                creep.say('raccolgo');
            }
            if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
                creep.memory.lavora = true;
                creep.say('SALIII');
            }

            if (creep.memory.lavora) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                if (creep.room.storage != undefined) {
                    if (creep.room.storage.store[RESOURCE_ENERGY] == 0) {
                        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                    }
                    else {
                        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity)
                            }
                        });
                        if (source != undefined) {
                            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(source);
                            }
                        }
                        else {
                            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(source);
                            }
                        }
                    }
                }
                else {
                    var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity)
                        }
                    });
                    if (source != undefined) {
                        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                    }
                    else {
                        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;