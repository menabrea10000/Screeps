var Ruoli = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    muratore: require('role.muratore'),
    minatore: require('role.minatore'),
    fattorino: require('role.fattorino'),
    claimer: require('role.claimer'),
    ladro: require('role.ladro')
};
Creep.prototype.FaiIlTuoLavoro = function () {
    Ruoli[this.memory.role].run(this);
}
//prendi energia?? da fare? copia e incolla brutal controllare
/*
Creep.prototype.PrendiEnergia = function (bla, bla, bla) {}
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
*/
