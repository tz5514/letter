'use strict'

const Lucid = use('Lucid')

class StudentRecommendationInfoSE extends Lucid {
  static get table() {
    return 'student_recomm_info';
  }

  static get connection () {
    return 'se'
  }
}

module.exports = StudentRecommendationInfoSE
