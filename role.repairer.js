var roleUpgrader = require('role.upgrader');
var roleRepairer = {
    run: function(creep) {

        if (creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
            creep.say('succhio');
        }
        if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
            creep.say('costruisco');
        }

        if (creep.memory.lavora) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(targets != undefined) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
    }
};

module.exports = roleRepairer;