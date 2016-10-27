'use strict'

const Lucid = use('Lucid')

class StudentRecommendationInfoCSIE extends Lucid {
  static get table() {
    return 'student_recomm_info';
  }

  static get connection () {
    return 'csie'
  }
}

module.exports = StudentRecommendationInfoCSIE
