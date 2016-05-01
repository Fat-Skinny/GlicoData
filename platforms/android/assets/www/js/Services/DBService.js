app.service('DBService',['$q',function($q){
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
                          "VALUES (?,?,?,?,?,?,?,?,?,?,?)",[registerDay,null,null,null,null,null,null,null,null,null,null],
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
            tx.executeSql("SELECT REGISTERDAY FROM GLICO_DATA ORDER BY REGISTERDAY ASC LIMIT 1",[],
            function(tx,res){
                deferred.resolve(res.rows.item(0).REGISTERDAY);
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
            tx.executeSql("SELECT REGISTERDAY FROM GLICO_DATA ORDER BY REGISTERDAY DESC LIMIT 1",[],
            function(tx,res){
                deferred.resolve(res.rows.item(0).REGISTERDAY);
            },function(e){
                deferred.reject(e.message);
            });
        });
        return deferred.promise;
    }

    return DBServiceMethods;
}]);