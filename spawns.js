require('creacorpo')();
var VettoRuoli = ['harvester', 'upgrader', 'builder', 'repairer', 'muratore', 'minatore', 'fattorino', 'ladro', 'claimer'];
StructureSpawn.prototype.CreaCreepRichiesto = function () {
    let stanza = this.room;
    let CreepNellaStanza = stanza.find(FIND_MY_CREEPS);
    var harvesters = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'repairer');
    var muratori = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'muratore');
    var minatori = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'minatore');
    var fattorini = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'fattorino');
    var claimers = _.filter(CreepNellaStanza, (creep) => creep.memory.role == 'claimer');
    var ladri1 = _.filter(Game.creeps, (creep) => (creep.memory.role == 'ladro' && creep.memory.ruba == 'Ruba1'));
    var ladri2 = _.filter(Game.creeps, (creep) => (creep.memory.role == 'ladro' && creep.memory.ruba == 'Ruba2'));
    var BandieraRossa = _.filter(Game.flags, (flag) => flag.color == COLOR_RED);
    var SourceIDs = stanza.find(FIND_SOURCES)
    if (minatori.length > 0) {
        for (var i = 0; i < minatori.length; i++) {
            for (var j = 0; j < SourceIDs.length; j++) {
                if (minatori[i].memory.source != SourceIDs[j].id) {
                    var SourceMinatore = SourceIDs[j];
                    break;
                }
            }
        }
    }
    else {
        var SourceMinatore = SourceIDs[0];
    }
    var energiamax = stanza.energyCapacityAvailable;
    if (harvesters.length < 1 && fattorini.length == 0) {
        var newName = this.CreaCorpo(energiamax, 'harvester', this.pos.roomName);
        if (newName == ERR_NOT_ENOUGH_ENERGY && harvesters == 0) {
            var newName = this.CreaCorpo(stanza.energyAvailable, 'harvester', this.pos.roomName);   //antiwipe
        }
    }
    else if (BandieraRossa.length > 0 && claimers.length < 1 && this.name == 'Spawn1') {
        var newName = this.CreaClaimer(BandieraRossa[0].pos.roomName);    //fondare
        BandieraRossa[0].remove();
    }
    else if (minatori.length < SourceIDs.length && Game.rooms[this.pos.roomName].controller.level > 4) {
        var newName = this.CreaMinatore(SourceMinatore.id, this.pos.roomName);
    }
    else if (fattorini.length < 2 && Game.rooms[this.pos.roomName].controller.level > 4) {
        var newName = this.CreaFattorino(this.pos.roomName);
    }
    else if (builders.length < 1) {
        var newName = this.CreaCorpo(energiamax, 'builder', this.pos.roomName);
    }
    else if (repairers.length < 1) {
        var newName = this.CreaCorpo(energiamax, 'repairer', this.pos.roomName);
    }
    else if (muratori.length < 1) {
        var newName = this.CreaCorpo(energiamax, 'muratore', this.pos.roomName);
    }
    else if (ladri1.length < 1 && this.name == 'Spawn1') {
        var newName = this.CreaLadro(energiamax, 'Casa1', 'Ruba1');
    }
    else if (ladri2.length < 1 && this.name == 'Spawn1') {
        var newName = this.CreaLadro(energiamax, 'Casa1', 'Ruba2');
    }
    else {
        if (Game.rooms[this.pos.roomName].controller.level < 4) {
            var newName = this.CreaCorpo(energiamax, 'upgrader', this.pos.roomName);
        }
        else {
            if (upgraders.length < 1) {
                var newName = this.CreaCorpo(energiamax, 'upgrader', this.pos.roomName);
            }
        }
    }
    if (!(newName < 0) && newName != undefined) {
        console.log(this.name + ': Partorito un ' + Game.creeps[newName].memory.role + ' > ' + newName);
    }
}