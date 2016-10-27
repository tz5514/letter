'use strict'

const Lucid = use('Lucid')

class StudentAccountSE extends Lucid {
  static get table() {
    return 'student_account';
  }

  static get primaryKey() {
    return 'S_id'
  }

  static get connection () {
    return 'se'
  }
}

module.exports = StudentAccountSE
