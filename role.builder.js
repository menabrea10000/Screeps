var roleUpgrader = require('role.upgrader');
var roleBuilder = {
    run: function(creep) {

        if(creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
            creep.say('succhio');
        }
        if(!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
            creep.say('costruisco');
        }

        if (creep.memory.lavora) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets != null) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
    }
};

module.exports = roleBuilder;