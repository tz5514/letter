'use strict'

const Lucid = use('Lucid')

class StudentAccountCSIE extends Lucid {
  static get table() {
    return 'student_account';
  }

  static get primaryKey() {
    return 'S_id'
  }

  static get connection () {
    return 'csie'
  }
}

module.exports = StudentAccountCSIE
