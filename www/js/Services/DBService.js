app.service('DBService',['$q',function($q){
    floatingRegister = {};
    DBServiceMethods = [];
    db = window.sqlitePlugin.openDatabase({name: "GlicoData.db", location: "default", androidLockWorkaround: 1});

    DBServiceMethods.createTables = function(){
        db.transaction(function(tx){
            tx.executeSql("DROP TABLE IF EXISTS GLICO_DATA");
            tx.executeSql("CREATE TABLE IF NOT EXISTS GLICO_DATA("
                         +"REGISTERDAY INTEGER PRIMARY KEY,"
                         +"BREAKFAST_TIME INT,BREAKFAST_VALUE INT,"
                         +"MIDDLEMORNINGLUNCH_TIME INT,MIDDLEMORNINGLUNCH_VALUE INT,"
                         +"LUNCH_TIME INT,LUNCH_VALUE INT,"
                         +"AFTERNOONLUNCH_TIME INT,AFTERNOONLUNCH_VALUE INT,"
                         +"DINNER_TIME INT,DINNER_VALUE INT)");

        });
    };

    DBServiceMethods.insertRegister = function(registerDay){
        var zeroTime = ((new Date().getTimezoneOffset())*60*1000);
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql("INSERT INTO GLICO_DATA ("+
                          "REGISTERDAY,"+
                          "BREAKFAST_TIME,"+
                          "BREAKFAST_VALUE,"+
                          "MIDDLEMORNINGLUNCH_TIME,"+
                          "MIDDLEMORNINGLUNCH_VALUE,"+
                          "LUNCH_TIME,"+
                          "LUNCH_VALUE,"+
                          "AFTERNOONLUNCH_TIME,"+
                          "AFTERNOONLUNCH_VALUE,"+
                          "DINNER_TIME,"+
                          "DINNER_VALUE) "+
                          "VALUES (?,?,?,?,?,?,?,?,?,?,?)",[registerDay,zeroTime,0,zeroTime,0,zeroTime,0,zeroTime,0,zeroTime,0],
                          function(tx,res){
                            deferred.resolve(res);
                          },function(e){
                            deferred.reject(e.message);
                          });
        });
        return deferred.promise;
    }

    DBServiceMethods.getFirstRegisterDate = function(){
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql("SELECT REGISTERDAY AS SR FROM GLICO_DATA ORDER BY REGISTERDAY ASC LIMIT 1",[],
            function(tx,res){
                if(res.rows.length == 0){
                    deferred.resolve(new Date().getTime()-5184000000);
                }else{
                    deferred.resolve(res.rows.item(0).SR);
                }
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    DBServiceMethods.verifyRegisterExistence = function(registerDay){
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql("SELECT COUNT(*) AS TOT FROM GLICO_DATA WHERE REGISTERDAY = ?",[registerDay],
            function(tx,res){
                deferred.resolve(res.rows.item(0).TOT);
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    DBServiceMethods.getLastRegisterDate = function(){
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql("SELECT REGISTERDAY AS SR FROM GLICO_DATA ORDER BY REGISTERDAY DESC LIMIT 1",[],
            function(tx,res){
                deferred.resolve(res.rows.item(0).SR);
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    DBServiceMethods.getRangeOfRegisters = function(start,end){
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM GLICO_DATA WHERE REGISTERDAY BETWEEN ? AND ? ORDER BY REGISTERDAY DESC",[start,end],
            function(tx,res){
                if(res.rows.length == 0){
                    deferred.resolve("NO REGISTERS FOUND");
                }else{
                    var resultArray = [];
                    for(i = 0; i < res.rows.length ; i++){
                        resultArray[i] = res.rows.item(i);
                    }
                    deferred.resolve(resultArray);
                }
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    DBServiceMethods.getRegister = function(registerDay){
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM GLICO_DATA WHERE REGISTERDAY = ?",[registerDay],
            function(tx,res){
                if(res.rows.length == 0){
                    deferred.resolve("NO REGISTERS FOUND");
                }else{
                    var resultArray = [];
                    for(i = 0; i < res.rows.length ; i++){
                        resultArray[i] = res.rows.item(i);
                    }
                    deferred.resolve(resultArray);
                }
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    DBServiceMethods.setFloatingRegister = function(register){
        floatingRegister = register;
        floatingRegister.BREAKFAST_TIME = new Date(floatingRegister.BREAKFAST_TIME);
        floatingRegister.MIDDLEMORNINGLUNCH_TIME = new Date(floatingRegister.MIDDLEMORNINGLUNCH_TIME);
        floatingRegister.LUNCH_TIME = new Date(floatingRegister.LUNCH_TIME);
        floatingRegister.AFTERNOONLUNCH_TIME = new Date(floatingRegister.AFTERNOONLUNCH_TIME);
        floatingRegister.DINNER_TIME = new Date(floatingRegister.DINNER_TIME);
    }

    DBServiceMethods.getFloatingRegister = function(){
//        alert(JSON.stringify(floatingRegister)));
        return floatingRegister;
    }

    DBServiceMethods.updateRegister = function(registerDate,periodTime,periodValue,flag){
        var deferred = $q.defer();
        var query = "";
        switch (flag){
            case 0:
                query = "UPDATE GLICO_DATA SET BREAKFAST_TIME = ?,BREAKFAST_VALUE = ? WHERE REGISTERDAY = ?";
                break;
            case 1:
                query = "UPDATE GLICO_DATA SET MIDDLEMORNINGLUNCH_TIME = ?,MIDDLEMORNINGLUNCH_VALUE = ? WHERE REGISTERDAY = ?";
                break;
            case 2:
                query = "UPDATE GLICO_DATA SET LUNCH_TIME = ?,LUNCH_VALUE = ? WHERE REGISTERDAY = ?";
                break;
            case 3:
                query = "UPDATE GLICO_DATA SET AFTERNOONLUNCH_TIME = ?,AFTERNOONLUNCH_VALUE = ? WHERE REGISTERDAY = ?";
                break;
            case 4:
                query = "UPDATE GLICO_DATA SET DINNER_TIME = ?,DINNER_VALUE = ? WHERE REGISTERDAY = ?";
                break;
            default:
                return "ERRO,FLAG INVALIDA";
        }
        db.transaction(function(tx){
            tx.executeSql(query,[periodTime,periodValue,registerDate],function(tx,res){
                deferred.resolve("OK");
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    return DBServiceMethods;
}]);