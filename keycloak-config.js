var session =  require('express-session');
var Keycloak = require('keycloak-connect');
let keycloak;
var keycloakConfig = {
    "realm": "ProgenyLocal",
    "auth-server-url":"http://localhost:8080/auth/",
    "ssl-required":"none",
    "resource":"node-microservice",
    "realmPublicKey":"",
    "bearer-only": true
};

 function initKeycloak() {
    if(keycloak) {
        return keycloak;
    } else {
        var memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({
            store: memoryStore,
            secret:'progeny_key',
            resave: false,
            saveUninitialized:true
        }, keycloakConfig);
        return keycloak;
    }
}

module.exports = {
    initKeycloak
}