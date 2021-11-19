let draw = $('.draw');
let listA = $('#grpA .grpList');
let listB = $('#grpB .grpList');
let listC = $('#grpC .grpList');
let listD = $('#grpD .grpList');

let NA = ['Sentinels', 'Envy', 'Cloud9 Blue'];
let EMEA = ['Gambit Esports', 'Acend', 'Fnatic', 'Team Liquid'];
let KR = ['Vision Strikers'];
let BR = ['Team Vikings', 'Keyd Stars', 'Furia'];
let SEA = ['X10 Esports', 'Team Secret', 'Full Sense'];
let LATAM = ['KRÜ Esports'];
let JP = ['Crazy Raccoon'];

var pool1, pool2, pool3, pool4;
var g1, g2, g3, g4;

function makePools() {
    pool1 = [{
        r: 'NA',
        p: 0,
        s: false
    }, {
        r: 'EMEA',
        p: 1,
        s: false
    }, {
        r: 'KR',
        p: 0,
        s: false
    }, {
        r: 'EMEA',
        p: 0,
        s: false
    }];
    pool2 = [{
        r: 'NA',
        p: 1,
        s: false
    }, {
        r: 'EMEA',
        p: 2,
        s: false
    }, {
        r: 'LATAM',
        p: 0,
        s: false
    }, {
        r: 'BR',
        p: 0,
        s: false
    }];
    pool3 = [{
        r: 'NA',
        p: 2,
        s: false
    }, {
        r: 'EMEA',
        p: 3,
        s: false
    }, {
        r: 'SEA',
        p: 0,
        s: false
    }, {
        r: 'JP',
        p: 0,
        s: false
    }];
    pool4 = [{
        r: 'BR',
        p: 1,
        s: false
    }, {
        r: 'SEA',
        p: 1,
        s: false
    }, {
        r: 'BR',
        p: 2,
        s: false
    }, {
        r: 'SEA',
        p: 2,
        s: false
    }];
}

function getReg(reg) {
    switch (reg) {
        case 'NA':
            return NA;
        case 'EMEA':
            return EMEA;
        case 'KR':
            return KR;
        case 'BR':
            return BR;
        case 'SEA':
            return SEA;
        case 'LATAM':
            return LATAM;
        case 'JP':
            return JP;
    }
}

function getRandVal(size) {
    return Math.floor(Math.random() * size);
}


function getTeam(pool, regCnt) {

    var team = {};
    var itr = 0;
    do {
        itr++;
        if (team) {
            regCnt[team.r]--;
        }
        var idx = getRandVal(pool.length);
        team.r = pool[idx].r;
        team.name = getReg(team.r)[pool[idx].p];
        regCnt[team.r]++;
    }
    while (isItNotOk(regCnt) && itr <= pool.length);

    if (itr > pool.length) {
        return;
    }

    pool.splice(idx, 1);

    return team;
}

function isItNotOk(regCnt) {
    for (r in regCnt) {
        if (regCnt[r] > 1) {
            return true;
        }

    }
    return false;
}

function randGrps() {
    let regCnt = {
        'NA': 0,
        'EMEA': 0,
        'KR': 0,
        'BR': 0,
        'SEA': 0,
        'LATAM': 0,
        'JP': 0
    };
    var group = [];

    let t1, t2, t3, t4;
    t1 = getTeam(pool1, regCnt);
    t2 = getTeam(pool2, regCnt);
    t3 = getTeam(pool3, regCnt);
    t4 = getTeam(pool4, regCnt);

    if (t1 == null || t2 == null || t3 == null || t4 == null) {
        return;
    }

    group.push(t1.name, t2.name, t3.name, t4.name);

    return group;
}

function getGrps() {
    makePools();
    g1 = randGrps();
    g2 = randGrps();
    g3 = randGrps();
    g4 = randGrps();

    if (g1 == null || g2 == null || g3 == null || g4 == null) {
        getGrps();
    }
}

function addToList(group, list) {
    list.empty();
    group.forEach((element) => {
        list.append($('<li>', {
            text: element
        }));
    });
}

draw.click(() => {
    getGrps();
    addToList(g1, listA);
    addToList(g2, listB);
    addToList(g3, listC);
    addToList(g4, listD);
})