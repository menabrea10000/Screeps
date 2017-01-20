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
};