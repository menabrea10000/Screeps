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
//prendi energia?? da fare?

/*
Creep.prototype.PrendiEnergia = function (bla, bla, bla) {}
*/
