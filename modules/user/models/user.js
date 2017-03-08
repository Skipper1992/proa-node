'use strict'
module.exports = (sequelize, DataTypes) => {
    sequelize.define('User', {
        account: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
            // associations can be defined here
            }
        },
        instanceMethods: {
            toJSON: function () {
                var values = Object.assign({}, this.get())

                delete values.password_hash
                return values
            }
        },
    })
}