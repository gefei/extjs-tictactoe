Ext.onReady(function(){
    var finished = false;
    var board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    function sign(x) {
        if (x >= 0) return 1;
        else return -1;
    }
    function won(board) {
        var nwse = board[0][0]+board[1][1]+board[2][2];
        if (nwse == 3 || nwse == -3) return sign(nwse);
        var swne = board[2][0]+board[1][1]+board[0][2];
        if (swne == 3 || swne == -3) return sign(swne);
        for (var i = 0; i < 3; i++) {
            var hSum = board[i][0]+board[i][1] +board[i][2];
            if (hSum == 3 || hSum == -3) return sign(hSum);
            var vSum = board[0][i]+board[1][i] +board[2][i];
            if (vSum == 3 || vSum == -3) return sign(vSum);
        }
        if (full(board)) return '0';
        return 'unknown';
    }
    function copyBoard(b) {
        return JSON.parse((JSON.stringify(b)));
    }
    function minMax(board, color) { // me == -1, him = 1
        var winner = won(board);
        if (winner != 'unknown') {
            return { score: winner * -2 }
        }
        if (full(board)) {
            return {score: 0}
        }

            var bestY, bestX;
            var score = color * 10;
            for (var y = 0; y < 3; y++) {
                for (var x = 0; x < 3; x++) {
                    if (board[y][x] != 0) continue;
                    var newBoard = copyBoard(board);
                    newBoard[y][x] = color;
                    var mm = minMax(newBoard, -color);
                    if ((color == -1 && score < mm.score ) || (color == 1 && score > mm.score ))  {
                        bestX = x;
                        bestY = y;
                        score = mm.score;
                    }
                }
            }
            return {x: bestX, y: bestY, score: score};
    }

    function movePlayed(btn, y, x) {
        if (finished) return;
        btn.setText('X');
        board[y][x] = 1;
        checkWon(board);

        if (finished) return;
        var mv = minMax(board, -1);
        board[mv.y][mv.x] = -1;
        var form = btn.up('#win');
        var id = '#'+mv.y+mv.x;
        form.down(id).setText('O')
        checkWon(board);
    }
    function checkWon(board){
        var w = won(board);
        if (w == -1) {
            finished = true;
            Ext.Msg.alert('Fantastic', 'I win!');
        }
        else if (w == 1) {
            finished = true;
            Ext.Msg.alert('Congratulations', 'You win!');
        }
        else if (w == 0) {
            finished = true;
            Ext.Msg.alert('Game Over', 'Draw');
        }
    }
    function full(board) {
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                if (board[y][x] == 0) return false;
            }
        }
        return true;
    }
    var win = Ext.create('Ext.window.Window', {
        title: 'TicTacToe',
        id: 'win',
        resizable: false,
        height: 220,
        width: 120,
        layout: 'vbox',
        items: [
            {
                xtype: 'form',
                id: 'form1',
                items: [
        {
            xtype: 'button',
            id: '00',
            width: 50,
            height: 50,
            border: true,
            text: ' ',
            size: 'large',
            onClick: function(evt) {
                movePlayed(this, 0,0);
            }
        },{
            xtype: 'button',
            id: '01',
            width: 50,
            height: 50,
            border: true,
            text: ' ',
            onClick: function() {
                movePlayed(this, 0, 1);
            }
        },{
            xtype: 'button',
            id: '02',
            width: 50,
            height: 50,
            border: true,
            text: ' ',
            onClick: function() {
                movePlayed(this, 0, 2);
            }
        }]
        },
            {xtype: 'form',
                id: 'form2',
            items: [{
                xtype: 'button',
                id: '10',
                width: 50,
                height: 50,
                border: true,
                text: ' ',
                size: 'large',
                onClick: function(evt) {
                    movePlayed(this, 1, 0);
                }
            },{
                xtype: 'button',
                id: '11',
                width: 50,
                height: 50,
                border: true,
                text: ' ',
                onClick: function() {
                    movePlayed(this, 1,1);
                }
            },{
                xtype: 'button',
                id: '12',
                width: 50,
                height: 50,
                border: true,
                text: ' ',
                onClick: function() {
                    movePlayed(this, 1,2);
                }
            }]},
            {
                xtype: 'form',
                id: 'form3',
                items: [{
                xtype: 'button',
                width: 50,
                height: 50,
                id: '20',
                border: true,
                text: ' ',
                size: 'large',
                onClick: function(evt) {
                    movePlayed(this, 2,0);
                }
            },{
                xtype: 'button',
                id: '21',
                width: 50,
                height: 50,
                border: true,
                text: ' ',
                onClick: function() {
                    movePlayed(this, 2,1);
                }
            },{
                xtype: 'button',
                id: '22',
                width: 50,
                height: 50,
                border: true,
                text: ' ',
                onClick: function() {
                    movePlayed(this, 2,2);
                }
            }]}
        ]
    });
    win.show();
});
