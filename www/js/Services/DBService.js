app.service('DBService',['$q',function($q){
    DBServiceMethods = [];
    //db = window.sqlitePlugin.openDatabase({name: "GlicoData.db", location: "default", androidLockWorkaround: 1});

    /*DBServiceMethods.createTables = function(){
        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS GLICO_DATA(ID INTEGER PRIMARY KEY,"
                         +"R_D VARCHAR(10),"
                         +"BF_T VARCHAR(5),BF_G INT,BF_C INT,"
                         +"M_L_T VARCHAR(5),M_L_G INT,M_L_C INT,"
                         +"L_T VARCHAR(5),L_G INT,L_C INT,"
                         +"AN_L_T VARCHAR(5),AN_L_G INT,AN_L_C INT,"
                         +"D_T VARCHAR(5),D_G INT,D_C INT)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS TEMP_GLICO_DATA("
                         +"R_D VARCHAR(10),"
                         +"BF_T VARCHAR(5),BF_G INT,BF_C INT,"
                         +"M_L_T VARCHAR(5),M_L_G INT,M_L_C INT,"
                         +"L_T VARCHAR(5),L_G INT,L_C INT,"
                         +"AN_L_T VARCHAR(5),AN_L_G INT,AN_L_C INT,"
                         +"D_T VARCHAR(5),D_G INT,D_C INT)");
        });
    };*/

    return DBServiceMethods;
}]);