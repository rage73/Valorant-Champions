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
var groups;
var rCnt = {
    'NA': 0,
    'EMEA': 0,
    'KR': 0,
    'BR': 0,
    'SEA': 0,
    'LATAM': 0,
    'JP': 0
};
var regCnt1 = {},
    regCnt2 = {},
    regCnt3 = {},
    regCnt4 = {},
    regCnt = {};

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

function isItNotOk(regCnt) {
    for (r in regCnt) {
        if (regCnt[r] > 1) {
            return true;
        }
    }
    return false;
}

function addTeam(pool, gfill) {
    if (pool.length == 0) {
        return true;
    }

    var idx = getRandVal(pool.length);
    var team = pool[idx];
    pool.splice(idx, 1);

    for (let i = 0; i < 4; i++) {
        if (gfill[i]) {
            continue;
        }
        if(team.r == 'SEA' && team.p == 0)
        {
            if(groups[i].includes('Team Vikings'))
            {
                continue;
            }
        }

        (regCnt[i])[team.r]++;
        if (isItNotOk(regCnt[i])) {
            regCnt[i][team.r]--;
            continue;
        }
        groups[i].push(getReg(team.r)[team.p]);
        gfill[i] = true;
        if (!addTeam(pool, gfill)) {
            regCnt[i][team.r]--;
            groups[i].pop();
            gfill[i] = false;
            continue;
        }
        return true;
    }
    pool.push(team);
    return false;
}

function fillGrp(pool) {
    var gfill = [false, false, false, false];
    addTeam(pool,gfill);
}

function clearData() {
    groups = [
        [],
        [],
        [],
        []
    ];
    regCnt1 = JSON.parse(JSON.stringify(rCnt));
    regCnt2 = JSON.parse(JSON.stringify(rCnt));
    regCnt3 = JSON.parse(JSON.stringify(rCnt));
    regCnt4 = JSON.parse(JSON.stringify(rCnt));
    regCnt = {
        0: regCnt1,
        1: regCnt2,
        2: regCnt3,
        3: regCnt4
    };
}

function drawGrps() {
    makePools();
    clearData();
    fillGrp(pool1);
    fillGrp(pool2);
    fillGrp(pool3);
    fillGrp(pool4);
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
    drawGrps();
    addToList(groups[0], listA);
    addToList(groups[1], listB);
    addToList(groups[2], listC);
    addToList(groups[3], listD);
})