function rnd(n, m) {
    return parseInt(n + Math.random() * (m - n));
}

function $qe(sel) {
    return document.querySelector(sel);
}

var job = [{
    'jobEn': 'lr',
    'jobName': '猎人'
}, {
    'jobEn': 'fs',
    'jobName': '法师'
}, {
    'jobEn': 'qs',
    'jobName': '圣骑士'
}, {
    'jobEn': 'ms',
    'jobName': '牧师'
}, {
    'jobEn': 'dk',
    'jobName': '死亡骑士'
}, {
    'jobEn': 'zs',
    'jobName': '战士'
}, {
    'jobEn': 'ss',
    'jobName': '术士'
}, {
    'jobEn': 'sm',
    'jobName': '萨满'
}, {
    'jobEn': 'dz',
    'jobName': '盗贼'
}, {
    'jobEn': 'ws',
    'jobName': '武僧'
}, {
    'jobEn': 'dh',
    'jobName': '恶魔猎手'
}, {
    'jobEn': 'xd',
    'jobName': '德鲁伊'
}];

var clan = [{
    clanName: '人类',
    clanEn: 'human',
    canJob: ['lr', 'fs', 'qs', 'ms', 'dk', 'zs', 'ss', 'dz', 'ws']
}, {
    clanName: '矮人',
    clanEn: 'dwarf',
    canJob: ['lr', 'fs', 'qs', 'ms', 'dk', 'zs', 'ss', 'dz', 'ws', 'sm']
}, {
    clanName: '暗夜精灵',
    clanEn: 'night_elf',
    canJob: ['lr', 'fs', 'ms', 'dk', 'zs', 'dz', 'ws', 'xd', 'dh']
}, {
    clanName: '侏儒',
    clanEn: 'gnome',
    canJob: ['lr', 'fs', 'ms', 'dk', 'zs', 'ss', 'dz', 'ws']
}, {
    clanName: '德莱尼',
    clanEn: 'draenei',
    canJob: ['lr', 'fs', 'qs', 'ms', 'dk', 'zs', 'ws', 'sm']
}, {
    clanName: '狼人',
    clanEn: 'worgen',
    canJob: ['lr', 'fs', 'ms', 'dk', 'zs', 'ss', 'dz', 'xd']
}, {
    clanName: '熊猫人',
    clanEn: 'pandaren',
    canJob: ['lr', 'fs', 'ms', 'zs', 'dz', 'ws', 'sm']
}, {
    clanName: '兽人',
    clanEn: 'orc',
    canJob: ['lr', 'fs', 'dk', 'zs', 'ss', 'dz', 'ws', 'sm']
}, {
    clanName: '亡灵',
    clanEn: 'undead',
    canJob: ['lr', 'fs', 'ms', 'dk', 'zs', 'ss', 'dz', 'ws']
}, {
    clanName: '牛头人',
    clanEn: 'tauren',
    canJob: ['lr', 'ms', 'dk', 'zs', 'ws', 'xd', 'sm', 'qs']
}, {
    clanName: '巨魔',
    clanEn: 'troll',
    canJob: ['lr', 'fs', 'ms', 'dk', 'zs', 'ss', 'dz', 'ws', 'sm', 'xd']
}, {
    clanName: '血精灵',
    clanEn: 'blood_elf',
    canJob: ['lr', 'fs', 'qs', 'ms', 'dk', 'zs', 'ws', 'dh', 'dz', 'ss']
}, {
    clanName: '地精',
    clanEn: 'goblin',
    canJob: ['lr', 'fs', 'ms', 'dk', 'zs', 'ss', 'dz', 'sm']
}, ]


//创建种族
function creatClan(clan) {
    var chbox = $qe('.checkbox-clan');
    for (var i = 0; i < clan.length; i++) {
        var c = document.createElement('input');
        c.type = 'checkbox';
        c.name = clan[i].clanEn;
        c.id = clan[i].clanEn;
        c.value = clan[i].clanName;
        chbox.appendChild(c);
        var l = document.createElement('label');
        l.htmlFor = clan[i].clanEn;
        l.innerHTML = clan[i].clanName;
        chbox.appendChild(l);
    }
}
creatClan(clan);

//创建职业
function creatJob(job) {
    var chbox = $qe('.checkbox-job');
    for (var i = 0; i < job.length; i++) {
        var c = document.createElement('input');
        c.type = 'checkbox';
        c.name = job[i].jobEn;
        c.id = job[i].jobEn;
        c.value = job[i].jobName;
        c.disabled = true;
        chbox.appendChild(c);
        var l = document.createElement('label');
        l.htmlFor = job[i].jobEn;
        l.innerHTML = job[i].jobName;
        chbox.appendChild(l);
    }

}
creatJob(job);

//联选
function checkAll(checks, all) {
    all.addEventListener('change', function() {
        var n = 0;
        if (this.checked) {
            for (var i = 0; i < checks.length; i++) {
                if (checks[i].disabled == false) {
                    n++;
                    checks[i].checked = true;
                }
            }
            if (n == 0) {
                alert('没有符合的职业');
                this.checked = false;
                return false;
            }
        } else {
            for (var i = 0; i < checks.length; i++) {
                checks[i].checked = false;
            }
        }
    }, false);

    var n = 0;
    for (var i = 0; i < checks.length; i++) {
        checks[i].addEventListener('change', function() {
            n = 0;
            for (var i = 0; i < checks.length; i++) {
                if (checks[i].checked) {
                    n++;
                }
            }
            if (n == checks.length) {
                all.checked = true;
            } else {
                all.checked = false;
            }
        }, false);
    }
}


var clans = document.querySelectorAll('.checkbox-clan [type=checkbox]');
checkAll(clans, $qe('#all-clan'));

var cs = document.querySelectorAll('.checkbox-job [type=checkbox]');
checkAll(cs, $qe('#all-job'));

function checkClan() {
    var sel = [];

    function cFn() {
        sel = [];
        for (var j = 0; j < clans.length; j++) {
            if (clans[j].checked) {
                sel.push(clans[j].name);
            }
        }
        for (var j = 0; j < cs.length; j++) {
            cs[j].disabled = true;
            cs[j].checked = false;
            $qe('#all-job').checked = false;
        }
        for (var i = 0; i < sel.length; i++) {
            (function(i) {
                for (var j = 0; j < clan.length; j++) {
                    if (clan[j].clanEn == sel[i]) {
                        for (var k = 0; k < clan[j].canJob.length; k++) {
                            $qe('#' + clan[j].canJob[k]).disabled = false;
                        }
                    }
                }
            })(i);

        }
    }
    for (var i = 0; i < clans.length; i++) {
        clans[i].addEventListener('change', function() {
            cFn();
        }, false);
        $qe('#all-clan').addEventListener('change', function() {
            cFn();
        }, false);
    }

}
checkClan();

function jobColor(jobEn) {
    switch (jobEn) {
        case 'lr':
            return '#AAD372 '
            break;
        case 'fs':
            return '#68CCEF'
            break;
        case 'qs':
            return '#F48CBA'
            break;
        case 'ms':
            return '#F0EBE0'
            break;
        case 'dk':
            return '#C41E3B'
            break;
        case 'zs':
            return '#C69B6D'
            break;
        case 'ss':
            return '#9382C9'
            break;
        case 'sm':
            return '#2359FF'
            break;
        case 'dz':
            return '#FFF468'
            break;
        case 'ws':
            return '#00ffba'
            break;
        case 'dh':
            return '#a330c9'
            break;
        case 'xd':
            return '#ff7c0a'
            break;
    }
}


var bOff = false;
$qe('#btn').onclick = function() {
    if (bOff) return;
    bOff = !bOff;
    var clanArr = []; //选中的clan
    var jobArr = []; //选中job的项
    if ($qe('.icon img')) {
        $qe('.icon').removeChild($qe('.icon img'));
    }

    for (var i = 0; i < cs.length; i++) {
        if (cs[i].checked) {
            jobArr.push({
                'jobEn': cs[i].name,
                'jobName': cs[i].value
            });
        }
    }
    for (var i = 0; i < clans.length; i++) {
        if (clans[i].checked) {
            for (var j = 0; j < clan.length; j++) {
                if (clans[i].name == clan[j].clanEn) {
                    clanArr.push(clan[j]);
                }
            }
            //clanArr.push({'clanEn':clans[i].name,'clanName':clans[i].value});
        }
    }
    if (jobArr.length == 0) {
        alert('还没选呢!');
        return;
    }
    console.log(clanArr)
    var x = 60;

    function active() {
        if (x == 0) return;
        x--;
        setTimeout(function() {
            var nj = job[x % job.length].jobEn;
            $qe('.res').innerText = clan[x % clan.length].clanName + ' ' + job[x % job.length].jobName;
            $qe('.res').style.color = jobColor(nj);
            if (x == 0) {
                var resj = jobArr[rnd(0, jobArr.length)];
                var resClanItem = [];
                for (var i = 0; i < clanArr.length; i++) {
                    if (clanArr[i].canJob.join('').indexOf(resj.jobEn) != -1) {
                        resClanItem.push(clanArr[i]);
                    }
                }

                var resClan = resClanItem[rnd(0, resClanItem.length)];
                $qe('.res').innerText = resClan.clanName + ' ' + resj.jobName;
                $qe('.res').style.color = jobColor(resj.jobEn);
                $qe('.icon').innerHTML = '<img src="icon/' + resj.jobEn + '.png" />';
                bOff = !bOff;
            }
            active();
        }, Math.abs(Math.pow(-1.006, x) * 70));
    }
    active();
}