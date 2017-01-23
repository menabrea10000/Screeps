module.exports = function () {
    StructureSpawn.prototype.CreaCorpo = function (Costo, Ruolo) {
        var Corpo = []; //inizializza vettore
        var Parti = Math.floor(Costo / 200);   //tutti uguali 50+50+100
        for (let i = 0; i < Parti; i++) {
            Corpo.push(WORK);
        }
        for (let i = 0; i < Parti; i++) {
            Corpo.push(CARRY);
        }
        for (let i = 0; i < Parti; i++) {
            Corpo.push(MOVE);
        }
        return this.createCreep(Corpo, undefined, { role: Ruolo, lavora: false });
    };
    StructureSpawn.prototype.CreaLadro = function (Costo,Casa,Flag) {
        var Corpo = [];
        for (let i = 0; i < 3; i++) {
            Corpo.push(WORK);
        }
        Costo -= 150 * 3; //Metto il move per ogni work
        var Parti = Math.floor(Costo / 100);  //50+50 deve scappare forte
        for (let i = 0; i < Parti; i++) {
            Corpo.push(CARRY);
        }
        for (let i = 0; i < Parti + 3; i++) {
            Corpo.push(MOVE);
        }
        return this.createCreep(Corpo, undefined, { role: 'ladro', nato : Casa, ruba: Flag , lavora: false });
    }
    StructureSpawn.prototype.CreaClaimer = function (Flag) {
        return this.createCreep([CLAIM, MOVE], undefined, { role: 'claimer', claim: Flag});
    }
    StructureSpawn.prototype.CreaMinatore = function (SourceID) {
        return this.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: 'minatore', source: SourceID});
    }
    StructureSpawn.prototype.CreaFattorino = function () {
        return this.createCreep([CARRY, CARRY, MOVE, MOVE], undefined, { role: 'fattorino'});
    }
};