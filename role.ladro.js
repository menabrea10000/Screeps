var roleHarvester = require('role.harvester');
var roleLadro = {
    run: function (creep) {
        /** @param {creep} creep */
        if (creep.carry.energy < creep.carryCapacity) {
            var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        if (creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
            creep.say('rubo');
        }
        if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
            creep.say('scappo');
        }
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.lavora) {
            if (creep.room.name == Game.flags[creep.memory.ruba].pos.roomName) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else {
                creep.moveTo(Game.flags[creep.memory.ruba])
            }
        }
        else {
            if (creep.room.name == Game.flags[creep.memory.nato].pos.roomName) {
                var target = creep.room.storage;
                if (target != undefined && creep.room.storage.store[RESOURCE_ENERGY] < 1000000) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    roleHarvester.run(creep);
                }
            }
            else {
                creep.moveTo(Game.flags[creep.memory.nato]);
            }
            
        }
    }
};

module.exports = roleLadro;